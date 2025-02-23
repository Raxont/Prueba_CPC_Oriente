import type { Request, Response } from 'express';
import ProductService from '../services/productServices.js';

class ProductController {
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, price, quantity, description } = req.body;
      if (!name || !price || !quantity || !description) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
      }
      const product = await ProductService.createProduct({ name, price, quantity, description });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto' });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await ProductService.getProducts();
  
      if (!products || products.length === 0) {
        res.status(200).json({ message: "No hay productos en la base de datos", products: [] });
        return;
      }
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los productos", error });
    }
  };
  
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedProduct = await ProductService.updateProduct(id, req.body);
      if (!updatedProduct) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto' });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductService.deleteProduct(id);
      if (!deletedProduct) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto' });
    }
  };
}

export default new ProductController();
