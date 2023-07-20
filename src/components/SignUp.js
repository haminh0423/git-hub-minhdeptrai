import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../login.css";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track signup status

  const handleSignup = async (data) => {
    try {
      // Fetch the user data from the API
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data;

      // Check if the entered email already exists in the user data
      const existingUser = users.find((user) => user.email === data.email);
      if (existingUser) {
        alert("Email already exists. Please use a different email.");
        return;
      }

      // Set isAdmin to false (default value)
      data.isAdmin = false;

      // Add the new user to the user data
      await axios.post("http://localhost:3000/users", data);

      // Set the isLoggedIn state to true
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error if necessary
    }
  };

  if (isLoggedIn) {
    // Nếu đăng ký thành công, điều hướng đến trang Login
    return <Navigate to="/login" />;
  }

  return (
    <div className="body">
      <div className="back-to-home">
        <Link to="/">Home</Link>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="inner-wrap col">
            <div className="header">
              <h1>Signup form</h1>
            </div>

            <div className="data w-100">
              <form
                id="form"
                className="form"
                onSubmit={handleSubmit(handleSignup)}
              >
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    id="name"
                    name="name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    id="email"
                    name="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="password"
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Password must not exceed 20 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <button className="btn form-control btn-success" type="submit">
                    Signup
                  </button>
                </div>
              </form>
            </div>

            <div className="login">
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
