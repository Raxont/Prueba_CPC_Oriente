import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm.tsx";
import ProductTable from "./ProductTable.tsx";
import type { Product } from "../utils/types.ts";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../utils/api.ts";

const Inventorys: React.FC = () => {
  // Estado para la lista de productos
  const [products, setProducts] = useState<Product[]>([]);

  // Estado para el formulario
  const [form, setForm] = useState<Omit<Product, "_id">>({
    name: "",
    price: 0,
    quantity: 0,
    description: "",
  });

  // Estado para manejar la edición 
  const [editingId, setEditingId] = useState<string | undefined>(undefined);

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      await updateProduct(editingId, form);
    } else {
      await createProduct(form);
    }
    setForm({ name: "", price: 0, quantity: 0, description: "" });
    setEditingId(undefined); // Limpiar la edición
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    
 
    if (editingId === id) {
      setEditingId(undefined);
      setForm({ name: "", price: 0, quantity: 0, description: "" }); // Resetear el formulario
    }
  
    loadProducts(); // Recargar la lista de productos
  };
  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      price: Number(product.price),
      quantity: Number(product.quantity), 
      description: product.description,
    });
    setEditingId(product._id);
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

export default Inventorys;
