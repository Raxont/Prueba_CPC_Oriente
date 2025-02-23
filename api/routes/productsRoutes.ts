import { Router } from 'express';
import productsController from '../controllers/productsController.js';

const router = Router();

/**
 * Define las rutas para la gestión de productos.
 * 
 * - POST "/"      -> Crea un nuevo producto.
 * - GET "/"       -> Obtiene todos los productos.
 * - PUT "/:id"    -> Actualiza un producto por su ID.
 * - DELETE "/:id" -> Elimina un producto por su ID.
 */

router.post("/", productsController.create);  // Ruta para la creación de un producto.
router.get("/", productsController.getAll);   // Ruta para obtener todos los productos.
router.put("/:id", productsController.update); // Ruta para actualizar un producto por ID.
router.delete("/:id", productsController.delete); // Ruta para eliminar un producto por ID.

export default router;
