const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1350;

// ============================================================
// HH GOA 2026
// TROPICAL EDITORIAL BUILDER PASS
// ============================================================

const COLORS = {
  green: "#075C35",
  deepGreen: "#043D25",
  darkerGreen: "#032B1A",

  yellow: "#FFE500",
  pink: "#FF2A8A",

  cream: "#F7F0D0",
  white: "#FFFDF2",

  muted: "#B8CBAE",

  line: "rgba(247, 240, 208, 0.24)",
  softLine: "rgba(247, 240, 208, 0.14)",

  glass: "rgba(247, 240, 208, 0.075)",
  pinkGlass: "rgba(255, 42, 138, 0.10)",
};

// ============================================================
// MAIN
// ============================================================

export async function generateBuilderCard({
  imageUrl,
  name = "",
  role = "",
  stack = "",
  builderTitle = "",
  builderPersona = "",
  builderCategory = "",
  builderId = "",
}) {
  const canvas =
    document.createElement("canvas");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const ctx =
    canvas.getContext("2d");

  if (!ctx) {
    throw new Error(
      "Canvas context could not be created."
    );
  }

  const image =
    await loadImage(imageUrl);

  const focalPoint =
    await detectFocalPoint(image);

  // ----------------------------------------------------------
  // BACKGROUND
  // ----------------------------------------------------------

  drawBackground(ctx);

  // ----------------------------------------------------------
  // FRAME
  // ----------------------------------------------------------

  drawOuterFrame(ctx);

  // ----------------------------------------------------------
  // TROPICAL DECORATION
  // ----------------------------------------------------------

  drawTropicalDecor(ctx);

  // ----------------------------------------------------------
  // HEADER
  // ----------------------------------------------------------

  drawHeader(ctx);

  // ----------------------------------------------------------
  // BUILDER PASS
  // ----------------------------------------------------------

  drawBuilderPass(ctx);

  // ----------------------------------------------------------
  // PHOTO
  // ----------------------------------------------------------

  drawPhoto(
    ctx,
    image,
    90,
    270,
    900,
    490,
    focalPoint
  );

  // ----------------------------------------------------------
  // IDENTITY
  // ----------------------------------------------------------

  drawIdentity(
    ctx,
    name,
    role,
    stack,
    builderTitle,
    builderPersona,
    builderCategory
  );

  // ----------------------------------------------------------
  // BUILDER ID
  // ----------------------------------------------------------

  drawBuilderId(
    ctx,
    builderId
  );

  // ----------------------------------------------------------
  // FOOTER
  // ----------------------------------------------------------

  drawFooter(ctx);

  // ----------------------------------------------------------
  // EXPORT
  // ----------------------------------------------------------

  return new Promise(
    (resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error(
                "Could not create PNG."
              )
            );

            return;
          }

          resolve({
            blob,
            url:
              URL.createObjectURL(blob),
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
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );

  ctx.fillStyle =
    COLORS.deepGreen;

  roundedRect(
    ctx,
    28,
    28,
    CANVAS_WIDTH - 56,
    CANVAS_HEIGHT - 56,
    34
  );

  ctx.fill();

  // Very subtle grain
  ctx.save();

  ctx.globalAlpha = 0.055;

  for (
    let i = 0;
    i < 350;
    i++
  ) {
    const x =
      Math.random() *
      CANVAS_WIDTH;

    const y =
      Math.random() *
      CANVAS_HEIGHT;

    ctx.fillStyle =
      COLORS.cream;

    ctx.fillRect(
      x,
      y,
      1.5,
      1.5
    );
  }

  ctx.restore();
}

// ============================================================
// OUTER FRAME
// ============================================================

function drawOuterFrame(ctx) {
  ctx.strokeStyle =
    COLORS.yellow;

  ctx.lineWidth = 5;

  roundedRect(
    ctx,
    24,
    24,
    CANVAS_WIDTH - 48,
    CANVAS_HEIGHT - 48,
    38
  );

  ctx.stroke();

  ctx.strokeStyle =
    COLORS.pink;

  ctx.lineWidth = 2;

  roundedRect(
    ctx,
    42,
    42,
    CANVAS_WIDTH - 84,
    CANVAS_HEIGHT - 84,
    28
  );

  ctx.stroke();

  // Header accent
  ctx.fillStyle =
    COLORS.pink;

  ctx.fillRect(
    78,
    124,
    92,
    6
  );
}

// ============================================================
// TROPICAL DECORATION
// ============================================================

function drawTropicalDecor(ctx) {
  drawSun(
    ctx,
    895,
    165
  );

  drawPalm(
    ctx,
    72,
    1215,
    0.72
  );

  drawPalm(
    ctx,
    1010,
    1215,
    -0.72
  );

  // Small yellow dot
  ctx.fillStyle =
    COLORS.yellow;

  ctx.beginPath();

  ctx.arc(
    1000,
    224,
    7,
    0,
    Math.PI * 2
  );

  ctx.fill();

  // Small pink dot
  ctx.fillStyle =
    COLORS.pink;

  ctx.beginPath();

  ctx.arc(
    76,
    255,
    5,
    0,
    Math.PI * 2
  );

  ctx.fill();
}

// ============================================================
// HEADER
// ============================================================

function drawHeader(ctx) {
  ctx.fillStyle =
    COLORS.cream;

  ctx.font =
    "900 32px Arial";

  ctx.fillText(
    "HACKER HOUSE",
    78,
    100
  );

  ctx.fillStyle =
    COLORS.yellow;

  ctx.font =
    "900 32px Arial";

  ctx.fillText(
    "GOA '26",
    865,
    100
  );

  ctx.strokeStyle =
    COLORS.line;

  ctx.lineWidth = 2;

  ctx.beginPath();

  ctx.moveTo(
    78,
    150
  );

  ctx.lineTo(
    1002,
    150
  );

  ctx.stroke();

  ctx.fillStyle =
    COLORS.muted;

  ctx.font =
    "700 16px Arial";

  ctx.fillText(
    "GOA, INDIA  ·  28—31 OCT 2026",
    78,
    180
  );
}

// ============================================================
// BUILDER PASS
// ============================================================

function drawBuilderPass(ctx) {
  ctx.fillStyle =
    COLORS.pink;

  ctx.font =
    "900 21px Arial";

  ctx.fillText(
    "BUILDER PASS",
    80,
    230
  );

  ctx.fillStyle =
    COLORS.yellow;

  ctx.fillRect(
    80,
    242,
    70,
    4
  );
}

// ============================================================
// PHOTO
// ============================================================

function drawPhoto(
  ctx,
  image,
  x,
  y,
  width,
  height,
  focalPoint = {
    x: 0.5,
    y: 0.5,
  }
) {
  const radius = 38;

  // Shadow
  ctx.save();

  ctx.shadowColor =
    "rgba(0,0,0,0.45)";

  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 14;

  ctx.fillStyle =
    COLORS.darkerGreen;

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
    height,
    focalPoint
  );

  // Bottom fade
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
    0.72,
    "rgba(0,0,0,0)"
  );

  gradient.addColorStop(
    1,
    "rgba(3,43,26,0.65)"
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

  // Yellow photo frame
  ctx.strokeStyle =
    COLORS.yellow;

  ctx.lineWidth = 8;

  roundedRect(
    ctx,
    x,
    y,
    width,
    height,
    radius
  );

  ctx.stroke();

  // Pink accents
  ctx.strokeStyle =
    COLORS.pink;

  ctx.lineWidth = 6;

  ctx.beginPath();

  ctx.moveTo(
    x + 35,
    y
  );

  ctx.lineTo(
    x + 115,
    y
  );

  ctx.moveTo(
    x + width - 115,
    y + height
  );

  ctx.lineTo(
    x + width - 35,
    y + height
  );

  ctx.stroke();
}

