import React, { useState,useEffect } from "react";
import { Table, Button, Container,Row,Col } from "react-bootstrap";
import { graphQLCommand,DeleteProduct } from "../utils";


export default function ProductDashboard() {
    
  const [products, setProducts] = useState([]);
    const fetchData = async () => {
        const query = `query GetProducts {
            getProducts {
                id
                category {
                id
                name
                }
                subCategory {
                id
                name
                }
                name
                brand
                stock
                size
                price
                description
                image
            }
            }`;
        
        const data = await graphQLCommand(query);
        setProducts(data.getProducts);
      };
    useEffect(() => {
        //get date from server
        fetchData();
      }, []);
    return (
        <Container id="productDashboard">
            <div className="mt-4 ">
                <a className="m-2 btn btn-outline-primary" href="/Category">Category</a>
                <a className="m-2 btn btn-outline-primary " href="/SubCategory">Sub-Category</a>
                <a className="m-2 btn btn-outline-primary active" href="/ProductDashboard">Products</a>
                <a className="m-2 btn btn-outline-primary " href="/UserDashboard">Users</a>
            </div>
            
            <Row> <Col><h3 className="mt-3 mb-3">Product Dashboard</h3> </Col>
                <Col>
                <a className="mt-4 btn btn-outline-success float-end" href="/AddProduct">Add New Product
                 <i className="ms-1 fa fa-plus"></i></a>
                </Col>
            </Row>
            <Table id="userTable" striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Sub-Category</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Stock</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((singleRow) => (
                        <ProductRows row={singleRow} key={singleRow.id} fetchData={fetchData} deleteProduct={DeleteProduct}/>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
};
function ProductRows(props){
    const removeProduct = async (_) => {
        var data = await props.deleteProduct(props.row.id);
        alert(data.removeProduct);
        props.fetchData();
    };
    return(<tr>
    <td>{props.row.id}</td>
    <td>{props.row.category.name}</td>
    <td>{props.row.subCategory.name}</td>
    <td>{props.row.name}</td>
    <td>{props.row.brand}</td>
    <td>{props.row.stock}</td>
    <td>{props.row.size}</td>
    <td>{props.row.price}</td>
    <td><Button variant="outline-danger" size="sm" onClick={removeProduct}>Delete</Button>
    <Button variant="outline-primary" size="sm"  href={`/EditProduct/${props.row.id}`}>Edit</Button></td>
    </tr>
    )
}