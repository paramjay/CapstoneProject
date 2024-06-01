import React from "react";
import { Row,Col,Form,Button,Container } from "react-bootstrap";

export default function AddProduct() {
  
    return (
        <Container className="">
        <div id="SignUp" className="card card-body p-4 m-5">
        <h3 className="text-center mb-4" >Add Product Form</h3>
        <form id="AddProductForm" >
        <Row>
            <Col md={6} lg={6} xs={12}> 
              <Form.Group className="mb-3" controlId="form_Category">
                <Form.Label>Category:</Form.Label>
                <Form.Control type="text" id="category" name="category" required/>
              </Form.Group >
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_subCategory">
              <Form.Label>Sub Category:</Form.Label>
                <Form.Control  type="text"  id="subCategory" name="subCategory" required/>
              </Form.Group >
            </Col>
        </Row>
        <Row>
            <Col md={6} lg={6} xs={12}> 
              <Form.Group className="mb-3" controlId="form_name">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" id="name" name="name" required/>
              </Form.Group >
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_brand">
              <Form.Label>Brand:</Form.Label>
                <Form.Control  type="text"  id="brand" name="brand" required/>
              </Form.Group >
            </Col>
           
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}> 
              <Form.Group className="mb-3" controlId="form_Stock">
                <Form.Label>Stock (number of items):</Form.Label>
                <Form.Control type="number" id="stock" name="stock" required/>
              </Form.Group >
            </Col>
            <Col md={6} lg={6} xs={12}> 
              <Form.Group className="mb-3" controlId="form_size">
                <Form.Label>Size:</Form.Label>
                <Form.Control type="text" id="size" name="size" required/>
              </Form.Group >
            </Col>
            
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_price">
              <Form.Label>Price:</Form.Label>
                <Form.Control  type="number"  id="price" name="price" required/>
              </Form.Group >
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_sale-price">
              <Form.Label>Sale-Price:</Form.Label>
                <Form.Control  type="number"  id="salePrice" name="salePrice" required/>
              </Form.Group >
            </Col>
          </Row>
          <Row>
            <Col> 
              <Form.Group className="mb-3" controlId="form_description">
                <Form.Label>Description:</Form.Label>
                <Form.Control id="description" name="description"  as="textarea" rows={3}/>
              </Form.Group >
            </Col>
          </Row>
          <div className="button-div mt-3 text-center">
          <Button variant="primary" type="button" >Add</Button>
          </div>
        </form>
        </div>
        </Container>
      );
}
