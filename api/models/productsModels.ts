import { Schema, model } from 'mongoose';

/**
 * Define el esquema para los productos en la base de datos.
 * 
 * - name: Nombre del producto (String, requerido).
 * - price: Precio del producto (Number, requerido).
 * - quantity: Cantidad disponible del producto (Number, requerido).
 * - description: Descripción del producto (String, requerido).
 * 
 * Se deshabilita la versión del documento en MongoDB con `{ versionKey: false }`.
 */
const productSchema = new Schema({
  name: { type: String, required: true }, // Nombre del producto (obligatorio).
  price: { type: Number, required: true }, // Precio del producto (obligatorio).
  quantity: { type: Number, required: true }, // Cantidad disponible (obligatorio).
  description: { type: String, required: true } // Descripción del producto (obligatorio).
}, { versionKey: false });

/**
 * Modelo de Mongoose para la colección "Product".
 */
const Product = model('Product', productSchema);

// Exporta el modelo para su uso en otros módulos.
export default Product;
