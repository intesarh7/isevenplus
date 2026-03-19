import slugifyLib from "slugify";

export function createSlug(text: string) {
    if (!text) return "";

    return slugifyLib(text, {
        lower: true,
        strict: true,
        locale: "en",
        trim: true
    });
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}