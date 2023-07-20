import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import './header.css';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => { setProducts(data) });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    // Lọc sản phẩm dựa trên từ khóa tìm kiếm
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>

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
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
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
                                    <Link className="nav-link" to="/about">
                                        ABOUT ME
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">
                                        CONTACT
                                    </Link>
                                </li>
                            </ul>
                            <div className="d-flex align-items-center">
                                <Link to="/login" className="mr-3">
                                    LOGIN
                                </Link>
                                <Link to="/signup" className="mr-3">
                                    SIGN UP
                                </Link>
                                <Link to="/cart">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            <h1>Product List</h1>
            <div className="row">
                {filteredProducts.map(product => (
                    <div className="col-md-4" key={product.id}>
                        <div className="card mb-4">
                            <img src={product.image} alt={product.name} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">${product.price}</p>
                                <Link to={`/cart/`} className="btn btn-primary">
                                    Add to Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Product;
