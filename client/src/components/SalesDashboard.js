import React, { useState,useEffect } from "react";
import { Table, Button, Container,Row,Col } from "react-bootstrap";
import { graphQLCommand,DeleteProduct } from "../utils";


export default function SalesDashboard() {
    
    

  const [allBills, setAllBills] = useState([]);
    const fetchData = async () => {
        const query = `query GetAllBills {
            getAllBills {
                id
                address
                country
                state
                zip
                paymentMethod
                ccName
                ccNumber
                ccExpiration
                ccCvv
                total
                promoCode
                promoDiscount
                categoryDiscount
                user {
                id
                firstName
                lastName
                }
            }
            }`;
        
        const data = await graphQLCommand(query);
        
        // const sum = data.getAllBills.reduce((total, item) => total + parseFloat(item.total), 0);
        // console.log(sum);
        
        setAllBills(data.getAllBills);
        setSubtotal(data.getAllBills.reduce((total, item) => total + parseFloat(item.total), 0))
      };
    const [subtotal, setSubtotal] = useState("");
 
    useEffect(() => {
        //get date from server
        fetchData();
      }, []);
    return (
        <Container id="productDashboard">
            <div className="mt-4 ">
                <a className="m-2 btn btn-outline-primary" href="/Category">Category</a>
                <a className="m-2 btn btn-outline-primary " href="/SubCategory">Sub-Category</a>
                <a className="m-2 btn btn-outline-primary" href="/ProductDashboard">Products</a>
                <a className="m-2 btn btn-outline-primary " href="/UserDashboard">Users</a>
                <a className="m-2 btn btn-outline-primary active " href="/SalesDashboard">Sales</a>
            </div>
            
            <Row> <Col><h3 className="mt-3 mb-3">Sales Dashboard</h3> </Col>
            </Row>
            {/* Total{subtotal} */}
            <span className="fs-5 mb-3 text-primary">Total Revenue-{subtotal}</span>
            <Table id="userTable" className="mt-3" striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Buyer</th>
                    <th>Delivery Address</th>
                    <th>Payment Method</th>
                    <th>Total Amount</th>
                    <th>Promo Code</th>
                    <th>Discount</th>
                    </tr>
                </thead>
                <tbody>
                    {allBills.map((singleRow) => (
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
    <td>{props.row.user.firstName} {props.row.user.lastName}</td>
    <td>{props.row.address}</td>
    <td>{props.row.paymentMethod}</td>
    <td>{props.row.total}</td>
    <td>{props.row.promoCode}</td>
    <td>{props.row.promoDiscount}</td>
    </tr>
    )
}