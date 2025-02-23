import Product from '../models/productsModels.js';

class ProductService {
  async createProduct(data: any) {
    const newProduct = new Product(data);
    return await newProduct.save();
  }

  async getProducts() {
    return await Product.find();
  }

  async updateProduct(id: string, data: any) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id: string) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductService();