import { Link } from "react-router-dom";

function LoginPage() {
  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email Address" id="email" />
        <input type="password" placeholder="Password" id="password" />
        <button type="submit">Submit</button>
      </form>
      <span>
        Don't have an account? <Link to="/signup">Signup</Link>
      </span>
    </div>
  );
}

export default LoginPage;