// ============================================================
// IDENTITY
// ============================================================

function drawIdentity(
  ctx,
  name,
  role,
  stack,
  builderTitle,
  builderPersona,
  builderCategory
) {
  const safeName =
    String(
      name || "GOA BUILDER"
    )
      .trim()
      .toUpperCase();

  let nameSize = 62;

  if (
    safeName.length > 22
  ) {
    nameSize = 43;
  } else if (
    safeName.length > 17
  ) {
    nameSize = 51;
  }

  // ----------------------------------------------------------
  // NAME
  // ----------------------------------------------------------

  ctx.fillStyle =
    COLORS.cream;

  ctx.font =
    `900 ${nameSize}px Arial`;

  ctx.fillText(
    safeName,
    80,
    865
  );

  // ----------------------------------------------------------
  // ROLE
  // ----------------------------------------------------------

  const safeRole =
    String(
      role || "BUILDER"
    )
      .trim()
      .toUpperCase();

  ctx.fillStyle =
    COLORS.yellow;

  ctx.font =
    "900 24px Arial";

  const roleText =
    fitText(
      ctx,
      safeRole,
      24,
      760
    );

  ctx.fillText(
    roleText,
    82,
    905
  );

  // ----------------------------------------------------------
  // PERSONA
  // ----------------------------------------------------------

  const persona =
    builderPersona ||
    builderTitle ||
    "GOA BUILDER";

  drawPersonaBadge(
    ctx,
    persona,
    builderCategory
  );

  // ----------------------------------------------------------
  // STACK
  // ----------------------------------------------------------

  drawStackBadges(
    ctx,
    stack
  );

  // ----------------------------------------------------------
  // CATEGORY
  // ----------------------------------------------------------

  drawBuilderCategory(
    ctx,
    builderCategory
  );
}

