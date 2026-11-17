import { useState } from "react";
import Login from "./pages/Login";
import Products from "./pages/Products";

// App decides which page to show: Login or Products.
// The user comes from the backend (MongoDB) after login and is kept in React state.
export default function App() {
  const [user, setUser] = useState(null);

  return user ? (
    <Products user={user} onLogout={() => setUser(null)} />
  ) : (
    <Login onLogin={setUser} />
  );
}
