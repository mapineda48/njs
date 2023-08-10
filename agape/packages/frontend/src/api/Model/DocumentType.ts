import { AxiosInstance } from "axios";
import Model, { IModel } from "./Util/Model";
import { routeModel } from "backend";
import { IRecord, IData } from "backend/integration/model/documentType";

const DocumentType: unknown = class extends Model {
  constructor(axios: AxiosInstance) {
    super(routeModel.DocumentType, axios);
  }
};

export default DocumentType as IDocumentType;

/**
 * Types
 */
export type IDocumentType = IModel<IData, IRecord>;
