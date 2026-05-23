#!/usr/bin/env python3
"""Generate a deterministic tree-only repository manifest.

This script intentionally performs no semantic analysis. It records only
physical repository paths and basic tree metadata.
"""

from __future__ import annotations

import os
from datetime import datetime, timezone
from pathlib import Path

MANIFEST_PATH = Path("repository_manifest.yml")
EXCLUDED_DIRS = {".git", "node_modules", "dist", "build", "__pycache__", "pycache"}
EXCLUDED_FILES = {".DS_Store"}
MANIFEST_VERSION = 1


def yaml_quote(value: str) -> str:
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def root_relative(path: Path) -> str:
    value = path.as_posix()
    return "." if value == "." else value


def should_skip_file(path: Path) -> bool:
    return path.name in EXCLUDED_FILES or any(part in EXCLUDED_DIRS for part in path.parts)


def collect_repository_state(root: Path) -> tuple[list[str], list[dict[str, str]]]:
    directories: set[str] = {"."}
    files: list[dict[str, str]] = []

    for current_root, dirnames, filenames in os.walk(root):
        current_path = Path(current_root).relative_to(root)

        dirnames[:] = sorted(name for name in dirnames if name not in EXCLUDED_DIRS)

        rel_dir = root_relative(current_path)
        directories.add(rel_dir)

        for dirname in dirnames:
            directories.add(root_relative(current_path / dirname))

        for filename in sorted(filenames):
            file_path = current_path / filename
            if should_skip_file(file_path):
                continue

            extension = file_path.suffix[1:] if file_path.suffix else ""
            directory = root_relative(file_path.parent)

            files.append(
                {
                    "path": root_relative(file_path),
                    "directory": directory,
                    "extension": extension,
                }
            )

    files.sort(key=lambda item: item["path"])
    return sorted(directories), files


def render_manifest(root: Path, directories: list[str], files: list[dict[str, str]]) -> str:
    lines: list[str] = []

    lines.append("meta:")
    lines.append(f"  manifest_version: {MANIFEST_VERSION}")
    lines.append(
        f"  generated_at: {yaml_quote(datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace('+00:00', 'Z'))}"
    )
    lines.append(f"  repository_root: {yaml_quote(root.resolve().name)}")
    lines.append(f"  total_directories: {len(directories)}")
    lines.append(f"  total_files: {len(files)}")
    lines.append("  excluded_dirs:")
    for name in sorted(EXCLUDED_DIRS):
        lines.append(f"    - {yaml_quote(name)}")

    lines.append("")
    lines.append("directory_tree:")
    for directory in directories:
        lines.append(f"  - path: {yaml_quote(directory)}")

    lines.append("")
    lines.append("files:")
    for item in files:
        lines.append(f"  - path: {yaml_quote(item['path'])}")
        lines.append(f"    directory: {yaml_quote(item['directory'])}")
        lines.append(f"    extension: {yaml_quote(item['extension'])}")

    lines.append("")
    return "\n".join(lines)


def main() -> None:
    root = Path.cwd()
    directories, files = collect_repository_state(root)
    MANIFEST_PATH.write_text(render_manifest(root, directories, files), encoding="utf-8")


if __name__ == "__main__":
    main()
