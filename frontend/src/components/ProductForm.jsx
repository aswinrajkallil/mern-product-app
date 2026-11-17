import { useState } from "react";

const emptyForm = { name: "", price: "", category: "", description: "" };

// Shows "Add product" by default, or "Edit product" when `editing` is passed.
export default function ProductForm({ editing, onSave, onCancel }) {
  const [form, setForm] = useState(editing || emptyForm);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, price: Number(form.price) });
    if (!editing) setForm(emptyForm); // clear the form after adding
  };

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <h2>{editing ? "Edit product" : "Add product"}</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="price" type="number" min="0" placeholder="Price" value={form.price} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <div className="row">
        <button type="submit">{editing ? "Save changes" : "Add product"}</button>
        {editing && <button type="button" className="ghost" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
