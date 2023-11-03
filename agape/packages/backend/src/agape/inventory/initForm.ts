import db from "@models/index";

export default async function initForm() {
  const { subcategory, category } = db.inventory;

  /**
   * Categories
   */
  const categories = await category.findAll({
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

  return { categories };
}
