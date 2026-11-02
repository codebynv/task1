const hasTerm = (value, terms) => {
  const normalized = String(value).toLowerCase();
  return terms.some((term) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`, "i").test(normalized);
  });
};

export function generateBuilderTitle(role = "", stack = "") {
  const value = `${role} ${stack}`;

  if (hasTerm(value, ["ai", "ml", "artificial intelligence", "machine learning", "deep learning"])) return "MODEL TAMER";
  if (hasTerm(value, ["frontend", "front end", "react", "next.js", "nextjs", "vue", "angular"])) return "PIXEL ARCHITECT";
  if (hasTerm(value, ["backend", "back end", "node", "express", "fastapi", "django", "api"])) return "SYSTEM CRAFTER";
  if (hasTerm(value, ["full stack", "fullstack"])) return "STACK FORGER";
  if (hasTerm(value, ["cyber", "security", "ethical hacking", "penetration"])) return "BUG WHISPERER";
  if (hasTerm(value, ["data", "analytics", "sql", "pandas"])) return "DATA CARTOGRAPHER";
  if (hasTerm(value, ["devops", "docker", "kubernetes", "cloud", "aws", "azure"])) return "SHIP ENGINEER";
  if (hasTerm(value, ["mobile", "android", "flutter", "ios"])) return "POCKET BUILDER";
  if (hasTerm(value, ["game", "unity", "unreal"])) return "REALITY BUILDER";

  return "CODE NOMAD";
}
