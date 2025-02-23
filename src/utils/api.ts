// Definimos la constante API_URL que contiene la URL base de la API para las operaciones sobre los productos.
// Esta URL será utilizada en las funciones para hacer peticiones HTTP al backend.
const API_URL = "http://localhost:3000/api/products";

// Importamos el tipo `Product` desde el archivo de tipos, asegurando que los objetos que pasemos como productos tengan la estructura correcta.
import type { Product } from "../utils/types.ts";

/**
 * Función que obtiene todos los productos desde la API.
 * Realiza una solicitud GET a la API y retorna los productos disponibles.
 * @returns {Promise<Product[]>} - Retorna una promesa que resuelve a un array de productos.
 * Si hay un error al obtener los productos, lanza una excepción.
 */
export const fetchProducts = async (): Promise<Product[]> => {
  // Realizamos una petición GET a la API para obtener los productos.
  const response = await fetch(API_URL);

  // Verificamos si la respuesta fue exitosa (status 200-299).
  if (!response.ok) {
    // Si la respuesta no fue exitosa, lanzamos un error con un mensaje detallado.
    throw new Error("Error al obtener los productos");
  }

  // Si la respuesta fue exitosa, retornamos el contenido de la respuesta, que se espera sea un JSON con los productos.
  return response.json();
};

/**
 * Función que crea un nuevo producto en la API.
 * Realiza una solicitud POST a la API con los datos del producto.
 * @param {Omit<Product, "_id">} product - Objeto con los datos del producto, sin el campo `_id` ya que la base de datos lo genera automáticamente.
 * @returns {Promise<void>} - Retorna una promesa que no devuelve datos, pero lanza un error si la creación falla.
 */
export const createProduct = async (product: Omit<Product, "_id">): Promise<void> => {
  // Realizamos una solicitud POST a la API para crear un nuevo producto.
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // Indicamos que el cuerpo de la solicitud es JSON.
    body: JSON.stringify(product), // Convertimos el objeto `product` a JSON para enviarlo en el cuerpo de la solicitud.
  });

  // Verificamos si la respuesta fue exitosa (status 200-299).
  if (!response.ok) {
    // Si la respuesta no fue exitosa, lanzamos un error con un mensaje descriptivo.
    throw new Error("Error al crear el producto");
  }
};

/**
 * Función que actualiza un producto existente en la API.
 * Realiza una solicitud PUT a la API para modificar un producto por su ID.
 * @param {string} id - El ID del producto que queremos actualizar.
 * @param {Omit<Product, "_id">} product - Objeto con los nuevos datos del producto, sin el campo `_id`.
 * @returns {Promise<void>} - Retorna una promesa que no devuelve datos, pero lanza un error si la actualización falla.
 */
export const updateProduct = async (id: string, product: Omit<Product, "_id">): Promise<void> => {
  // Realizamos una solicitud PUT a la API para actualizar el producto con el ID proporcionado.
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" }, // Indicamos que estamos enviando JSON.
    body: JSON.stringify(product), // Convertimos el objeto `product` a JSON para enviarlo en el cuerpo de la solicitud.
  });

  // Verificamos si la respuesta fue exitosa.
  if (!response.ok) {
    // Si la respuesta no fue exitosa, lanzamos un error con un mensaje descriptivo.
    throw new Error("Error al actualizar el producto");
  }
};

/**
 * Función que elimina un producto de la API.
 * Realiza una solicitud DELETE a la API para eliminar un producto por su ID.
 * @param {string} id - El ID del producto que queremos eliminar.
 * @returns {Promise<void>} - Retorna una promesa que no devuelve datos, pero lanza un error si la eliminación falla.
 */
export const deleteProduct = async (id: string): Promise<void> => {
  // Realizamos una solicitud DELETE a la API para eliminar el producto con el ID proporcionado.
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

  // Verificamos si la respuesta fue exitosa.
  if (!response.ok) {
    // Si la respuesta no fue exitosa, lanzamos un error con un mensaje descriptivo.
    throw new Error("Error al eliminar el producto");
  }
};
