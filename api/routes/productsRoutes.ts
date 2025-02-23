import { Router } from 'express';
import productsController from '../controllers/productsController.js';

const router = Router();

router.post("/", productsController.create);
router.get("/", productsController.getAll);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.delete);


export default router;