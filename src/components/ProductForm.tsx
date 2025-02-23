import React from "react";

// Definimos la interfaz `FormState` que describe la estructura del formulario.
// Contendrá los campos necesarios para crear o actualizar un producto: nombre, precio, cantidad y descripción.
interface FormState {
  name: string;
  price: number;
  quantity: number;
  description: string;
}

// Definimos la interfaz `Props` que describe las propiedades que el componente `ProductForm` acepta.
// - `form`: objeto de tipo `FormState` que contiene los datos actuales del formulario.
// - `setForm`: función para actualizar el estado del formulario, que recibe el nuevo estado como argumento.
// - `handleSubmit`: función que maneja el evento de envío del formulario.
// - `editingId`: identificador del producto que se está editando (si es que estamos editando un producto existente).
interface Props {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  editingId: string | null;
}

// Componente funcional `ProductForm`, que renderiza un formulario para crear o editar productos.
// Recibe las propiedades definidas en `Props`.
const ProductForm: React.FC<Props> = ({ form, setForm, handleSubmit, editingId }) => {
  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2 border-wh-2">
      <input
        type="text"
        placeholder="Nombre"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2"
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={form.price === 0 ? "" : form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) || 0 })} 
        className="border p-2"
        required
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={form.quantity === 0 ? "" : form.quantity}
        onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) || 0 })} 
        className="border p-2"
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-green-800 text-white p-2">
        {editingId ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
};

// Exportamos el componente `ProductForm` para poder utilizarlo en otras partes de la aplicación.
export default ProductForm;
