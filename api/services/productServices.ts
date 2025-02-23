import Product from '../models/productsModels.js';

/**
 * Clase ProductService que gestiona la lógica de negocio relacionada con los productos.
 */
class ProductService {
  /**
   * Crea un nuevo producto en la base de datos.
   * @param {Object} data - Datos del producto a crear.
   * @returns {Promise<Object>} - Retorna el producto creado.
   */
  async createProduct(data: any) {
    const newProduct = new Product(data);
    return await newProduct.save();
  }

  /**
   * Obtiene todos los productos almacenados en la base de datos.
   * @returns {Promise<Array>} - Retorna un arreglo con los productos encontrados.
   */
  async getProducts() {
    return await Product.find();
  }

  /**
   * Actualiza un producto existente por su ID.
   * @param {string} id - ID del producto a actualizar.
   * @param {Object} data - Datos a actualizar del producto.
   * @returns {Promise<Object|null>} - Retorna el producto actualizado o null si no se encontró.
   */
  async updateProduct(id: string, data: any) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Elimina un producto de la base de datos por su ID.
   * @param {string} id - ID del producto a eliminar.
   * @returns {Promise<Object|null>} - Retorna el producto eliminado o null si no se encontró.
   */
  async deleteProduct(id: string) {
    return await Product.findByIdAndDelete(id);
  }
}

// Exporta una instancia única del servicio para su uso en otros módulos.
export default new ProductService();
