import React, { useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";

const REGISTER_PRODUCT_MUTATION = `
  mutation RegisterProduct($input: RegisterProductInput!) {
    registerProduct(input: $input) {
      id
      category
      subCategory
      name
      brand
      stock
      size
      price
      salePrice
      description
    }
  }
`;

export default function AddProduct() {
  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for empty required fields
    const requiredFields = [
      'category', 'subCategory', 'name', 'brand', 'stock',
      'size', 'price', 'salePrice' 
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`${field} is required`);
        return;
      }
    }

    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const variables = { input: { ...formData } };

    console.log("Submitting the following data:", variables); // Debugging line

    try {
      const UploadformData = new FormData();
      UploadformData.append('myfile', file); // 'myfile' should match the field name expected by the server 
      const fileUploadApi = await fetch('http://localhost:3002/upload/'+formData.name, {
        method: 'POST',
        body: UploadformData
      });
  
      if (!fileUploadApi.ok) {
        alert("Unable to upload image try again later"); // Display error message to the user
        throw new Error('Network response was not ok ' + fileUploadApi.statusText);
      }
      else{
        const data = await fileUploadApi.json();
        console.log(data.message);
        const response = await fetch('http://localhost:3002/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: REGISTER_PRODUCT_MUTATION,
            variables: variables
          })
        });
  
        const result = await response.json();
        if (result.errors) {
          console.error("Error adding product:", result.errors);
          alert(result.errors[0].message); // Display error message to the user
        } else {
          console.log("Product added:", result.data.registerProduct);
          alert("New product added successfully");
          // Reset form after successful submission
          setFormData({
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
          setFile(null);
          document.getElementById('file').value = null;
        }
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("An error occurred while adding the product. Please try again later.");
    }
  };

  return (
    <Container className="">
      <div id="" className="card card-body p-4 m-5">
        <h3 className="text-center mb-4">Add Product Form</h3>
        <form id="AddProductForm" onSubmit={handleSubmit}>
          <Row>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_Category">
                <Form.Label>Category:</Form.Label>
                <Form.Control
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_subCategory">
                <Form.Label>Sub Category:</Form.Label>
                <Form.Control
                  type="text"
                  id="subCategory"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_brand">
                <Form.Label>Brand:</Form.Label>
                <Form.Control
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_Stock">
                <Form.Label>Stock (number of items):</Form.Label>
                <Form.Control
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_size">
                <Form.Label>Size:</Form.Label>
                <Form.Control
                  type="text"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_price">
                <Form.Label>Price:</Form.Label>
                <Form.Control
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_sale-price">
                <Form.Label>Sale Price:</Form.Label>
                <Form.Control
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_image">
                <Form.Label>Upload Image:</Form.Label>
                <Form.Control
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_description">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="button-div mt-3 text-center">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
