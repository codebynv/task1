// ============================================================
// HH GOA 2026 — TEAM FRAME RENDERER
// Phase 2A
//
// Supports:
// 1 Builder
// 2 Builders
// 3 Builders
//
// Individual Builder ID renderer remains untouched.
// ============================================================

const TEAM_CANVAS_WIDTH = 1600;
const TEAM_CANVAS_HEIGHT = 1000;

// ============================================================
// COLORS
// ============================================================

const COLORS = {
  green: "#075C35",
  deepGreen: "#043D25",
  dark: "#032B1A",

  yellow: "#FFE500",
  pink: "#FF2A8A",

  cream: "#F7F0D0",
  white: "#FFFDF2",

  muted: "#B8CBAE",

  line: "rgba(247, 240, 208, 0.24)",
};

// ============================================================
// MAIN
// ============================================================

export async function generateTeamFrame({
  members = [],
  teamName = "",
}) {
  const validMembers = members
    .filter(
      (member) =>
        member &&
        member.imageUrl &&
        member.name
    )
    .slice(0, 3);

  if (validMembers.length === 0) {
    throw new Error(
      "At least one team member is required."
    );
  }

  // ----------------------------------------------------------
  // Canvas
  // ----------------------------------------------------------

  const canvas =
    document.createElement("canvas");

  canvas.width =
    TEAM_CANVAS_WIDTH;

  canvas.height =
    TEAM_CANVAS_HEIGHT;

  const ctx =
    canvas.getContext("2d");

  // ----------------------------------------------------------
  // Load member images
  // ----------------------------------------------------------

  const loadedMembers =
    await Promise.all(
      validMembers.map(
        async (member) => ({
          ...member,
          image:
            await loadImage(
              member.imageUrl
            ),
        })
      )
    );

  // ----------------------------------------------------------
  // Draw frame
  // ----------------------------------------------------------

  drawBackground(ctx);

  drawOuterFrame(ctx);

  drawSun(
    ctx,
    1370,
    135
  );

  drawPalm(
    ctx,
    75,
    940,
    0.75
  );

  drawPalm(
    ctx,
    1525,
    940,
    -0.75
  );

  drawHeader(
    ctx,
    teamName,
    loadedMembers.length
  );

  // ----------------------------------------------------------
  // Members
  // ----------------------------------------------------------

  if (
    loadedMembers.length === 1
  ) {
    drawOneMember(
      ctx,
      loadedMembers[0]
    );
  }

  if (
    loadedMembers.length === 2
  ) {
    drawTwoMembers(
      ctx,
      loadedMembers
    );
  }

  if (
    loadedMembers.length === 3
  ) {
    drawThreeMembers(
      ctx,
      loadedMembers
    );
  }

  // ----------------------------------------------------------
  // Footer
  // ----------------------------------------------------------

  drawFooter(ctx);

  // ----------------------------------------------------------
  // Export
  // ----------------------------------------------------------

  return new Promise(
    (resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error(
                "Failed to create team frame."
              )
            );

            return;
          }

          resolve({
            blob,
            url:
              URL.createObjectURL(
                blob
              ),
          });
        },
        "image/png",
        1
      );
    }
  );
}

// ============================================================
// BACKGROUND
// ============================================================

function drawBackground(ctx) {
  ctx.fillStyle =
    COLORS.green;

  ctx.fillRect(
    0,
    0,
    TEAM_CANVAS_WIDTH,
    TEAM_CANVAS_HEIGHT
  );

  ctx.fillStyle =
    COLORS.deepGreen;

  roundedRect(
    ctx,
    28,
    28,
    TEAM_CANVAS_WIDTH - 56,
    TEAM_CANVAS_HEIGHT - 56,
    36
  );

  ctx.fill();

  // Subtle texture

  ctx.globalAlpha = 0.07;

  for (
    let i = 0;
    i < 500;
    i++
  ) {
    const x =
      Math.random() *
      TEAM_CANVAS_WIDTH;

    const y =
      Math.random() *
      TEAM_CANVAS_HEIGHT;

    ctx.fillStyle =
      COLORS.cream;

    ctx.fillRect(
      x,
      y,
      1.5,
      1.5
    );
  }

  ctx.globalAlpha = 1;
}

