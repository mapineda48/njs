import Form, { IState } from "App/Agape/Session/form";
import type { IRecord } from "backend/api/models/documentType";

let cache: State | null = null;

class DocumentType extends Form {
  fullName = "";
  code = "";
  isEnabled = false;

  records: IRecord[] = [];

  async submit() {
    const record = await this.models.documentType.create({
      fullName: this.fullName,
      code: this.code,
      isEnabled: this.isEnabled,
    });

    this.fullName = "";
    this.code = "";
    this.isEnabled = false;
    this.addItem(record);
  }

  addItem(item: IRecord) {
    return (state: State) => {
      return { ...state, records: [...state.records, item] };
    };
  }

  async refresh() {
    if (this.isLoading) {
      return;
    }

    this.records = await this.models.documentType.findAll({
      order: [["updatedAt", "DESC"]],
    });
  }

  async onInit() {
    if (cache) {
      this.set(cache);
    }

    const records = await this.models.documentType.findAll({
      order: [["updatedAt", "DESC"]],
    });

    return (state: State) => ({ ...state, records });
  }

  onDestroy(state: State) {
    cache = state;
  }
}

export default DocumentType.createHook(true);

/**
 * Types
 */
type State = IState<DocumentType>;