// ============================================================
// PERSONA BADGE
// ============================================================

function drawPersonaBadge(
  ctx,
  persona,
  category = ""
) {
  const x = 80;
  const y = 948;

  const width = 430;
  const height = 64;

  // Soft background
  ctx.fillStyle =
    COLORS.pinkGlass;

  roundedRect(
    ctx,
    x,
    y,
    width,
    height,
    16
  );

  ctx.fill();

  // Pink outline
  ctx.strokeStyle =
    COLORS.pink;

  ctx.lineWidth = 2;

  roundedRect(
    ctx,
    x,
    y,
    width,
    height,
    16
  );

  ctx.stroke();

  // Small classification label
  ctx.fillStyle =
    COLORS.muted;

  ctx.font =
    "700 11px Arial";

  ctx.fillText(
    "BUILDER CLASS",
    x + 20,
    y + 18
  );

  // Main persona
  ctx.fillStyle =
    COLORS.pink;

  ctx.font =
    "900 25px Arial";

  const personaText =
    fitText(
      ctx,
      String(persona)
        .toUpperCase(),
      25,
      width - 40
    );

  ctx.fillText(
    personaText,
    x + 20,
    y + 47
  );
}

// ============================================================
// STACK PARSER
// ============================================================

function parseStack(
  stack = ""
) {
  if (!stack) {
    return [];
  }

  const value =
    String(stack)
      .trim();

  if (!value) {
    return [];
  }

  const knownTechnologies = [
    "react native",
    "react.js",
    "reactjs",

    "node.js",
    "nodejs",

    "next.js",
    "nextjs",

    "vue.js",
    "vuejs",

    "express.js",
    "express",

    "fastapi",
    "django",
    "flask",

    "tensorflow",
    "pytorch",
    "keras",

    "machine learning",
    "deep learning",
    "artificial intelligence",
    "computer vision",

    "cybersecurity",
    "ethical hacking",
    "penetration testing",

    "kubernetes",
    "docker",
    "jenkins",
    "terraform",

    "javascript",
    "typescript",
    "python",
    "java",
    "c++",
    "c#",

    "html",
    "css",

    "sql",
    "mysql",
    "mongodb",
    "postgresql",
    "firebase",

    "git",
    "github",
    "linux",
    "kali",

    "aws",
    "azure",
    "gcp",
    "cloud",

    "flutter",
    "kotlin",
    "swift",

    "solidity",
    "web3",

    "php",
    "laravel",

    "numpy",
    "pandas",
    "matplotlib",
  ];

  const result = [];

  const addUnique =
    (technology) => {
      const clean =
        String(technology)
          .trim()
          .replace(
            /\s+/g,
            " "
          );

      if (!clean) {
        return;
      }

      const exists =
        result.some(
          (item) =>
            item.toLowerCase() ===
            clean.toLowerCase()
        );

      if (!exists) {
        result.push(clean);
      }
    };

  // ----------------------------------------------------------
  // Comma / pipe / newline / semicolon
  // ----------------------------------------------------------

  const separated =
    value
      .split(/[,|\n;]+/)
      .map(
        (item) =>
          item.trim()
      )
      .filter(Boolean);

  if (
    separated.length > 1
  ) {
    separated
      .slice(0, 4)
      .forEach(addUnique);

    return result;
  }

  // ----------------------------------------------------------
  // Space-separated stack
  // ----------------------------------------------------------

  const lowerValue =
    value.toLowerCase();

  const sortedTechnologies =
    [...knownTechnologies]
      .sort(
        (a, b) =>
          b.length - a.length
      );

  const found = [];

  for (
    const technology
    of sortedTechnologies
  ) {
    const escaped =
      technology.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    const regex =
      new RegExp(
        `(^|\\s)${escaped}(?=\\s|$)`,
        "i"
      );

    if (
      regex.test(
        lowerValue
      )
    ) {
      const index =
        lowerValue.indexOf(
          technology.toLowerCase()
        );

      found.push({
        technology,
        index:
          index === -1
            ? Number.MAX_SAFE_INTEGER
            : index,
      });
    }
  }

  if (
    found.length > 0
  ) {
    found
      .sort(
        (a, b) =>
          a.index - b.index
      )
      .slice(0, 4)
      .forEach(
        (item) =>
          addUnique(
            item.technology
          )
      );

    return result;
  }

  // Fallback
  value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4)
    .forEach(addUnique);

  return result;
}

