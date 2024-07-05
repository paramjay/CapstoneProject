import React, { useState,useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { graphQLCommand,DeleteProduct } from "../utils";


export default function ProductDashboard() {
    
  const [products, setProducts] = useState([]);
    const fetchData = async () => {
        const query = `query GetProducts {
            getProducts {
                id
                category
                subCategory
                name
                brand
                stock
                size
                price
                salePrice
                description
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
        <Container>
            <h1 className="mt-3 mb-3">Product Dashboard</h1>

            <Table id="userTable" striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Stock</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Sale-Price</th>
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
    <td>{props.row.category}</td>
    <td>{props.row.name}</td>
    <td>{props.row.brand}</td>
    <td>{props.row.stock}</td>
    <td>{props.row.size}</td>
    <td>{props.row.price}</td>
    <td>{props.row.salePrice}</td>
    <td><Button variant="outline-danger" size="sm" onClick={removeProduct}>Delete</Button>
    <Button variant="outline-primary" size="sm" >Edit</Button></td>
    </tr>
    )
}