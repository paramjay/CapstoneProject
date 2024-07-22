import React from "react";
import { useState } from "react";
import { Card,Button,Form,Row,Col } from 'react-bootstrap';
import { UserLogin } from "../utils";
import {  useNavigate } from "react-router-dom";
import logoImg  from "./../images/logo1.png";

export default function Login(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState("");
  
    const Authentication =  async (e) => {
      const userData = await UserLogin(username,password);
      if(userData!=null){
        props.setLoggedInUser(userData);
        navigate("/");
      }
      else{
        seterror("Invalid username or password.")
      }
    };
  return <>
    <div className=" loginDiv">
    <Row>
        <Col lg={3} md={2} sm={12}></Col>
        <Col lg={6} md={8} sm={12}>
            <Card className=" rounded-5 loginCard">
                <div className="text-center">
                    <img className="login-logo-img m-3" src={logoImg} alt="logo-Aspire" />
                    <h3 className="text-center">Login</h3>
                    <p className="m-0 ">Welcome to Aspire</p>
                </div>
                <Card.Body>
                    <Form> 
                    {error ? (
                        <>
                        <div className="m-2 p-2 text-bg-danger bg-danger">{error}</div>
                        </>
                    )
                    : (<></>)}
                        <Form.Group as={Row} className="mb-3 m-2 login-control" controlId="formPlaintextEmail">
                            <Form.Control type="text" value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Username" />
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 m-2 login-control" controlId="formPlaintextPassword">
                            <Form.Control type="password"  value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" />
                        </Form.Group>
                    </Form>
                    <div className="text-center"><Button className="btn-login mb-4 m-2 " onClick={Authentication} variant="primary">Login</Button></div>
                    <div className="text-center"><span>Don't have an account? <a href="/SignUp">SignUp</a></span></div>
                    <div className="login-social-icons">
                        <i	className="fa fa-google-plus-square"></i>
                        <i	className="fa fa-instagram"></i>
                        <i	className="fa fa-facebook-square"></i>
                        <i	className="fa fa-youtube-play"></i>
                        <i	className="fa fa-twitter-square"></i>
                    </div>
                </Card.Body>
            </Card>
        </Col>
        <Col lg={3} md={2} sm={12}></Col>
    </Row>
    </div>
    </>;
}
