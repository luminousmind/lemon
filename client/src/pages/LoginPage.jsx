import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await login(email, password);

    console.log(result);

    navigate("/");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <span>
        Don't have an account? <Link to="/signup">Signup</Link>
      </span>
    </div>
  );
}

export default LoginPage;
