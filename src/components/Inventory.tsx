import React, { useState, useEffect } from "react"; // Importamos React, useState y useEffect para manejar el estado y los efectos secundarios.
import ProductForm from "./ProductForm.tsx"; // Importamos el componente de formulario de productos.
import ProductTable from "./ProductTable.tsx"; // Importamos el componente para mostrar la tabla de productos.
import type { Product } from "../utils/types.ts"; // Importamos el tipo `Product` para definir la estructura de los productos.
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../utils/api.ts"; // Importamos las funciones para interactuar con la API.

const Inventorys: React.FC = () => {
  // Definimos el estado `products` para almacenar la lista de productos.
  const [products, setProducts] = useState<Product[]>([]);

  // Definimos el estado `form` para almacenar los datos del formulario, iniciando con valores vacíos.
  const [form, setForm] = useState<Omit<Product, "_id">>({
    name: "",
    price: 0,
    quantity: 0,
    description: "",
  });
  
  // Definimos el estado `editingId` para manejar la edición de productos.
  const [editingId, setEditingId] = useState<string | undefined>(undefined);

  // Usamos `useEffect` para cargar los productos cuando el componente se monta.
  useEffect(() => {
    loadProducts();
  }, []); // El segundo parámetro vacío significa que el efecto solo se ejecutará una vez cuando el componente se monte.

  // Función para cargar la lista de productos desde la API y actualizar el estado `products`.
  const loadProducts = async () => {
    const data = await fetchProducts(); // Llamamos a la función `fetchProducts` para obtener los productos.
    setProducts(data); // Actualizamos el estado `products` con los datos obtenidos.
  };

  // Función para manejar el envío del formulario (crear o actualizar un producto).
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenimos el comportamiento predeterminado de envío del formulario.
    if (editingId) {
      // Si estamos editando un producto, llamamos a `updateProduct` con el ID de edición y los datos del formulario.
      await updateProduct(editingId, form);
    } else {
      // Si no estamos editando, llamamos a `createProduct` para agregar un nuevo producto.
      await createProduct(form);
    }
    setForm({ name: "", price: 0, quantity: 0, description: "" }); // Limpiamos el formulario.
    setEditingId(undefined); // Restablecemos el estado de edición.
    loadProducts(); // Recargamos la lista de productos después de agregar o actualizar.
  };

  // Función para manejar la eliminación de un producto.
  const handleDelete = async (id: string) => {
    await deleteProduct(id); // Llamamos a la función `deleteProduct` para eliminar el producto con el ID proporcionado.

    if (editingId === id) {
      // Si el producto eliminado es el que estamos editando, limpiamos el estado de edición.
      setEditingId(undefined);
      setForm({ name: "", price: 0, quantity: 0, description: "" }); // Restablecemos el formulario.
    }

    loadProducts(); // Recargamos la lista de productos después de eliminar uno.
  };

  // Función para manejar la edición de un producto.
  const handleEdit = (product: Product) => {
    setForm({
      name: product.name, // Establecemos los valores del formulario con los datos del producto seleccionado.
      price: Number(product.price),
      quantity: Number(product.quantity),
      description: product.description,
    });
    setEditingId(product._id); // Establecemos el ID del producto que estamos editando.
  };

  return (
    <div className="p-8 bg-black border-red-800 border rounded-xl">
      <h1 className="text-2xl font-bold mb-4 ">Inventario</h1>
      <ProductForm 
        form={form} 
        setForm={setForm} 
        handleSubmit={handleSubmit} 
        editingId={editingId ?? null}
      />
      <ProductTable products={products} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

// Exportamos el componente `Inventorys` para usarlo en otras partes de la aplicación.
export default Inventorys;
