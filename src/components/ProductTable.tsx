// Importamos React para poder utilizar sus funcionalidades, como JSX.
import React from "react";

// Importamos el tipo `Product` desde el archivo de tipos, para que la propiedad `products` siga la estructura esperada.
import type { Product } from "../utils/types.ts";

// Definimos la interfaz `Props` que especifica las propiedades que acepta el componente `ProductTable`.
// - `products`: un array de objetos `Product` que contiene los productos a mostrar en la tabla.
// - `handleEdit`: una función que recibe un producto y se encarga de editarlo.
// - `handleDelete`: una función que recibe el `id` de un producto y se encarga de eliminarlo
interface Props {
  products: Product[];
  handleEdit: (product: Product) => void;
  handleDelete: (id: string) => void;
}

// Definimos el componente funcional `ProductTable`, que recibe las propiedades descritas en la interfaz `Props`.
// Este componente renderiza una tabla con los productos y proporciona botones para editarlos o eliminarlos.
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

// Exportamos el componente `ProductTable` para poder usarlo en otras partes de la aplicación.
export default ProductTable;