// ============================================================
// OUTER FRAME
// ============================================================

function drawOuterFrame(ctx) {
  ctx.strokeStyle =
    COLORS.yellow;

  ctx.lineWidth = 6;

  roundedRect(
    ctx,
    24,
    24,
    TEAM_CANVAS_WIDTH - 48,
    TEAM_CANVAS_HEIGHT - 48,
    40
  );

  ctx.stroke();

  ctx.strokeStyle =
    COLORS.pink;

  ctx.lineWidth = 2;

  roundedRect(
    ctx,
    42,
    42,
    TEAM_CANVAS_WIDTH - 84,
    TEAM_CANVAS_HEIGHT - 84,
    30
  );

  ctx.stroke();
}

// ============================================================
// HEADER
// ============================================================

function drawHeader(
  ctx,
  teamName,
  memberCount
) {
  // Hacker House

  ctx.fillStyle =
    COLORS.cream;

  ctx.font =
    "900 38px Arial";

  ctx.fillText(
    "HACKER HOUSE",
    80,
    95
  );

  // Goa

  ctx.fillStyle =
    COLORS.yellow;

  ctx.font =
    "900 38px Arial";

  ctx.fillText(
    "GOA '26",
    1340,
    95
  );

  // Pink accent

  ctx.fillStyle =
    COLORS.pink;

  ctx.fillRect(
    80,
    122,
    100,
    7
  );

  // Divider

  ctx.strokeStyle =
    COLORS.line;

  ctx.lineWidth = 2;

  ctx.beginPath();

  ctx.moveTo(
    80,
    155
  );

  ctx.lineTo(
    1520,
    155
  );

  ctx.stroke();

  // Team title

  ctx.fillStyle =
    COLORS.pink;

  ctx.font =
    "900 25px Arial";

  const title =
    teamName.trim()
      ? teamName
      : "TEAM FRAME";

  ctx.fillText(
    title
      .toUpperCase()
      .slice(0, 28),
    80,
    195
  );

  // Member count

  ctx.fillStyle =
    COLORS.muted;

  ctx.font =
    "700 16px Arial";

  ctx.fillText(
    `${memberCount} BUILDER${
      memberCount === 1
        ? ""
        : "S"
    } · GOA 2026`,
    80,
    225
  );
}

// ============================================================
// ONE MEMBER
// ============================================================

function drawOneMember(
  ctx,
  member
) {
  const cardWidth = 780;
  const cardHeight = 510;

  const cardX =
    (TEAM_CANVAS_WIDTH -
      cardWidth) /
    2;

  const cardY = 270;

  drawMemberCard(
    ctx,
    member,
    cardX,
    cardY,
    cardWidth,
    cardHeight
  );
}

// ============================================================
// TWO MEMBERS
// ============================================================

function drawTwoMembers(
  ctx,
  members
) {
  // Keep duo cards large.

  const cardWidth = 650;
  const cardHeight = 500;

  const gap = 40;

  const totalWidth =
    cardWidth * 2 +
    gap;

  const startX =
    (TEAM_CANVAS_WIDTH -
      totalWidth) /
    2;

  const cardY = 285;

  drawMemberCard(
    ctx,
    members[0],
    startX,
    cardY,
    cardWidth,
    cardHeight
  );

  drawMemberCard(
    ctx,
    members[1],
    startX +
      cardWidth +
      gap,
    cardY,
    cardWidth,
    cardHeight
  );
}

// ============================================================
// THREE MEMBERS
// ============================================================

