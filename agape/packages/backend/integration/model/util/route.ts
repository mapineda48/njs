export function createPath(baseURL: string, modelName: string) {
  const path = modelName
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2") // Inserta guiones antes de las letras mayúsculas
    .toLowerCase() // Convierte todo a minúsculas
    .replace(/^-/, ""); // Elimina el guión al inicio si existe

  return baseURL + path;
}
