// CORE FRONTIER — Wave Manager helpers
// Extracted from systems.js.
// Browser-global runtime. No imports/exports.

// ---------- WAVE MANAGER ----------

function createWave(number) {
  const profile =
    difficultyProfiles[gameState.difficulty];

  const wave = [];

  const runnerCount = Math.ceil(
    (
      gameBalance.firstWaveEnemyCount +
      number * gameBalance.waveGrowth
    ) * profile.enemyCount
  );

  const scoutCount =
    number >= 2
      ? Math.ceil(
          (
            1 +
            Math.floor(number / 2)
          ) * profile.enemyCount
        )
      : 0;

  const tankCount =
    number >= 3
      ? Math.ceil(
          Math.floor(number / 3) *
          profile.enemyCount
        )
      : 0;

  for (let i = 0; i < runnerCount; i++) {
    wave.push({ type: "runner" });
  }

  for (let i = 0; i < scoutCount; i++) {
    wave.push({ type: "scout" });
  }

  for (let i = 0; i < tankCount; i++) {
    wave.push({ type: "tank" });
  }

  return shuffleWave(wave);
}

function shuffleWave(wave) {
  const result = [...wave];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [result[i], result[j]] =
      [result[j], result[i]];
  }

  return result;
}

function spawnEnemy(typeId, index) {
  const type = enemyTypes[typeId];

  const profile =
    difficultyProfiles[gameState.difficulty];

  const waveHpBonus =
    waveState.number * 5;

  const spawnSpacing = 34;

  const hp = Math.ceil(
    (
      type.hp +
      waveHpBonus
    ) * profile.enemyHp
  );

  const speed =
    (
      type.speed +
      waveState.number * 0.035
    ) * profile.enemySpeed;

  enemies.push({
    typeId,

    pathIndex: 0,

    x:
      enemyPath[0].x * TILE_SIZE +
      TILE_SIZE / 2 -
      index * spawnSpacing,

    y:
      enemyPath[0].y * TILE_SIZE +
      TILE_SIZE / 2,

    hp,
    maxHp: hp,

    speed,

    reachedBase: false
  });

  waveState.spawnedEnemies += 1;
}
