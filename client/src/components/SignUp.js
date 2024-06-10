import React, { useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";

const REGISTER_USER_MUTATION = `
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      username 
      email
      firstName
      lastName 
      phone
      gender
      dob
      role
      address
    }
  }
`;

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    dob: "",
    role: "",
    address: ""
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

    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check for empty required fields
    const requiredFields = [
      'username', 'email', 'password', 'firstName', 'lastName',
      'phone', 'gender', 'dob', 'role', 'address'
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`${field} is required`);
        return;
      }
    }

    // Remove repeatPassword field from formData
    const { repeatPassword, ...inputData } = formData;

    const variables = { input: { ...inputData } };

    console.log("Submitting the following data:", variables); // Debugging line

    try {
      const response = await fetch('http://localhost:3002/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: REGISTER_USER_MUTATION,
          variables: variables
        })
      });

      const result = await response.json();

      if (result.errors) {
        console.error("Error registering user:", result.errors);
        alert(result.errors[0].message); // Display error message to the user
      } else {
        console.log("User registered:", result.data.registerUser);
        // Reset form after successful submission
        setFormData({
          username: "",
          email: "",
          password: "",
          repeatPassword: "",
          firstName: "",
          lastName: "",
          phone: "",
          gender: "",
          dob: "",
          role: "",
          address: ""
        });
      }
    } catch (err) {
      console.error("Error registering user:", err);
      alert("An error occurred while registering the user. Please try again later.");
    }
  };


  return (
    <Container>
      <div id="SignUp" className="card card-body p-4 m-5">
        <h3 className="text-center mb-4">Registration Form</h3>
        <form id="SignUpForm" onSubmit={handleSubmit}>
          <Row>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_username">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_repeat_password">
                <Form.Label>Repeat password:</Form.Label>
                <Form.Control
                  type="password"
                  id="repeatPassword"
                  name="repeatPassword"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_firstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_lastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_phone">
                <Form.Label>Phone:</Form.Label>
                <Form.Control
                  type="number"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_gender">
                <Form.Label>Gender:</Form.Label>
                <Form.Select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_dob">
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={6} xs={12}>
              <Form.Group className="mb-3" controlId="form_role">
                <Form.Label>Role:</Form.Label>
                <Form.Select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
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
                <Form.Control
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  as="textarea"
                  rows={3}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="button-div mt-3 text-center">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
