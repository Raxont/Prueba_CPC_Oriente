/**
 * Interfaz Product que define la estructura de un producto en el sistema.
 * Esta interfaz se usa para tipar objetos que representen productos dentro de la aplicación.
 */
export interface Product {
  /** Identificador único del producto en la base de datos. */
  _id: string;

  /** Nombre del producto. */
  name: string;

  /** Precio del producto. */
  price: number;

  /** Cantidad disponible del producto en stock. */
  quantity: number;

  /** Descripción breve del producto. */
  description: string;
}
