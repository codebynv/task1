// ============================================================
// HH Goa 2026
// Smart Builder ID Generator
// ============================================================

/**
 * Generate a stable numeric hash from a string.
 */
function hashString(value) {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash =
      (hash << 5) -
      hash +
      value.charCodeAt(i);

    hash |= 0;
  }

  return Math.abs(hash);
}

/**
 * Generate a deterministic Builder ID.
 *
 * Same name + persona/category
 * = same Builder ID.
 */
export function generateBuilderId(
  name = "",
  persona = "",
  category = ""
) {
  const cleanedName = name
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase();

  const initials =
    cleanedName
      .slice(0, 2)
      .padEnd(2, "X");

  const identityKey =
    `${cleanedName}|${persona}|${category}`
      .toUpperCase();

  const hash =
    hashString(identityKey);

  const numericPart =
    1000 + (hash % 9000);

  return `HH26-${initials}-${numericPart}`;
}