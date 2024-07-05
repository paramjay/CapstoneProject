import React from "react";
import { useState } from "react";
import { Card,Button,Form,Row,Col } from 'react-bootstrap';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Username:", username);
      console.log("Password:", password);
    };
  return <>
    <div className=" loginDiv">
    <Card className="m-auto loginCard">
        <Card.Header><h3 className="text-center">Login</h3></Card.Header>
        <Card.Body>
            <Form> 
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column  md={4} lg={4} xs={4}>
                    Username
                    </Form.Label>
                    <Col  md={8} lg={8} xs={6}>
                    <Form.Control type="text" placeholder="Enter you username" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column  md={4} lg={4} xs={4}>
                    Password
                    </Form.Label>
                    <Col md={8} lg={8} xs={6}>
                    <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>
            </Form>
            <div className="text-center"><Button className="mb-3" variant="primary">Login</Button></div>
            <div className="text-center"><span>Don't have an account? <a href="/SignUp">SignUp</a></span></div>
        </Card.Body>
    </Card>
    </div>
    </>;
}
