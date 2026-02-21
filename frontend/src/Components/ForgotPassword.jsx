import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function ForgotPassword() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendOtp = async () => {

    if (!email) {
      setError("Email is required");
      setSuccess("");
      return;
    }

    try {
      await API.post("/forgot", null, { params: { email } });

      setError("");
      setSuccess("OTP Sent Successfully ...");

      setTimeout(() => {
        navigate("/reset", { state: { email } });
      }, 2000);

    } catch {
      setSuccess("");
      setError("Failed to send OTP");
    }
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <input
        placeholder="Enter Email"
        onChange={e => setEmail(e.target.value)}
      />

      <button onClick={sendOtp}>Send OTP</button>
    </div>
  );
}

export default ForgotPassword;