// ============================================================
// STACK BADGES
// ============================================================

function drawStackBadges(
  ctx,
  stack = ""
) {
  const technologies =
    parseStack(stack);

  if (
    technologies.length === 0
  ) {
    return;
  }

  const startX = 540;
  const startY = 959;

  const maxRight = 1000;

  let currentX =
    startX;

  technologies.forEach(
    (technology) => {
      const text =
        technology
          .toUpperCase();

      ctx.font =
        "800 15px Arial";

      const textWidth =
        ctx.measureText(
          text
        ).width;

      const badgeWidth =
        Math.min(
          textWidth + 30,
          142
        );

      const badgeHeight =
        40;

      if (
        currentX +
          badgeWidth >
        maxRight
      ) {
        return;
      }

      // Badge background
      ctx.fillStyle =
        COLORS.glass;

      roundedRect(
        ctx,
        currentX,
        startY,
        badgeWidth,
        badgeHeight,
        20
      );

      ctx.fill();

      // Badge border
      ctx.strokeStyle =
        "rgba(247,240,208,0.34)";

      ctx.lineWidth = 1.5;

      roundedRect(
        ctx,
        currentX,
        startY,
        badgeWidth,
        badgeHeight,
        20
      );

      ctx.stroke();

      // Text
      ctx.fillStyle =
        COLORS.cream;

      ctx.font =
        "800 15px Arial";

      let displayText =
        text;

      while (
        displayText.length > 1 &&
        ctx.measureText(
          displayText
        ).width >
          badgeWidth - 20
      ) {
        displayText =
          displayText.slice(
            0,
            -1
          );
      }

      if (
        displayText !== text
      ) {
        displayText =
          displayText.slice(
            0,
            -1
          ) + "…";
      }

      ctx.fillText(
        displayText,
        currentX + 15,
        startY + 26
      );

      currentX +=
        badgeWidth + 8;
    }
  );
}

