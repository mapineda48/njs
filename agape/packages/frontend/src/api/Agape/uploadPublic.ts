import { AxiosInstance } from "axios";
import { routeAgape } from "backend";
import Request from "../Model/Util/Request";

export default function uploadPublic(api: any, axios: AxiosInstance) {
  const path = routeAgape.uploadPublic;

  api.uploadPublic = (file: File, fileName: string) => {
    if (!withExt(fileName) && withExt(file.name)) {
      fileName = fileName + getExt(file.name);
    }

    const route = path + "/" + fileName;
    const headers = getHeaders(file);

    return new Request((signal) => {
      return axios
        .post(route, file, { signal, headers })
        .then((res) => res.data);
    });
  };
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
