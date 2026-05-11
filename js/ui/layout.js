function applyFixedStyle(
  element,
  styles
) {
  element.style.position =
    "fixed";

  Object.entries(styles)
    .forEach(
      ([key, value]) => {
        element.style[key] =
          value;
      }
    );
}

function createTopbar() {
  const topbar =
    document.getElementById(
      "topbar"
    );

  if (!topbar) return;

  topbar.innerHTML = "";

  const items = [
    {
      id: "wood",
      icon: "🌲",
      value: resources.wood
    },

    {
      id: "stone",
      icon: "🪨",
      value: resources.stone
    },

    {
      id: "food",
      icon: "🥩",
      value: resources.food
    },

    {
      id: "power",
      icon: "⚡",
      value:
        power.used +
        "/" +
        power.capacity
    },

    {
      id: "hp",
      icon: "❤️",
      value: base.hp
    },

    {
      id: "wave",
      icon: "⚔️",
      value: waveState.number
    }
  ];

  items.forEach(item => {
    const div =
      document.createElement(
        "div"
      );

    div.className =
      "resource";

    div.innerHTML =
      item.icon +
      " <span id=\"" +
      item.id +
      "\">" +
      item.value +
      "</span>";

    topbar.appendChild(div);
  });
}

function updateTopbar() {
  setText(
    "wood",
    Math.floor(
      resources.wood
    )
  );

  setText(
    "stone",
    Math.floor(
      resources.stone
    )
  );

  setText(
    "food",
    Math.floor(
      resources.food
    )
  );

  setText(
    "power",
    power.used +
      "/" +
      power.capacity
  );

  setText(
    "hp",
    Math.max(
      0,
      Math.floor(base.hp)
    )
  );

  setText(
    "wave",
    waveState.number
  );
}

// ---------- RESPONSIVE ----------

function getBottomOffset() {
  if (
    uiLayout.isMobile &&
    uiLayout.isLandscape
  ) {
    return "8px";
  }

  return uiLayout.compact
    ? "10px"
    : "14px";
}

function getRightOffset() {
  return uiLayout.compact
    ? "8px"
    : "12px";
}

function getTopOffset() {
  if (
    uiLayout.isMobile &&
    uiLayout.isLandscape
  ) {
    return "62px";
  }

  return uiLayout.compact
    ? "74px"
    : "92px";
}

function getZoomTopOffset() {
  if (
    uiLayout.isMobile &&
    uiLayout.isLandscape
  ) {
    return "128px";
  }

  return uiLayout.compact
    ? "146px"
    : "214px";
}