import React, { useState,useEffect } from "react";
import { Row, Col, Form, Button, Container,Table } from "react-bootstrap";
import { addCategory,graphQLCommand,addCategoryDiscount,getCatDiscount } from "../utils";

export default function Category() {
  
  const [categoryList, setCategoryList] = useState([]);
  const [categoryDiscountList, setCategoryDiscountList] = useState([]);
  // addCategory
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let form = document.getElementById("AddCategoryForm");
      var name=form.name.value;
      if(name!=null || name!=''){
        let category={ name:name};
        let new_Category= await addCategory(category);
        if(new_Category){
          alert("New category created successfully.");
          window.location.reload();
        }
      }
      else{
        alert("Category Name is required");
        return null;
      }
    } catch (error) {
      alert("Something went wrong, Try Again later!");
      console.log("Something went wrong.. ",error)
      return null;
    }
  };
  const handleSubmitDiscount = async (e) => {
    try {
      e.preventDefault();
      let form = document.getElementById("AddCategoryDiscountForm");
      var category=form.category.value;
      var discount=form.discount.value.toString();
      if(category!=null || category!='' || discount!=null || discount!='' ){
        let categoryDiscount={ category,discount};
        let new_CategoryDiscount= await addCategoryDiscount(categoryDiscount);
        if(new_CategoryDiscount){
          alert("New category discount added successfully.");
          window.location.reload();
        }
      }
      else{
        alert("Both the fields are required");
        return null;
      }
    } catch (error) {
      alert("Something went wrong, Try Again later!");
      console.log("Something went wrong.. ",error)
      return null;
    }
  };
  const fetchCategory = async () => {
    const query = `query GetCategory {
      getCategory {
        id
        name
      }
    }`;
    const data = await graphQLCommand(query);
    const data2 = await getCatDiscount();
    setCategoryList(data.getCategory);
    setCategoryDiscountList(data2);
  };
  useEffect(() => {
    //get date from server
    fetchCategory();
  }, []);

  return (
    <Container className="">
      <div className="mt-4 ">
        <a className="m-2 btn btn-outline-primary active" href="/Category">Category</a>
        <a className="m-2 btn btn-outline-primary " href="/SubCategory">Sub-Category</a>
        <a className="m-2 btn btn-outline-primary" href="/ProductDashboard">Products</a>
        <a className="m-2 btn btn-outline-primary " href="/UserDashboard">Users</a>
        <a className="m-2 btn btn-outline-primary " href="/SalesDashboard">Sales</a>
      </div>
      <Row>
      <Col md={6}>
      <div id="" className="">
        <h3 className="mb-2 mt-3">Add Category:-</h3>
        <form id="AddCategoryForm" onSubmit={handleSubmit}>
          <Row>
            <Col md={5} lg={5} xs={12}>
              <Form.Group className="mb-3" controlId="form_Category_Name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </Form.Group>
            </Col>
            <Col className="p-2" md={6} lg={6} xs={12}>
            <Button className="mt-4" variant="primary" type="submit">Add-Category</Button>
            </Col>
          </Row>
          
        </form>
      </div>
      <div>
        <h3 className="mb-2 mt-3">Category List:-</h3>
        <Table striped hover bordered className="w-auto">
            <thead>
            <tr className="text-center">
                <th>Id</th>
                <th>Category</th>
            </tr>
            </thead>
            <tbody>
            {categoryList.map((singleRow) => (
              <tr>
              <td><span className="m-3">{singleRow.id}</span></td>
              <td><span className="m-5">{singleRow.name}</span></td>
              </tr>
            ))}
            </tbody>
        </Table>
      </div>
      </Col>
      <Col md={6}>
      <div id="" className="">
        <h3 className="mb-2 mt-3">Add Category Discount:-</h3>
        <form id="AddCategoryDiscountForm" onSubmit={handleSubmitDiscount}>
          <Row>
            <Col md={5} lg={5} xs={12}>
              <Form.Group className="mb-3" controlId="form_Category_Name2">
                <Form.Label>Select Category:</Form.Label>
                <Form.Select id="category" name="category" required>
                  <option value="">---Select---</option>
                  {categoryList.map((singleRow) => (
                    <option value={singleRow.id}> {singleRow.name}</option>
                  ))}
                </Form.Select>
                <Form.Label className="mt-2">Enter Discount in percentage (%):</Form.Label>
                <Form.Control type="Number" name="discount" id="discount" />
              </Form.Group>
            </Col>
            <Col className="p-2" md={6} lg={6} xs={12}>
            <Button className="mt-4" variant="primary" type="submit">Add Category Discount</Button>
            </Col>
          </Row>
          
        </form>
      </div>
      <div>
        <h3 className="mb-2 mt-3">Category Discount On:-</h3>
        <Table striped hover bordered className="w-auto">
            <thead>
            <tr className="text-center">
                <th>Id</th>
                <th>Category</th>
                <th>Discount</th>
            </tr>
            </thead>
            <tbody>
            {categoryDiscountList.map((singleRow) => (
              <tr>
              <td><span className="m-3">{singleRow.id}</span></td>
              <td><span className="m-5">{singleRow.category.name}</span></td>
              <td><span className="m-5">{singleRow.discount}</span></td>
              </tr>
            ))}
            </tbody>
        </Table>
      </div>
      </Col>
      </Row>
    </Container>
  );
}
