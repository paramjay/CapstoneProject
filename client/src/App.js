import React, { useState,useEffect } from "react";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import AddProduct from "./components/AddProduct";
import UserDashboard from "./components/UserDashboard";
import ProductDashboard from "./components/ProductDashboard";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";



import NavBar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import EditProduct from "./components/EditProduct";

function App() {
  const Logout=()=>{
    localStorage.removeItem('token');
    setLoggedInUser([]);
  }
  const [LoggedInUser, setLoggedInUser] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem('token');
    console.log(JSON.parse(data));
    if(data){
    setLoggedInUser(JSON.parse(data));
    }
    // console.log(LoggedInUser);
  }, []);
  return (
    <>
      <Row>
        <Col>
          <NavBar LoggedInUser={LoggedInUser} Logout={Logout}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Routes>
            {/* Redirect */}
            <Route path="/" element={<Navigate replace to="/Home" />} />
            <Route path="Login" element={<Login LoggedInUser={LoggedInUser} setLoggedInUser={setLoggedInUser} />}/>
            <Route path="SignUp" element={<SignUp />}/>
            {LoggedInUser.role === "Admin" ? (
                <>
                  <Route path="AddProduct" element={<AddProduct />}/>
                  <Route path="UserDashboard" element={<UserDashboard />}/>
                  <Route path="ProductDashboard" element={<ProductDashboard />}/>
                  <Route path="EditProduct/:id" element={<EditProduct />} />

                </>
              ) : LoggedInUser.role === "Buyer" ? (
                <>
                  {/* <Route path="Product" element={<AddProduct />}/> */}
                  <Route path="Wish-list" element={<Wishlist />} />
                  <Route path="Cart" element={<Cart />} />

                  {/* <Route path="ProductDashboard" element={<ProductDashboard />}/> */}
                </>
              ) :(<></>)
            }
            

            {/* Nested */}
            <Route path="/Home">
              <Route index element={<Main />} />
            </Route>

            {/* Not matched routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Col>
      </Row>
    </>
  );
}

export default App;