function drawThreeMembers(
  ctx,
  members
) {
  // Three cards always remain
  // on one horizontal line.

  const cardWidth = 450;
  const cardHeight = 500;

  const gap = 28;

  const totalWidth =
    cardWidth * 3 +
    gap * 2;

  const startX =
    (TEAM_CANVAS_WIDTH -
      totalWidth) /
    2;

  const cardY = 285;

  members.forEach(
    (member, index) => {
      drawMemberCard(
        ctx,
        member,
        startX +
          index *
            (cardWidth +
              gap),
        cardY,
        cardWidth,
        cardHeight
      );
    }
  );
}

// ============================================================
// MEMBER CARD
// ============================================================

function drawMemberCard(
  ctx,
  member,
  x,
  y,
  width,
  height
) {
  // ----------------------------------------------------------
  // Card background
  // ----------------------------------------------------------

  ctx.save();

  ctx.shadowColor =
    "rgba(0,0,0,0.35)";

  ctx.shadowBlur = 25;

  ctx.shadowOffsetY = 12;

  ctx.fillStyle =
    COLORS.dark;

  roundedRect(
    ctx,
    x,
    y,
    width,
    height,
    30
  );

  ctx.fill();

  ctx.restore();

  // ----------------------------------------------------------
  // PHOTO
  // ----------------------------------------------------------

  const photoX =
    x + 18;

  const photoY =
    y + 18;

  const photoWidth =
    width - 36;

  const photoHeight =
    width >= 700
      ? 300
      : 255;

  drawMemberPhoto(
    ctx,
    member.image,
    photoX,
    photoY,
    photoWidth,
    photoHeight
  );

  // ----------------------------------------------------------
  // CONTENT CENTER
  // ----------------------------------------------------------

  const centerX =
    x + width / 2;

  // ----------------------------------------------------------
  // NAME
  // ----------------------------------------------------------

  const nameY =
    photoY +
    photoHeight +
    52;

  const maxNameWidth =
    width - 45;

  let nameSize =
    width >= 700
      ? 34
      : 27;

  const displayName =
    String(member.name)
      .toUpperCase();

  ctx.textAlign =
    "center";

  ctx.font =
    `900 ${nameSize}px Arial`;

  while (
    ctx.measureText(
      displayName
    ).width >
      maxNameWidth &&
    nameSize > 18
  ) {
    nameSize -= 2;

    ctx.font =
      `900 ${nameSize}px Arial`;
  }

  ctx.fillStyle =
    COLORS.cream;

  ctx.fillText(
    displayName.slice(
      0,
      24
    ),
    centerX,
    nameY
  );

  // ----------------------------------------------------------
  // ROLE
  // ----------------------------------------------------------

  const role =
    member.role ||
    "BUILDER";

  ctx.fillStyle =
    COLORS.yellow;

  ctx.font =
    width >= 700
      ? "900 18px Arial"
      : "900 15px Arial";

  ctx.fillText(
    String(role)
      .toUpperCase()
      .slice(0, 28),
    centerX,
    nameY + 30
  );

  // ----------------------------------------------------------
  // PERSONA BADGE
  // ----------------------------------------------------------

  const persona =
    member.builderPersona ||
    member.builderTitle ||
    "GOA BUILDER";

  const badgeY =
    nameY + 48;

  const badgeWidth =
    Math.min(
      width - 50,
      width >= 700
        ? 360
        : 270
    );

  const badgeHeight =
    width >= 700
      ? 48
      : 42;

  const badgeX =
    centerX -
    badgeWidth / 2;

  // Background

  ctx.fillStyle =
    "rgba(255,42,138,0.14)";

  roundedRect(
    ctx,
    badgeX,
    badgeY,
    badgeWidth,
    badgeHeight,
    14
  );

  ctx.fill();

  // Border

  ctx.strokeStyle =
    COLORS.pink;

  ctx.lineWidth = 2;

  roundedRect(
    ctx,
    badgeX,
    badgeY,
    badgeWidth,
    badgeHeight,
    14
  );

  ctx.stroke();

  // Persona text

  ctx.fillStyle =
    COLORS.pink;

  ctx.font =
    width >= 700
      ? "900 20px Arial"
      : "900 16px Arial";

  ctx.fillText(
    String(persona)
      .toUpperCase()
      .slice(0, 20),
    centerX,
    badgeY +
      (width >= 700
        ? 31
        : 28)
  );

  // ----------------------------------------------------------
  // BUILDER ID
  // ----------------------------------------------------------

  if (member.builderId) {
    ctx.fillStyle =
      COLORS.muted;

    ctx.font =
      "700 12px Arial";

    ctx.fillText(
      "BUILDER ID",
      centerX,
      badgeY +
        badgeHeight +
        28
    );

    ctx.fillStyle =
      COLORS.yellow;

    ctx.font =
      width >= 700
        ? "900 19px monospace"
        : "900 15px monospace";

    ctx.fillText(
      String(
        member.builderId
      ).slice(0, 18),
      centerX,
      badgeY +
        badgeHeight +
        52
    );
  }

  // Reset alignment

  ctx.textAlign =
    "start";
}

