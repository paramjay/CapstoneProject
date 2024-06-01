import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar,Form,Row,Col,Button } from "react-bootstrap";

export default function NavBar() {
  return (
    <div id="header" className="border-bottom">
    <Navbar  expand="lg">
      <Navbar.Brand><h3 className="mx-5 ps-5">Aspire</h3></Navbar.Brand>
      <Navbar.Toggle aria-controls="issue-navbar-nav" />
      <Navbar.Collapse id="issue-navbar-nav">
      <NavLink NavLink  title="Home-Page" className="nav-link p-2" to="/">Home</NavLink>
      <NavLink NavLink  title="Add Product" className="nav-link p-2" to="/AddProduct">Add Product</NavLink>
      <div className="w-75">
        <Row id="nav-search" className="float-end">
          <Col md="auto" lg="auto" xs={12}>
            <Form inline >
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
            </Form>
          </Col>
          <Col md="auto" lg="auto"  xs={4}>
            <i  title="Shopping Cart" className="fa fa-shopping-cart pt-2" style={{ fontSize:"24px"}} ></i>
          </Col>
          <Col md="auto" lg="auto"  xs={4}>
            <i  title="Wish-List" className="fa fa-heart-o pt-2" style={{ fontSize:"24px"}} ></i>
          </Col>
          <Col  md="auto" lg="auto" xs={4}>
            <i title="User Profile" className="fa fa-user-circle-o pt-2" style={{ fontSize:"24px"}} ></i>
          </Col>
          <Col  md="auto" lg="auto" xs={12}>
            <NavLink title="Log In"  NavLink className="nav-link p-2" to="/LogIn">Log In</NavLink>
          </Col>
          <Col  md="auto" lg="auto" xs={12}>
            <NavLink  title="Sign Up" NavLink className="nav-link p-2" to="/SignUp">Sign Up</NavLink>
          </Col>
        </Row>
      </div>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}
