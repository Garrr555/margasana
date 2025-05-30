export function normalizeRT_RW(value: string | number): string {
  const num = typeof value === "string" ? parseInt(value) : value;
  return num.toString().padStart(2, "0");
}
