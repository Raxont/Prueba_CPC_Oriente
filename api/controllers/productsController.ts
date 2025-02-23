import type { Request, Response } from 'express';
import ProductService from '../services/productServices.js';

/**
 * Clase ProductController que gestiona las operaciones relacionadas con los productos
 * a través de la API REST. Se encarga de manejar las solicitudes y respuestas HTTP.
 */
class ProductController {
  /**
   * Crea un nuevo producto en la base de datos.
   * @param {Request} req - Objeto de solicitud con los datos del producto en el cuerpo.
   * @param {Response} res - Objeto de respuesta para enviar la respuesta al cliente.
   * @returns {Promise<void>} - Retorna una respuesta con el producto creado o un mensaje de error.
   */
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, price, quantity, description } = req.body;

      // Verifica que todos los campos requeridos estén presentes.
      if (!name || !price || !quantity || !description) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
      }

      // Llama al servicio para crear el producto.
      const product = await ProductService.createProduct({ name, price, quantity, description });

      // Retorna el producto creado con código de estado 201 (creado).
      res.status(201).json(product);
    } catch (error) {
      // Manejo de errores en caso de fallos en la creación del producto.
      res.status(500).json({ message: 'Error al crear el producto' });
    }
  };

  /**
   * Obtiene todos los productos almacenados en la base de datos.
   * @param {Request} req - Objeto de solicitud.
   * @param {Response} res - Objeto de respuesta para enviar los productos obtenidos.
   * @returns {Promise<void>} - Retorna un arreglo de productos o un mensaje en caso de error.
   */
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // Llama al servicio para obtener los productos.
      const products = await ProductService.getProducts();

      // Si no hay productos, retorna un mensaje indicando la base de datos vacía.
      if (!products || products.length === 0) {
        res.status(200).json({ message: "No hay productos en la base de datos", products: [] });
        return;
      }

      // Retorna la lista de productos con código de estado 200 (OK).
      res.status(200).json(products);
    } catch (error) {
      // Manejo de errores en caso de fallos al obtener los productos.
      res.status(500).json({ message: "Error al obtener los productos", error });
    }
  };

  /**
   * Actualiza un producto existente en la base de datos.
   * @param {Request} req - Objeto de solicitud con el ID del producto en los parámetros y los datos a actualizar en el cuerpo.
   * @param {Response} res - Objeto de respuesta para enviar la confirmación de actualización.
   * @returns {Promise<void>} - Retorna el producto actualizado o un mensaje de error.
   */
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      // Llama al servicio para actualizar el producto por su ID.
      const updatedProduct = await ProductService.updateProduct(id, req.body);

      // Si el producto no existe, retorna un mensaje con código de estado 404 (No encontrado).
      if (!updatedProduct) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }

      // Retorna el producto actualizado con código de estado 200 (OK).
      res.status(200).json(updatedProduct);
    } catch (error) {
      // Manejo de errores en caso de fallos en la actualización del producto.
      res.status(500).json({ message: 'Error al actualizar el producto' });
    }
  };

  /**
   * Elimina un producto de la base de datos.
   * @param {Request} req - Objeto de solicitud con el ID del producto en los parámetros.
   * @param {Response} res - Objeto de respuesta para enviar la confirmación de eliminación.
   * @returns {Promise<void>} - Retorna un mensaje de éxito o error en caso de que el producto no exista.
   */
  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      // Llama al servicio para eliminar el producto por su ID.
      const deletedProduct = await ProductService.deleteProduct(id);

      // Si el producto no existe, retorna un mensaje con código de estado 404 (No encontrado).
      if (!deletedProduct) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }

      // Retorna un mensaje confirmando la eliminación con código de estado 200 (OK).
      res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      // Manejo de errores en caso de fallos en la eliminación del producto.
      res.status(500).json({ message: 'Error al eliminar el producto' });
    }
  };
}

// Exporta una única instancia del controlador para su uso en las rutas.
export default new ProductController();