// ============================================================
// MEMBER PHOTO
// ============================================================

function drawMemberPhoto(
  ctx,
  image,
  x,
  y,
  width,
  height
) {
  const radius = 24;

  // Base

  ctx.save();

  ctx.fillStyle =
    COLORS.dark;

  roundedRect(
    ctx,
    x,
    y,
    width,
    height,
    radius
  );

  ctx.fill();

  ctx.restore();

  // Image

  ctx.save();

  roundedRect(
    ctx,
    x,
    y,
    width,
    height,
    radius
  );

  ctx.clip();

  drawCoverImage(
    ctx,
    image,
    x,
    y,
    width,
    height
  );

  // Gradient

  const gradient =
    ctx.createLinearGradient(
      0,
      y,
      0,
      y + height
    );

  gradient.addColorStop(
    0,
    "rgba(0,0,0,0)"
  );

  gradient.addColorStop(
    0.7,
    "rgba(0,0,0,0)"
  );

  gradient.addColorStop(
    1,
    "rgba(0,30,15,0.65)"
  );

  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    x,
    y,
    width,
    height
  );

  ctx.restore();

  // Yellow border

  ctx.strokeStyle =
    COLORS.yellow;

  ctx.lineWidth = 6;

  roundedRect(
    ctx,
    x,
    y,
    width,
    height,
    radius
  );

  ctx.stroke();

  // Pink corner accents

  ctx.strokeStyle =
    COLORS.pink;

  ctx.lineWidth = 5;

  ctx.beginPath();

  ctx.moveTo(
    x + 25,
    y
  );

  ctx.lineTo(
    x + 80,
    y
  );

  ctx.moveTo(
    x + width - 80,
    y + height
  );

  ctx.lineTo(
    x + width - 25,
    y + height
  );

  ctx.stroke();
}

// ============================================================
// FOOTER
// ============================================================

function drawFooter(ctx) {
  ctx.strokeStyle =
    COLORS.line;

  ctx.lineWidth = 2;

  ctx.beginPath();

  ctx.moveTo(
    80,
    845
  );

  ctx.lineTo(
    1520,
    845
  );

  ctx.stroke();

  // Left

  ctx.textAlign =
    "start";

  ctx.fillStyle =
    COLORS.cream;

  ctx.font =
    "900 21px Arial";

  ctx.fillText(
    "BUILD · SHIP · LAUNCH",
    80,
    890
  );

  // Right

  ctx.textAlign =
    "right";

  ctx.fillStyle =
    COLORS.pink;

  ctx.font =
    "900 23px Arial";

  ctx.fillText(
    "#FrameInGoa",
    1520,
    890
  );

  // Bottom

  ctx.textAlign =
    "start";

  ctx.fillStyle =
    COLORS.muted;

  ctx.font =
    "600 14px Arial";

  ctx.fillText(
    "HACKER HOUSE GOA 2026",
    80,
    925
  );

  ctx.textAlign =
    "right";

  ctx.fillText(
    "BUILDERS · GOA",
    1520,
    925
  );

  ctx.textAlign =
    "start";
}

