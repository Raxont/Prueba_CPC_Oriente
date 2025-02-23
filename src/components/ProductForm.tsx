import React from "react";

interface FormState {
  name: string;
  price: number;
  quantity: number;
  description: string;
}

interface Props {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  editingId: string | null;
}

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

export default ProductForm;
