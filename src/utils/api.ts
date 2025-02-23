const API_URL = "http://localhost:3000/api/products";

import type { Product } from "../utils/types.ts";

// Obtener todos los productos
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }
  return response.json();
};

// Crear un producto
export const createProduct = async (product: Omit<Product, "_id">): Promise<void> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error al crear el producto");
  }
};

// Actualizar un producto
export const updateProduct = async (id: string, product: Omit<Product, "_id">): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el producto");
  }
};

// Eliminar un producto
export const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Error al eliminar el producto");
  }
};