// ============================================================
// SUN
// ============================================================

function drawSun(
  ctx,
  x,
  y
) {
  ctx.save();

  ctx.globalAlpha =
    0.78;

  ctx.strokeStyle =
    COLORS.yellow;

  ctx.lineWidth = 3;

  for (
    let i = 0;
    i < 12;
    i++
  ) {
    const angle =
      (Math.PI * 2 * i) /
      12;

    const x1 =
      x +
      Math.cos(angle) *
        55;

    const y1 =
      y +
      Math.sin(angle) *
        55;

    const x2 =
      x +
      Math.cos(angle) *
        78;

    const y2 =
      y +
      Math.sin(angle) *
        78;

    ctx.beginPath();

    ctx.moveTo(
      x1,
      y1
    );

    ctx.lineTo(
      x2,
      y2
    );

    ctx.stroke();
  }

  ctx.fillStyle =
    COLORS.yellow;

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    40,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();
}

// ============================================================
// PALM
// ============================================================

function drawPalm(
  ctx,
  x,
  y,
  scale = 1
) {
  ctx.save();

  ctx.translate(
    x,
    y
  );

  ctx.scale(
    scale,
    scale
  );

  ctx.strokeStyle =
    "rgba(255,229,0,0.28)";

  ctx.lineWidth = 7;

  ctx.lineCap =
    "round";

  // Trunk

  ctx.beginPath();

  ctx.moveTo(
    0,
    0
  );

  ctx.quadraticCurveTo(
    -10,
    -90,
    20,
    -190
  );

  ctx.stroke();

  // Leaves

  const leaves = [
    [-75, -180],
    [-55, -215],
    [-20, -230],
    [20, -235],
    [60, -210],
    [85, -175],
  ];

  leaves.forEach(
    ([leafX, leafY]) => {
      ctx.beginPath();

      ctx.moveTo(
        20,
        -190
      );

      ctx.quadraticCurveTo(
        leafX / 2,
        leafY / 2,
        leafX,
        leafY
      );

      ctx.stroke();
    }
  );

  ctx.restore();
}

// ============================================================
// COVER IMAGE
// ============================================================

function drawCoverImage(
  ctx,
  image,
  x,
  y,
  width,
  height
) {
  const imageRatio =
    image.width /
    image.height;

  const boxRatio =
    width /
    height;

  let sourceWidth =
    image.width;

  let sourceHeight =
    image.height;

  let sourceX = 0;

  let sourceY = 0;

  if (
    imageRatio >
    boxRatio
  ) {
    sourceWidth =
      image.height *
      boxRatio;

    sourceX =
      (image.width -
        sourceWidth) /
      2;
  } else {
    sourceHeight =
      image.width /
      boxRatio;

    sourceY =
      (image.height -
        sourceHeight) /
      2;
  }

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    x,
    y,
    width,
    height
  );
}

// ============================================================
// IMAGE LOADER
// ============================================================

function loadImage(src) {
  return new Promise(
    (resolve, reject) => {
      const image =
        new Image();

      image.onload =
        () =>
          resolve(image);

      image.onerror =
        () =>
          reject(
            new Error(
              "Failed to load team member image."
            )
          );

      image.src = src;
    }
  );
}

// ============================================================
// ROUNDED RECT
// ============================================================

function roundedRect(
  ctx,
  x,
  y,
  width,
  height,
  radius
) {
  ctx.beginPath();

  ctx.moveTo(
    x + radius,
    y
  );

  ctx.lineTo(
    x + width - radius,
    y
  );

  ctx.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + radius
  );

  ctx.lineTo(
    x + width,
    y + height - radius
  );

  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );

  ctx.lineTo(
    x + radius,
    y + height
  );

  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - radius
  );

  ctx.lineTo(
    x,
    y + radius
  );

  ctx.quadraticCurveTo(
    x,
    y,
    x + radius,
    y
  );

  ctx.closePath();
}