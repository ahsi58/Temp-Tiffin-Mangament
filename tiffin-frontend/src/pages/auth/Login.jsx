import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tokenService from "../../services/tokenService";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/AuthLayout";
import { login } from "../../api/authApi";
import "./Login.css";

function Login() {

  const { login: loginUser } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      email: "",
      password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
          ...prev,
          [name]: value,
      }));

      setErrors((prev) => ({
          ...prev,
          [name]: "",
      }));

      setServerError("");
  };

  const validateForm = () => {

      const newErrors = {};

      if (!formData.email.trim()) {
          newErrors.email = "Email is required";
      } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
      ) {
          newErrors.email = "Invalid email address";
      }

      if (!formData.password) {
          newErrors.password = "Password is required";
      }

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
          return;
      }

      setLoading(true);
      setServerError("");

      try {
          const response = await login(formData);

          console.log(response.data);

          const {
              accessToken,
              refreshToken,
              tokenType,
              expiresIn,
              role,
          } = response.data;

          loginUser(response.data);

          if (role === "CUSTOMER") {
              navigate("/customer/dashboard");
          } else if (role === "VENDOR") {
              navigate("/vendor/dashboard");
          }

      } catch (error) {

          if (error.response) {
              setServerError(error.response.data.message);
          } else {
              setServerError("Something went wrong.");
          }

      } finally {

          setLoading(false);

      }
    };

  return (
    <AuthLayout>
      <div className="login-container">

          <div className="login-card">

              <h1>Welcome Back</h1>

              <p className="subtitle">
                  Login to continue to Tiffin Management System
              </p>

              {serverError && (
                  <div className="server-error">
                      {serverError}
                  </div>
              )}

              <form onSubmit={handleSubmit}>

                  <div className="input-group">

                      <label>Email</label>

                      <input
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleChange}
                      />

                      {errors.email && (
                          <small className="error">
                              {errors.email}
                          </small>
                      )}

                  </div>

                  <div className="input-group">

                      <label>Password</label>

                      <input
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={handleChange}
                      />

                      {errors.password && (
                          <small className="error">
                              {errors.password}
                          </small>
                      )}

                  </div>

                  <button
                      className="login-btn"
                      type="submit"
                      disabled={loading}
                  >
                      {loading ? "Logging In..." : "Login"}
                  </button>

              </form>

              <p className="register-link">
                  Don't have an account?
                  <Link to="/register"> Register</Link>
              </p>

          </div>

      </div>
      </AuthLayout>
  );
}

export default Login;