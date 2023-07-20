import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './category.css';
import './header.css';

const Category = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/categories/${id}`)
            .then(res => res.json())
            .then(data => setCategory(data));

        fetch(`http://localhost:3000/products`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [id]);

    const getCategoryImage = (categoryId) => {
        const productWithImage = products.find(product => product.category === categoryId && product.image);
        return productWithImage ? productWithImage.image : 'default_image_url_here';
    };

    if (!category) {
        return <div>Loading...</div>;
    }

    const categoryProducts = products.filter(product => product.category === category.name);

    return (
        <div>
            <Link className="navbar-brand" to="/">
                <img src="https://leninn.com/img/favicon.png?fbclid=IwAR1tFv2uqNH3sDodGOunLdxR9q_G23enlhluph9z9XlITBjYAxjzRLTb7Qg" alt="Logo" />
            </Link>

            <h1>{category.name}</h1>
            <div className="row">
                {categoryProducts.map(product => (
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

export default Category;
