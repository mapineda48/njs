export default function initForm(): Promise<IForm>;

export interface IForm {
  categories: {
    id: number;
    name: string;
    subcategories: { id: number; name: string }[];
  }[];
}