// ============================================================
// BUILDER CATEGORY
// ============================================================

function drawBuilderCategory(
  ctx,
  category = ""
) {
  if (!category) {
    return;
  }

  ctx.fillStyle =
    COLORS.muted;

  ctx.font =
    "700 13px Arial";

  ctx.fillText(
    `BUILDER TYPE  ·  ${String(
      category
    ).toUpperCase()}`,
    540,
    1029
  );
}

// ============================================================
// BUILDER ID
// ============================================================

function drawBuilderId(
  ctx,
  builderId
) {
  // Divider
  ctx.strokeStyle =
    COLORS.line;

  ctx.lineWidth = 2;

  ctx.beginPath();

  ctx.moveTo(
    80,
    1055
  );

  ctx.lineTo(
    1000,
    1055
  );

  ctx.stroke();

  // Label
  ctx.fillStyle =
    COLORS.muted;

  ctx.font =
    "700 16px Arial";

  ctx.fillText(
    "BUILDER ID",
    80,
    1090
  );

  // ID
  ctx.fillStyle =
    COLORS.yellow;

  ctx.font =
    "900 47px monospace";

  ctx.fillText(
    builderId ||
      "HH26-GO-0000",
    80,
    1140
  );

  // Status pill
  const pillX = 760;
  const pillY = 1090;

  const pillWidth = 240;
  const pillHeight = 55;

  ctx.fillStyle =
    COLORS.yellow;

  roundedRect(
    ctx,
    pillX,
    pillY,
    pillWidth,
    pillHeight,
    28
  );

  ctx.fill();

  ctx.fillStyle =
    COLORS.darkerGreen;

  ctx.font =
    "900 17px Arial";

  ctx.fillText(
    "GOA BUILDER",
    pillX + 55,
    pillY + 34
  );
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
    1200
  );

  ctx.lineTo(
    1000,
    1200
  );

  ctx.stroke();

  // Main footer
  ctx.fillStyle =
    COLORS.cream;

  ctx.font =
    "900 19px Arial";

  ctx.fillText(
    "BUILD · SHIP · LAUNCH",
    80,
    1245
  );

  // Hashtag
  ctx.fillStyle =
    COLORS.pink;

  ctx.font =
    "900 21px Arial";

  ctx.fillText(
    "#FrameInGoa",
    850,
    1245
  );

  // Bottom micro text
  ctx.fillStyle =
    COLORS.muted;

  ctx.font =
    "600 13px Arial";

  ctx.fillText(
    "HACKER HOUSE GOA 2026",
    80,
    1285
  );

  ctx.fillText(
    "247 BUILDERS · GOA",
    820,
    1285
  );
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
        58;

    const y1 =
      y +
      Math.sin(angle) *
        58;

    const x2 =
      x +
      Math.cos(angle) *
        82;

    const y2 =
      y +
      Math.sin(angle) *
        82;

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
    44,
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
    "rgba(255,229,0,0.22)";

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
    -100,
    18,
    -225
  );

  ctx.stroke();

  // Leaves
  const leaves = [
    [-88, -215],
    [-65, -255],
    [-20, -275],
    [25, -280],
    [70, -250],
    [100, -210],
  ];

  leaves.forEach(
    ([leafX, leafY]) => {
      ctx.beginPath();

      ctx.moveTo(
        18,
        -225
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
  height,
  focalPoint = {
    x: 0.5,
    y: 0.5,
  }
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

  // Calculate crop
  if (
    imageRatio >
    boxRatio
  ) {
    sourceWidth =
      image.height *
      boxRatio;
  } else {
    sourceHeight =
      image.width /
      boxRatio;
  }

  const focalX =
    clamp(
      Number(
        focalPoint?.x
      ) || 0.5,
      0,
      1
    );

  const focalY =
    clamp(
      Number(
        focalPoint?.y
      ) || 0.5,
      0,
      1
    );

  const maxSourceX =
    image.width -
    sourceWidth;

  const maxSourceY =
    image.height -
    sourceHeight;

  let sourceX =
    image.width *
      focalX -
    sourceWidth / 2;

  let sourceY =
    image.height *
      focalY -
    sourceHeight / 2;

  sourceX =
    clamp(
      sourceX,
      0,
      Math.max(
        0,
        maxSourceX
      )
    );

  sourceY =
    clamp(
      sourceY,
      0,
      Math.max(
        0,
        maxSourceY
      )
    );

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
// FACE / FOCAL POINT
// ============================================================

async function detectFocalPoint(
  image
) {
  const fallback = {
    x: 0.5,
    y: 0.5,
  };

  try {
    if (
      typeof window ===
        "undefined" ||
      typeof window.FaceDetector !==
        "function"
    ) {
      return fallback;
    }

    const detector =
      new window.FaceDetector({
        fastMode: true,
        maxDetectedFaces: 5,
      });

    const faces =
      await detector.detect(
        image
      );

    if (
      !Array.isArray(faces) ||
      faces.length === 0
    ) {
      return fallback;
    }

    const largestFace =
      faces.reduce(
        (
          largest,
          current
        ) => {
          const largestArea =
            largest.boundingBox
              .width *
            largest.boundingBox
              .height;

          const currentArea =
            current.boundingBox
              .width *
            current.boundingBox
              .height;

          return currentArea >
            largestArea
            ? current
            : largest;
        }
      );

    const box =
      largestFace.boundingBox;

    return {
      x:
        (box.x +
          box.width / 2) /
        image.width,

      y:
        (box.y +
          box.height / 2) /
        image.height,
    };
  } catch (error) {
    console.warn(
      "Face detection unavailable. Using center crop.",
      error
    );

    return fallback;
  }
}

// ============================================================
// TEXT FITTER
// ============================================================

function fitText(
  ctx,
  text,
  fontSize,
  maxWidth
) {
  ctx.font =
    `900 ${fontSize}px Arial`;

  if (
    ctx.measureText(text)
      .width <= maxWidth
  ) {
    return text;
  }

  let result =
    text;

  while (
    result.length > 1 &&
    ctx.measureText(
      result + "…"
    ).width >
      maxWidth
  ) {
    result =
      result.slice(
        0,
        -1
      );
  }

  return (
    result.trim() + "…"
  );
}

// ============================================================
// CLAMP
// ============================================================

function clamp(
  value,
  min,
  max
) {
  return Math.min(
    Math.max(
      value,
      min
    ),
    max
  );
}

// ============================================================
// ROUNDED RECTANGLE
// ============================================================

function roundedRect(
  ctx,
  x,
  y,
  width,
  height,
  radius
) {
  const r =
    Math.min(
      radius,
      width / 2,
      height / 2
    );

  ctx.beginPath();

  ctx.moveTo(
    x + r,
    y
  );

  ctx.lineTo(
    x + width - r,
    y
  );

  ctx.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + r
  );

  ctx.lineTo(
    x + width,
    y + height - r
  );

  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - r,
    y + height
  );

  ctx.lineTo(
    x + r,
    y + height
  );

  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - r
  );

  ctx.lineTo(
    x,
    y + r
  );

  ctx.quadraticCurveTo(
    x,
    y,
    x + r,
    y
  );

  ctx.closePath();
}

// ============================================================
// IMAGE LOADER
// ============================================================

function loadImage(
  src
) {
  return new Promise(
    (
      resolve,
      reject
    ) => {
      const image =
        new Image();

      image.onload =
        () => resolve(image);

      image.onerror =
        () =>
          reject(
            new Error(
              "Image could not be loaded."
            )
          );

      image.src = src;
    }
  );
}