import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../Context/authContext";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: "",

    password: "",
  });
  const [err, seterr] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      seterr(error.response.data);
    }
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="username"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="password"
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account?<Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
