export function generateBuilderTitle(role = "", stack = "") {
  const value =
    `${role} ${stack}`.toLowerCase();

  if (
    value.includes("ai") ||
    value.includes("artificial intelligence") ||
    value.includes("machine learning") ||
    value.includes("ml") ||
    value.includes("deep learning")
  ) {
    return "MODEL TAMER";
  }

  if (
    value.includes("frontend") ||
    value.includes("front end") ||
    value.includes("react") ||
    value.includes("next.js") ||
    value.includes("nextjs") ||
    value.includes("vue") ||
    value.includes("angular")
  ) {
    return "PIXEL ARCHITECT";
  }

  if (
    value.includes("backend") ||
    value.includes("back end") ||
    value.includes("node") ||
    value.includes("express") ||
    value.includes("fastapi") ||
    value.includes("django") ||
    value.includes("api")
  ) {
    return "SYSTEM CRAFTER";
  }

  if (
    value.includes("full stack") ||
    value.includes("fullstack")
  ) {
    return "STACK FORGER";
  }

  if (
    value.includes("cyber") ||
    value.includes("security") ||
    value.includes("ethical hacking") ||
    value.includes("penetration")
  ) {
    return "BUG WHISPERER";
  }

  if (
    value.includes("data") ||
    value.includes("analytics") ||
    value.includes("sql") ||
    value.includes("pandas")
  ) {
    return "DATA CARTOGRAPHER";
  }

  if (
    value.includes("devops") ||
    value.includes("docker") ||
    value.includes("kubernetes") ||
    value.includes("cloud") ||
    value.includes("aws") ||
    value.includes("azure")
  ) {
    return "SHIP ENGINEER";
  }

  if (
    value.includes("mobile") ||
    value.includes("android") ||
    value.includes("flutter") ||
    value.includes("ios")
  ) {
    return "POCKET BUILDER";
  }

  if (
    value.includes("game") ||
    value.includes("unity") ||
    value.includes("unreal")
  ) {
    return "REALITY BUILDER";
  }

  return "CODE NOMAD";
}