import React from "react";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import AddProduct from "./components/AddProduct";

import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import NavBar from "./components/Navbar";
import { Row, Col } from "react-bootstrap";

function App() {
  return (
    <>
    <>
      <Row>
        <Col>
          <NavBar />
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Routes>
            {/* Redirect */}
            <Route path="/" element={<Navigate replace to="/Home" />} />
            <Route path="SignUp" element={<SignUp />}/>
            <Route path="AddProduct" element={<AddProduct />}/>
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
    </>
  );
}

export default App;
