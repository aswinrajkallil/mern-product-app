import { useState } from "react";
import { loginUser, registerUser } from "../api";

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false); // false = log in, true = sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const action = isRegister ? registerUser : loginUser;
      const user = await action(email, password);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError("");
  };

  return (
    <div className="login-wrap">
      <form className="panel login" onSubmit={handleSubmit}>
        <h1>Product Manager</h1>
        <p className="muted">
          {isRegister ? "Create an account." : "Log in to continue."}
        </p>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">{isRegister ? "Sign up" : "Log in"}</button>
        <button type="button" className="ghost switch" onClick={toggleMode}>
          {isRegister ? "Already have an account? Log in" : "New here? Sign up"}
        </button>
      </form>
    </div>
  );
}
