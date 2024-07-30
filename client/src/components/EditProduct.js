import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getOneProduct,EditProductapi } from "../utils";

export default function EditProduct({ match }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    category: "",
    subCategory: "",
    name: "",
    brand: "",
    stock: "",
    size: "",
    price: "",
    salePrice: "",
    description: ""
  });

  useEffect(() => {
    (async () => {
      console.log(id);
      let getProduct= await getOneProduct(id);
      if (getProduct.getOneProduct === null) {
            navigate("/NotFound");
          }
          setProduct(getProduct.getOneProduct);
          console.log(product)
    })();
  }, [id]);


  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    const response = await EditProductapi(id, product);
    console.log(response);
    if (response.EditProductInput.includes("Successfully")) {
        alert('Product updated successfully');
        navigate("/ProductDashboard");
    }
    
    // You might want to redirect or refresh the page after successful update
  };

 
  return (
    <Container>
      <h1 className="mt-3 mb-3">Edit Product</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="subCategory">
              <Form.Label>Sub-Category</Form.Label>
              <Form.Control
                type="text"
                value={product.subCategory}
                onChange={(e) => setProduct({ ...product, subCategory: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="name" className="mt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="brand" className="mt-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            value={product.brand}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
            required
          />
        </Form.Group>
        <Row>
          <Col md={6} className="mt-3">
            <Form.Group controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="text"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mt-3">
            <Form.Group controlId="size">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                value={product.size}
                onChange={(e) => setProduct({ ...product, size: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mt-3">
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mt-3">
            <Form.Group controlId="salePrice">
              <Form.Label>Sale Price</Form.Label>
              <Form.Control
                type="text"
                value={product.salePrice}
                onChange={(e) => setProduct({ ...product, salePrice: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="description" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">Save Changes</Button>
      </Form>
    </Container>
  );
}
