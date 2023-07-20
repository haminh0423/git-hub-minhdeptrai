import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import Header from "./Header";


const AdminPage = () => {
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: ""
    });

    useEffect(() => {
        fetch(`http://localhost:3000/categories`)
            .then(res => res.json())
            .then(data => setCategory(data));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/products`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Delete?");
        if (confirmDelete) {
          fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" })
            .then(() => {
              setProduct((prevProducts) => prevProducts.filter((p) => p.id !== id));
            })
            .catch((error) => {
              console.log("Delete request error:", error);
            });
        }
      };

    const handleFilterByCategory = (category) => {
        setSelectedCategory(category);
    };

    const handleModalOpen = (data) => {
        setModalData(data);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const filteredProducts = product.filter(p => {
        if (selectedCategory) {
            return p.category === selectedCategory;
        }
        return true;
    });

    const handleSaveProduct = () => {
        if (modalData.id) {
            // Edit existing product
            fetch(`http://localhost:3000/products/${modalData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(modalData)
            })
            .then(() => {
                setProduct(prevProducts => {
                    const updatedProducts = prevProducts.map(p => {
                        if (p.id === modalData.id) {
                            return modalData;
                        }
                        return p;
                    });
                    return updatedProducts;
                });
                setShowModal(false);
            })
            .catch(error => {
                console.log("Edit request error:", error);
            });
        } else {
            // Create new product
            fetch(`http://localhost:3000/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(modalData)
            })
            .then(res => res.json())
            .then(data => {
                setProduct(prevProducts => [...prevProducts, data]);
                setShowModal(false);
            })
            .catch(error => {
                console.log("Create request error:", error);
            });
        }
    };

    return (
        <Container>
            <Header />
            
            <Row>
                <Col md ={2} >
                    <Row>
                        <Col>
                            <h4> Category</h4>
                            {category.map(c => (
                                <div key={c.id}>
                                    <input
                                        type="radio"
                                        checked={selectedCategory === c.name}
                                        onChange={() => handleFilterByCategory(c.name)}
                                    />
                                    <label style={{ marginLeft: '15px' }}>{c.name}</label>
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Col>

                <Col md={8}  >
                    <h2 style={{ textAlign: "center" }}>List of Products</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredProducts.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>{p.description}</td>
                                    <td>{p.price}</td>
                                    <td>{p.stock}</td>
                                    <td>{p.category}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleDelete(p.id)}>
                                            Delete
                                        </Button>{" "}
                                        <Button variant="primary" onClick={() => handleModalOpen(p)}>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button variant="success" onClick={() => handleModalOpen({})}>
                        Add Product
                    </Button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalData.id ? "Edit Product" : "Add Product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={modalData.name}
                                onChange={(e) => setModalData({...modalData, name: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={modalData.description}
                                onChange={(e) => setModalData({...modalData, description: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={modalData.price}
                                onChange={(e) => setModalData({...modalData, price: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter stock"
                                value={modalData.stock}
                                onChange={(e) => setModalData({...modalData, stock: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={modalData.category}
                                onChange={(e) => setModalData({...modalData, category: e.target.value})}
                            >
                                <option value="">Select category</option>
                                {category.map(c => (
                                    <option key={c.id} value={c.name}>{c.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image URL"
                                value={modalData.image}
                                onChange={(e) => setModalData({...modalData, image: e.target.value})}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveProduct}>
                        {modalData.id ? "Save Changes" : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AdminPage;