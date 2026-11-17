import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../api";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

export default function Products({ user, onLogout }) {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null); // product being edited, or null
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setProducts(await getProducts(user._id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Load the user's products once when the page opens
  useEffect(() => {
    loadProducts();
  }, []);

  // Used by the form for both "add" and "edit"
  const handleSave = async (formData) => {
    try {
      if (editing) {
        await updateProduct(editing._id, formData);
        setEditing(null);
      } else {
        await addProduct({ ...formData, user: user._id });
      }
      setError("");
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="container">
      <header>
        <h1>My products</h1>
        <div>
          <span className="muted">{user.email}</span>
          <button className="ghost" onClick={onLogout}>Log out</button>
        </div>
      </header>

      {error && <p className="error">{error}</p>}

      <ProductForm
        key={editing ? editing._id : "new"}
        editing={editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />

      <ProductList products={products} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}
