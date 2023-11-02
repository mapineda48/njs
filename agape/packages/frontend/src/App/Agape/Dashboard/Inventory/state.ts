import Form, { IState } from "../../Session/form";
import type { IRecord } from "backend/api/models/inventory/product";
import type { IForm } from "backend/api/agape/inventory/initForm";

class Inventory extends Form {
  fullName = "";
  categoryId = 0;
  subcategoryId = 0;
  isEnabled = true;

  categories: IForm["categories"] = [];
  subcategories: { id: number; name: string }[] = [];

  rows: IRecord[] = [];

  async onInit() {
    const initForm = await this.api.inventory.initForm();

    return (state: State): State => ({ ...state, ...initForm });
  }

  updateCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    const categoryId = parseInt(e.currentTarget.value);

    const subcategories =
      this.categories.find((el) => el.id === categoryId)?.subcategories ?? [];

    this.categoryId = categoryId;
    this.subcategories = subcategories;
    this.subcategoryId = 0;
  }

  async submit() {
    await this.models.inventory.product.create({
      fullName: this.fullName,
      categoryId: this.categoryId,
      subcategoryId: this.subcategoryId,
      isEnabled: this.isEnabled,
      stock: 0,
      images: [],
    });
  }
}

export default Inventory.createHook(true);

/**
 * Types
 */
interface Item {
  id: number;
  fullName: string;
}

type State = IState<Inventory>;
