import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";

function ResetPassword() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [data, setData] = useState({
    otp: "",
    newPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = async () => {

    if (!data.otp || !data.newPassword) {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    try {
      const res = await API.post("/reset", null, {
        params: {
          email: email,
          otp: data.otp,
          newPassword: data.newPassword
        }
      });

      // Show backend response
      if (res.data.toLowerCase().includes("successful")) {

        setError("");
        setSuccess("Password Reset Successful ...");

        setTimeout(() => {
          navigate("/");
        }, 2000);

      } else {
        setSuccess("");
        setError(res.data);
      }

    } catch (err) {
      setSuccess("");
      setError("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h2>Reset Password</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <input
        placeholder="Enter OTP"
        onChange={e => setData({ ...data, otp: e.target.value })}
      />

      <input
        type="password"
        placeholder="New Password"
        onChange={e => setData({ ...data, newPassword: e.target.value })}
      />

      <button onClick={handleReset}>
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;