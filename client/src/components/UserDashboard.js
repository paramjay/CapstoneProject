import React, { useState,useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";


export default function UserDashboard() {
    
    return (
        <Container>
            <h1 className="mt-3 mb-3">User Dashboard</h1>
            <Table id="userTable" striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Role</th>
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
                    <td>Role</td>
                    <td><Button variant="outline-danger" size="sm">Deactivate</Button></td>
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
                    <td>Role</td>
                    <td><Button variant="outline-danger" size="sm">Deactivate</Button></td>
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
                    <td>Role</td>
                    <td><Button variant="outline-danger" size="sm">Deactivate</Button></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
};