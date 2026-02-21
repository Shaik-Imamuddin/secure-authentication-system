import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    if (!user.name || !user.email || !user.phone || !user.password)
      return "All fields required";

    if (!/^[0-9]{10}$/.test(user.phone))
      return "Phone must be 10 digits";

    if (user.password.length < 8)
      return "Password must be at least 8 characters";

    return null;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const err = validate();
  if (err) {
    setError(err);
    setSuccess("");
    return;
  }

  try {
    const res = await API.post("/register", user);

    if (res.data === "Registration Successful") {

      setError("");
      setSuccess("Registration Successful...");

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } else {
      setSuccess("");
      setError(res.data);  
    }

  } catch {
    setSuccess("");
    setError("Registration Failed");
  }
};

  return (
    <div  className="form-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Name"
          onChange={e => setUser({...user, name:e.target.value})}/>
        <input placeholder="Email"
          onChange={e => setUser({...user, email:e.target.value})}/>
        <input placeholder="Phone"
          onChange={e => setUser({...user, phone:e.target.value})}/>
        <input type="password" placeholder="Password"
          onChange={e => setUser({...user, password:e.target.value})}/>
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;