export const parseArrayField = (value: unknown): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.startsWith("[")) {
      try { const parsed = JSON.parse(trimmed); if (Array.isArray(parsed)) return parsed.map((v) => String(v).trim()).filter(Boolean); } catch {}
    }
    return trimmed.split(",").map((v) => v.trim()).filter(Boolean);
  }
  return [];
};
