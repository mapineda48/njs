import { createProduct } from "./action";
import Input from "@/form/Input";
import db from "@/models";
import Test, { Props } from "./client/Category";
export { dynamic } from "@/next";

export default async function Page() {
  const { categories } = await getState();

  return (
    <main>
      <form action={createProduct}>
        <Input.String required name="fullName" />
        <Input.CheckBox name="isEnabled" />
        <Test categories={categories} />
        <Input.Files name="imageFiles" />
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}

async function getState() {
  const { subcategory, category } = db.inventory;

  /**
   * Categories
   */
  const records = await category.findAll({
    attributes: ["id", ["fullName", "name"]],
    where: {
      isEnabled: true,
    },
    include: {
      model: subcategory,
      as: "subcategories",
      attributes: ["id", ["fullName", "name"]],
      where: {
        isEnabled: true,
      },
    },
  });

  const categories: unknown = records.map((item) => item.get({ plain: true }));

  return { categories } as Props;
}
