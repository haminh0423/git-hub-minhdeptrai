import { Link,Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "../login.css";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu user:", error);
      });
  }, []);

  const handleLogin = (data) => {
    const matchedUser = user.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (!matchedUser) {
      alert("Email hoặc mật khẩu không hợp lệ");
      return;
    }

    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    // Nếu đăng nhập thành công, điều hướng đến trang Home
    return <Navigate to="/home" />;
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
              <h1>Login form</h1>
            </div>

            <div className="data w-100">
              <form
                id="form"
                className="form"
                onSubmit={handleSubmit(handleLogin)}
              >
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    id="email"
                    name="email"
                    {...register("email", {
                      required: "Email không được để trống",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Không đúng định dạng",
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
                      required: "Mật khẩu không được để trống",
                      minLength: {
                        value: 6,
                        message: "Tối thiểu 6 kí tự",
                      },
                      maxLength: {
                        value: 20,
                        message: "Tối đa 20 kí tự",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <button className="btn form-control btn-success" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>

            <div className="sign-up">
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
