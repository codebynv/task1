// ============================================================
// HH Goa 2026
// Smart Builder Persona Engine
// ============================================================

const PERSONA_RULES = [
  // ==========================================================
  // CYBERSECURITY
  // ==========================================================

  {
    keywords: [
      "cybersecurity",
      "cyber security",
      "security engineer",
      "security",
      "ethical hacking",
      "ethical hacker",
      "penetration testing",
      "penetration tester",
      "pentesting",
      "pentester",
      "kali",
      "burp",
      "burp suite",
      "network security",
      "infosec",
      "information security",
    ],

    persona: "BUG WHISPERER",
    category: "CYBERSECURITY",

    priority: 100,
  },

  // ==========================================================
  // AI / ML
  // ==========================================================

  {
    keywords: [
      "artificial intelligence",
      "machine learning",
      "deep learning",
      "computer vision",
      "generative ai",
      "genai",
      "tensorflow",
      "pytorch",
      "keras",
      "llm",
      "nlp",
      "ai",
      "ml",
    ],

    persona: "MODEL TAMER",
    category: "AI / ML",

    priority: 95,
  },

  // ==========================================================
  // DEVOPS / CLOUD
  // ==========================================================

  {
    keywords: [
      "devops",
      "dev ops",
      "docker",
      "kubernetes",
      "k8s",
      "jenkins",
      "ci/cd",
      "cicd",
      "terraform",
      "aws",
      "azure",
      "gcp",
      "cloud engineer",
      "cloud computing",
    ],

    persona: "PIPELINE PILOT",
    category: "DEVOPS / CLOUD",

    priority: 90,
  },

  // ==========================================================
  // DATA
  // ==========================================================

  {
    keywords: [
      "data science",
      "data scientist",
      "data analyst",
      "data analytics",
      "data analysis",
      "pandas",
      "numpy",
      "matplotlib",
      "statistics",
      "analytics",
    ],

    persona: "DATA EXPLORER",
    category: "DATA",

    priority: 85,
  },

  // ==========================================================
  // MOBILE
  // ==========================================================

  {
    keywords: [
      "mobile developer",
      "mobile development",
      "android",
      "ios",
      "flutter",
      "react native",
      "kotlin",
      "swift",
    ],

    persona: "MOBILE CRAFTER",
    category: "MOBILE",

    priority: 80,
  },

  // ==========================================================
  // WEB3 / BLOCKCHAIN
  // ==========================================================

  {
    keywords: [
      "blockchain",
      "web3",
      "ethereum",
      "solidity",
      "smart contract",
      "crypto",
      "defi",
    ],

    persona: "CHAIN BUILDER",
    category: "WEB3",

    priority: 80,
  },

  // ==========================================================
  // FULL STACK
  // ==========================================================

  {
    keywords: [
      "full stack",
      "fullstack",
      "full-stack",
      "mern",
      "mean",
      "pern",
      "full stack developer",
      "full stack engineer",
      "web developer",
      "web development",
    ],

    persona: "STACK FORGER",
    category: "FULL STACK",

    priority: 70,
  },

  // ==========================================================
  // BACKEND
  // ==========================================================

  {
    keywords: [
      "backend",
      "back end",
      "back-end",
      "backend developer",
      "backend engineer",
      "node",
      "nodejs",
      "node.js",
      "express",
      "expressjs",
      "fastapi",
      "django",
      "flask",
      "api developer",
      "rest api",
      "server",
    ],

    persona: "SYSTEM BUILDER",
    category: "BACKEND",

    priority: 65,
  },

  // ==========================================================
  // FRONTEND
  // ==========================================================

  {
    keywords: [
      "frontend",
      "front end",
      "front-end",
      "frontend developer",
      "frontend engineer",
      "react",
      "reactjs",
      "react.js",
      "vue",
      "vuejs",
      "angular",
      "nextjs",
      "next.js",
      "html",
      "css",
      "ui",
      "ux",
      "web design",
    ],

    persona: "PIXEL ARCHITECT",
    category: "FRONTEND",

    priority: 60,
  },
];

// ============================================================
// NORMALIZE INPUT
// ============================================================

function normalize(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^\w\s./+#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ============================================================
// CHECK KEYWORD
// ============================================================

function keywordMatches(text, keyword) {
  const normalizedText = normalize(text);
  const normalizedKeyword = normalize(keyword);

  if (!normalizedKeyword) {
    return false;
  }

  // Exact phrase / word boundary matching
  const escapedKeyword =
    normalizedKeyword.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

  const regex = new RegExp(
    `(^|\\s)${escapedKeyword}(?=\\s|$)`,
    "i"
  );

  return regex.test(normalizedText);
}

// ============================================================
// GENERATE BUILDER PERSONA
// ============================================================

export function generateBuilderPersona(
  role = "",
  stack = ""
) {
  const normalizedRole = normalize(role);
  const normalizedStack = normalize(stack);

  if (!normalizedRole && !normalizedStack) {
    return {
      persona: "GOA BUILDER",
      category: "BUILDER",
    };
  }

  let bestMatch = null;

  let bestScore = 0;

  let bestPriority = -1;

  // ==========================================================
  // SCORE EVERY PERSONA
  // ==========================================================

  for (const rule of PERSONA_RULES) {
    let roleScore = 0;
    let stackScore = 0;

    for (const keyword of rule.keywords) {
      // ------------------------------------------------------
      // Role matches are stronger
      // ------------------------------------------------------

      if (
        keywordMatches(
          normalizedRole,
          keyword
        )
      ) {
        roleScore += 3;
      }

      // ------------------------------------------------------
      // Stack matches
      // ------------------------------------------------------

      if (
        keywordMatches(
          normalizedStack,
          keyword
        )
      ) {
        stackScore += 1;
      }
    }

    const totalScore =
      roleScore + stackScore;

    // --------------------------------------------------------
    // Pick strongest match
    // --------------------------------------------------------

    if (
      totalScore > bestScore ||
      (
        totalScore === bestScore &&
        rule.priority > bestPriority
      )
    ) {
      bestScore = totalScore;

      bestPriority =
        rule.priority;

      bestMatch = rule;
    }
  }

  // ==========================================================
  // NO MATCH
  // ==========================================================

  if (!bestMatch) {
    return {
      persona: "GOA BUILDER",
      category: "BUILDER",
    };
  }

  // ==========================================================
  // FINAL RESULT
  // ==========================================================

  return {
    persona: bestMatch.persona,
    category: bestMatch.category,
  };
}

// ============================================================
// DEVELOPMENT TESTS
// ============================================================

console.log(
  "Cybersecurity:",
  generateBuilderPersona(
    "Cybersecurity Engineer",
    "Python, Linux, Kali"
  )
);

console.log(
  "Full Stack:",
  generateBuilderPersona(
    "Full Stack Developer",
    "React, Node.js, SQL, Git"
  )
);

console.log(
  "AI / ML:",
  generateBuilderPersona(
    "AI Engineer",
    "Python, TensorFlow, LLM"
  )
);

console.log(
  "Frontend:",
  generateBuilderPersona(
    "Frontend Developer",
    "React, HTML, CSS"
  )
);

console.log(
  "Backend:",
  generateBuilderPersona(
    "Backend Developer",
    "Node.js, Express, MongoDB"
  )
);

console.log(
  "DevOps:",
  generateBuilderPersona(
    "DevOps Engineer",
    "Docker, Kubernetes, AWS"
  )
);