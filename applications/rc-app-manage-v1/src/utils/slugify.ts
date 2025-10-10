export function slugify(text: string) {
  return text
    .normalize("NFD")                   // quita tildes/acentos
    .replace(/[\u0300-\u036f]/g, "")    // elimina diacríticos
    .replace(/[^a-zA-Z0-9\s]/g, "")     // elimina caracteres especiales
    .trim()                             // quita espacios extremos
    .replace(/\s+/g, "-")               // reemplaza espacios por guiones
    .toLowerCase();
}