import type { AxiosInstance as Axios } from "axios";

export function uploadFile(
  path: Path,
  axios: Axios,
  file: File,
  fileName: string
) {
  if (!withExt(fileName) && withExt(file.name)) {
    fileName = fileName + getExt(file.name);
  }

  const route = path.uploadFile + "/" + fileName;
  const headers = getHeaders(file);

  return axios.post(route, file, { headers }).then((res) => res.data);
}

function getHeaders(file: File) {
  return {
    "Content-Type": file.type,
    "Content-Disposition": `attachment; filename="${file.name}"`,
    "Contentt-Lenght": file.size,
  };
}

function withExt(fileName: string) {
  const dotIndex = fileName.lastIndexOf(".");

  return dotIndex !== -1;
}

function getExt(fileName: string) {
  const dotIndex = fileName.lastIndexOf(".");

  return fileName.substring(dotIndex);
}

export default { uploadFile };

/**
 * Types
 */
type Path = { [K: string]: string };
