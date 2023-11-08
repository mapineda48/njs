"use server";

import db from "@/models";
import Storage from "@/storage";
import { formDataToObject } from "@/form";

export async function createProduct(formData: FormData) {
  const input = formDataToObject<IProduct>(formData);

  console.log(input);

  const { imageFiles, ...product } = input;

  const record = await db.inventory.product.create({
    ...product,
    images: await uploadFiles(input),
    stock: 0,
  });

  return record.get({ plain: true });
}

async function uploadFiles(input: IProduct): Promise<string[]> {
  return Promise.all(
    input.imageFiles.map((file) =>
      Storage.uploadFile(
        file,
        `product/${input.categoryId}/${input.subcategoryId}/${input.fullName}/${file.name}`
      )
    )
  );
}

/**
 * Types
 */
interface IProduct {
  fullName: string;
  imageFiles: File[];
  isEnabled: boolean;
  categoryId: number;
  subcategoryId: number;
}
