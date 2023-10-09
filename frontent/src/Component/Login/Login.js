import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import { message } from "antd";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://assba.onrender.com/api/user/login",
        { email, password }
      );
      console.log(response.data.user._id);

      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.user._id);
        message.success("Login Successfully");
        navigate("/dashboard");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };


  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleSubmitLogin}>
          <h3 className="text-container p-2 rounded bg-white text-center">
            Log in
          </h3>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary">Sign In</button>
          </div>
          <Link to="/signup" className="text-align-left  text-decoration-none">
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
