import db from "@/models";
import Carousel from "./Carousel";
import type { IRecord } from "@/models/inventory/product";

export default async function Home() {
  const products: IRecord[] = (await db.inventory.product.findAll({
    raw: true,
  })) as any;

  return (
    <main>
      <h1>Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </main>
  );
}

const ProductCard = ({ product }: { product: IRecord }) => {
  if (!product.isEnabled) {
    return null; // No mostrar productos que no están habilitados
  }

  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
      <div className="p-5">
        <h5 className="text-gray-900 text-xl font-medium mb-2">
          {product.fullName}
        </h5>
        <p className="text-gray-700 text-base mt-4">
          Category ID: {product.categoryId}
        </p>
        <p className="text-gray-700 text-base mb-4">
          Subcategory ID: {product.subcategoryId}
        </p>
        <p className="text-gray-700 text-base">Stock: {product.stock}</p>
        <div className="flex space-x-2 overflow-x-auto">
          <Carousel images={product.images} />
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ products }: { products: IRecord[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};
