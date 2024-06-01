import React from "react";
import { Row,Col,Form,Button,Container } from "react-bootstrap";

export default function SignUp() {
  
    return (
        <Container className="">
        <div id="SignUp" className="card card-body p-4 m-5">
        <h3 className="text-center mb-4" >Registration Form</h3>
        <form id="SignUpForm" >
        <Row>
            <Col md={6} lg={6} xs={12} > 
              <Form.Group className="mb-3" controlId="form_username">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" id="username" name="username" required/>
              </Form.Group >
            </Col>
            <Col  md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_email">
              <Form.Label>Email:</Form.Label>
                <Form.Control  type="email"  id="email" name="email" required/>
              </Form.Group >
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}> 
              <Form.Group className="mb-3" controlId="form_password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" id="password" name="password" required/>
              </Form.Group >
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_repeat_password">
              <Form.Label>Repeat password:</Form.Label>
                <Form.Control  type="password"  id="password" name="password" required/>
              </Form.Group >
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}> 
              <Form.Group className="mb-3" controlId="form_firstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control type="text" id="firstName" name="firstName" required/>
              </Form.Group >
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_lastName">
              <Form.Label>Last Name:</Form.Label>
                <Form.Control  type="text"  id="lastName" name="lastName" required/>
              </Form.Group >
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}> 
              <Form.Group className="mb-3" controlId="form_phone">
                <Form.Label>Phone:</Form.Label>
                <Form.Control type="number" id="phone" name="phone" required/>
              </Form.Group >
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_gender">
                <Form.Label>Gender:</Form.Label>
                <Form.Select id="gender" name="gender"  required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group >
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_dob">
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control  type="date"  id="dob" name="dob" required/>
              </Form.Group>
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_role">
                <Form.Label>Role:</Form.Label>
                <Form.Select id="role" name="role"  required>
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col> 
              <Form.Group className="mb-3" controlId="form_address">
                <Form.Label>Address:</Form.Label>
                <Form.Control  id="address" name="address"  as="textarea" rows={3}/>
              </Form.Group >
            </Col>
          </Row>
          <div className="button-div mt-3 text-center">
          <Button variant="primary" type="button" >Register</Button>
          </div>
        </form>
        </div>
        </Container>
      );
}
