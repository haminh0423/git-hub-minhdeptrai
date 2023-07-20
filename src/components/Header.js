import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import './header.css';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm trạng thái đăng nhập

    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);
    const handleLogin = () => {
        // Thực hiện các hành động cần thiết để đăng nhập người dùng
        setIsLoggedIn(true); // Đặt trạng thái đăng nhập thành true khi đăng nhập thành công
    };

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        // Thực hiện các hành động cần thiết để đăng xuất người dùng
        setIsLoggedIn(false); // Đặt lại trạng thái đăng nhập sau khi đăng xuất
    };

    const renderLoginOrLogout = () => {
        if (isLoggedIn) {
            return (
                <Link to="/" onClick={handleLogout} className="ml-3">
                    LOGOUT
                </Link>
            );
        } else {
            return (
                <>
                    <Link to="/login" onClick={handleLogin} className="mr-3">
                        LOGIN
                    </Link>
                    <Link to="/signup" className="mr-3">
                        SIGN UP
                    </Link>
                </>
            );
        }
    };

    return (
        <header className="header">
            <div className="container">
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        <img src="https://leninn.com/img/favicon.png?fbclid=IwAR1tFv2uqNH3sDodGOunLdxR9q_G23enlhluph9z9XlITBjYAxjzRLTb7Qg" alt="Logo" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="form-inline my-2 my-lg-0">
                            <input
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                        </form>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">
                                    HOME
                                </Link>
                            </li>
                            <li
                                className={`nav-item dropdown ${showDropdown ? "show" : ""}`}
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to="/product"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded={showDropdown ? "true" : "false"}
                                >
                                    PRODUCT
                                </Link>
                                <div className={`dropdown-menu ${showDropdown ? "show" : ""}`} aria-labelledby="navbarDropdown">
                                    {categories.map((category) => (
                                        <Link className="dropdown-item" to={`/category/${category.id}`} key={category.id}>
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">
                                    AdminPage
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">
                                    About
                                </Link>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            {renderLoginOrLogout()} {/* Hiển thị "Login" hoặc "Logout" tùy thuộc vào trạng thái đăng nhập */}
                            <Link to="/cart">
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
