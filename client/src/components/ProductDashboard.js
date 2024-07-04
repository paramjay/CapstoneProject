import React, { useState,useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";


export default function ProductDashboard() {
    
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
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Gender</td>
                    <td>DOB</td>
                    <td><Button variant="outline-danger" size="sm">Delete</Button></td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Gender</td>
                    <td>DOB</td>
                    <td><Button variant="outline-danger" size="sm">Delete</Button></td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td >Larry</td>
                    <td >Bird</td>
                    <td>@twitter</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Gender</td>
                    <td>DOB</td>
                    <td><Button variant="outline-danger" size="sm">Delete</Button></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
};