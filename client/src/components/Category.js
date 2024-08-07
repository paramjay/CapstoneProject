import React, { useState,useEffect } from "react";
import { Row, Col, Form, Button, Container,Table } from "react-bootstrap";
import { addCategory,graphQLCommand } from "../utils";

export default function Category() {
  
  const [categoryList, setCategoryList] = useState([]);
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

  const fetchCategory = async () => {
    const query = `query GetCategory {
      getCategory {
        id
        name
      }
    }`;
    const data = await graphQLCommand(query);
    setCategoryList(data.getCategory);
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
      </div>
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
    </Container>
  );
}
