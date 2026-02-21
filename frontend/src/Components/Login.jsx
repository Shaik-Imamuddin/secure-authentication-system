import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";


function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");  

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setError("Email and Password are required");
      return;
    }

    try {
      const res = await API.post("/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);

      navigate("/home");

    } catch (err) {
      setError("Invalid Credentials");   
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button type="submit">Login</button>

      </form>

      <p><Link to="/forgot">Forgot Password?</Link></p>
      <p><Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;