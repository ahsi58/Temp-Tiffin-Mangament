import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { registerCustomer } from "../../api/authApi";
import { register } from "../../api/authApi";
import AuthLayout from "../../components/layout/AuthLayout";
import toast from "react-hot-toast";
import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
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

    if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
        newErrors.email = "Email is required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
        newErrors.email = "Invalid email address";
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!formData.password) {
        newErrors.password = "Password is required";
    } else if (
        !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.test(formData.password)
    ) {
        newErrors.password =
            "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.";
    }

    if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
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
        const response = await register(formData);

        console.log(response.data);

        toast.success("Registration successful!");

        navigate("/");
    } catch (error) {
        console.error(error);

        toast.error(
            error.response?.data?.message ||
            "Registration failed. Please try again."
        );
    }
};

    return (
        <AuthLayout>
      <div className="register-container">
          <div className="register-card">

              <h1>Create Account</h1>
              <p className="subtitle">
                  Register to start using Tiffin Management System
              </p>

              {
                  serverError && (
                      <div className="server-error">
                          {serverError}
                      </div>
                  )
              }

              <form onSubmit={handleSubmit}>

                  <div className="name-row">

                      <div className="input-group">
                          <label>First Name</label>
                          <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              placeholder="Enter first name"
                              />

                              {errors.firstName && (
                              <small className="error">
                                  {errors.firstName}
                              </small>
                              )}                           
                      </div>

                      <div className="input-group">
                          <label>Last Name</label>
                          <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              placeholder="Enter last name"
                          />

                          {errors.lastName && (
                              <small className="error">
                                  {errors.lastName}
                              </small>
                              )}   
                      </div>

                  </div>

                  <div className="input-group">
                      <label>Email</label>
                      <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter email"
                      />
                      {errors.email && (
                              <small className="error">
                                  {errors.email}
                              </small>
                              )}   
                  </div>

                  <div className="input-group">
                      <label>Phone Number</label>
                      <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          maxLength={10}
                      />
                      {errors.phoneNumber && (
                              <small className="error">
                                  {errors.phoneNumber}
                              </small>
                              )}   
                  </div>

                  <div className="input-group">
                      <label>Password</label>
                      <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter password"
                      />
                      {errors.password && (
                              <small className="error">
                                  {errors.password}
                              </small>
                              )}   
                  </div>

                  <div className="input-group">
                      <label>Confirm Password</label>
                      <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm password"
                      />
                      {errors.confirmPassword && (
                              <small className="error">
                                  {errors.confirmPassword}
                              </small>
                              )}   
                  </div>

                  <button
                      className="register-btn"
                      type="submit"
                      disabled={loading}
                  >
                      {loading ? "Registering..." : "Register"}
                  </button>

              </form>

              <p className="login-link">
                  Already have an account?
                  <Link to="/login"> Login</Link>
              </p>

          </div>
      </div>
      </AuthLayout>
    );
}

export default Register;