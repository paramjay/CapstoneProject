import React, { useState,useEffect } from "react";
import { Row, Col, Form, Button, Container,Table } from "react-bootstrap";
import { addSubCategory,graphQLCommand } from "../utils";

export default function SubCategory() {
  
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  // addCategory
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let form = document.getElementById("AddSubCategoryForm");
      var categoryId=form.categoryId.value;
      var name=form.name.value;
      if(categoryId==null || categoryId==''){
        alert("Select a Category its required");
        return null;
      }
      else if(name!=null || name!=''){
        let sub_category={ categoryId:categoryId, name:name};
        let new_SubCategory= await addSubCategory(sub_category);
        if(new_SubCategory){
          alert("New sub-category created successfully.");
          window.location.reload();
        }
      }
      else{
        alert("Sub-Category Name is required");
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
  const fetchSubCategory = async () => {
    const query = `query GetSubCategory {
    getSubCategory {
        id
        name
        categoryId {
            id
            name
        }
    }
    }`;
    const data = await graphQLCommand(query);
    setSubCategoryList(data.getSubCategory);
  };

  useEffect(() => {
    //get date from server
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    
    <Container className="">
        <div className="mt-4 ">
            <a className="m-2 btn btn-outline-primary" href="/Category">Category</a>
            <a className="m-2 btn btn-outline-primary active" href="/SubCategory">Sub-Category</a>
            <a className="m-2 btn btn-outline-primary " href="/ProductDashboard">Products</a>
            <a className="m-2 btn btn-outline-primary " href="/UserDashboard">Users</a>
        </div>
      <div id="" className="">
        <h3 className="mb-2 mt-3">Add Sub-Category:-</h3>
        <form id="AddSubCategoryForm" onSubmit={handleSubmit}>
          <Row>
            <Col md={5} lg={5} xs={12}>
              <Form.Group className="mb-3" controlId="form_CategoryId">
                <Form.Label>Category:</Form.Label>
                <Form.Select id="categoryId" name="categoryId" >
                <option value="">---Select---</option>
                {categoryList.map((singleRow) => (
                    <option value={singleRow.id}> {singleRow.name}</option>
                ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="form_Sub_Category_Name">
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
        <h3 className="mb-2 mt-3">Sub-Category List:-</h3>
        <Table striped hover bordered className="w-auto">
            <thead>
            <tr className="text-center">
                <th>Id</th>
                <th>Sub-Category</th>
                <th>Category</th>
            </tr>
            </thead>
            <tbody>
            {subCategoryList.map((singleRow) => (
              <tr>
              <td><span className="m-3">{singleRow.id}</span></td>
              <td><span className="m-5">{singleRow.name}</span></td>
              <td><span className="m-5">{singleRow.categoryId.name}</span></td>
              </tr>
            ))}
            </tbody>
        </Table>
      </div>
    </Container>
  );
}
