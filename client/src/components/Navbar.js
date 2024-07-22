import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar,Form,Row,Col,Button } from "react-bootstrap";

export default function NavBar(props) {
  return (
    <div id="header" className="border-bottom text-white">
    <Navbar  expand="lg">
      <Navbar.Brand><h2 className="mx-5 ps-5"><a href="/" className="text-white text-decoration-none">Aspire</a></h2></Navbar.Brand>
      <Navbar.Toggle aria-controls="issue-navbar-nav" className="text-bg-light"/>
      <Navbar.Collapse id="issue-navbar-nav" className="">
      <NavLink NavLink  title="Home Page" className="nav-link p-2" to="/">Home</NavLink>
      <NavLink NavLink  title="Products" className="nav-link p-2" to="/Product">Products</NavLink>
      {props.LoggedInUser.role === "Admin" ? (
        <>
        {/* <NavLink NavLink  title="Add Product" className="nav-link p-2" to="/AddProduct">Add Product</NavLink> */}
        <NavLink NavLink  title="Dashboard" className="nav-link p-2" to="/ProductDashboard">Dashboard</NavLink>
        {/* <NavLink NavLink  title="User Dashboard" className="nav-link p-2" to="/UserDashboard">User Dashboard</NavLink> */}
        </>
      ) : props.LoggedInUser.role === "Buyer" ? (
        <>
        <NavLink NavLink  title="Wish-List" className="nav-link p-2" to="/ProductDashboard">WishList</NavLink>
        <NavLink NavLink  title="Cart" className="nav-link p-2" to="/UserDashboard">Cart</NavLink>
        </>
       ) : (<></>)}
       <div className="w-100">
        <Row id="nav-search" className="float-end search-box-div">
          <Col className="search-box" md="auto" lg="auto" xs={12}>
            <Form inline >
            <Form.Control
              type="text"
              placeholder="Search"
              className="search-box mr-sm-2"
            />
            </Form>
          </Col>
            {props.LoggedInUser.username == null ? ( <></>) : (<>
            
              <Col md="auto" lg="auto" xs={12}>
              <NavLink NavLink  title="Logout" onClick={props.Logout} className="nav-link p-2" to="/login">
                <i className="fa fa-user-circle-o px-1" style={{ fontSize:"20px"}} ></i>{props.LoggedInUser.username}
              </NavLink>
              </Col>
              </>)
            }
          <Col  className="me-5" md="auto" lg="auto" xs={12}>
          {props.LoggedInUser.username == null ? (
              <>
              <NavLink NavLink  title="Login Page" className="nav-link p-2" to="/login">Login</NavLink>
            </>
            ) : (<>
            <NavLink NavLink  title="Logout" onClick={props.Logout} className="nav-link p-2" to="/login">Logout</NavLink>
            </>)
          }
          </Col>
        </Row>
      </div>
       
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}
