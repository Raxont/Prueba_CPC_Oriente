import React from "react";

import type { Product } from "../utils/types.ts";

interface Props {
  products: Product[];
  handleEdit: (product: Product) => void;
  handleDelete: (id: string) => void;
}

const ProductTable: React.FC<Props> = ({ products, handleEdit, handleDelete }) => {
  return (
    <table className="w-full border-2xl bg-white ">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Nombre</th>
          <th className="border p-2">Precio</th>
          <th className="border p-2">Cantidad</th>
          <th className="border p-2">Descripción</th>
          <th className="border p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id} className="border">
            <td className="border p-2">{product.name}</td>
            <td className="border p-2">{product.price}</td>
            <td className="border p-2">{product.quantity}</td>
            <td className="border p-2">{product.description}</td>
            <td className="border p-2 flex gap-2">
              <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white p-1">
                Editar
              </button>
              <button onClick={() => handleDelete(product._id)} className="bg-red-800 text-white p-1">
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
