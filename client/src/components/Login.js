import React from "react";
import { useState } from "react";
import { Card,Button,Form,Row,Col } from 'react-bootstrap';
import { UserLogin } from "../utils";
import {  useNavigate } from "react-router-dom";

export default function Login(props) {
    
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const Authentication =  async (e) => {
      const userData = await UserLogin(username,password);
      props.setLoggedInUser(userData);
      navigate("/");
    };
  return <>
    <div className=" loginDiv">
    <Row>
        <Col lg={3} md={2} sm={12}></Col>
        <Col lg={6} md={8} sm={12}>
            <Card className="m-auto loginCard">
                <Card.Header><h3 className="text-center">Login</h3></Card.Header>
                <Card.Body>
                    <Form> 
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column  md={4} lg={4} xs={4}>
                            Username
                            </Form.Label>
                            <Col  md={8} lg={8} xs={6}>
                                <Form.Control type="text" value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    placeholder="Enter you username" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column  md={4} lg={4} xs={4}>
                            Password
                            </Form.Label>
                            <Col md={8} lg={8} xs={6}>
                                <Form.Control type="password"  value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password" />
                            </Col>
                        </Form.Group>
                    </Form>
                    <div className="text-center"><Button className="mb-3" onClick={Authentication} variant="primary">Login</Button></div>
                    <div className="text-center"><span>Don't have an account? <a href="/SignUp">SignUp</a></span></div>
                </Card.Body>
            </Card>
        </Col>
        <Col lg={3} md={2} sm={12}></Col>
    </Row>
    </div>
    </>;
}
