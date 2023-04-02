import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
  });
  const [err, seterr] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (error) {
      seterr(error.response.data);
    }
  };
  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          name="username"
          onChange={handleChange}
          type="text"
          placeholder="username"
        />
        <input
          required
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="email"
        />
        <input
          type="text"
          name="img"
          onChange={handleChange}
          placeholder="Image"
        />
        <input
          required
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="password"
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account?<Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
