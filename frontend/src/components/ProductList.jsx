export default function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className="muted">No products yet. Add your first one above.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p._id}>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>{p.description}</td>
            <td>₹{p.price}</td>
            <td className="actions">
              <button className="ghost" onClick={() => onEdit(p)}>Edit</button>
              <button className="danger" onClick={() => onDelete(p._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
