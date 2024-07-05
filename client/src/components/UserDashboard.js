import React, { useState,useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { graphQLCommand,DeactivateUser,DeleteUser } from "../utils";


export default function UserDashboard() {
     
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
      const query = `query GetUsers {
            getUsers {
                id
                username
                email
                password
                firstName
                lastName
                phone
                gender
                dob
                role
                address
                isActive
            }
            }`;
      
      const data = await graphQLCommand(query);
      setUsers(data.getUsers);
    };
    useEffect(() => {
        //get date from server
        fetchData();
      }, []);
    return (
        <Container className="mb-5">
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
                    {users.map((singleRow) => (
                        <UserRows row={singleRow} key={singleRow.id} fetchData={fetchData} DeactivateUser={DeactivateUser} DeleteUser={DeleteUser}/>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
};


function UserRows(props){
    const deactivateUser = async (_) => {
        var data = await props.DeactivateUser(props.row.id);
        alert(data.deactivateUser);
        props.fetchData();
    };
    const deleteUser = async (_) => {
        var data = await props.DeleteUser(props.row.id);
        alert(data.removeUser);
        props.fetchData();
    };
    
     
    return(<tr>
    <td>{props.row.id}</td>
    <td>{props.row.firstName}</td>
    <td>{props.row.lastName}</td>
    <td>{props.row.username}</td>
    <td>{props.row.email}</td>
    <td>{props.row.phone}</td>
    <td>{props.row.gender}</td>
    <td>{props.row.dob}</td>
    <td>{props.row.role}</td>
    <td>
    {props.row.isActive ? (
        <Button variant="outline-danger" size="sm" onClick={deactivateUser}>Deactivate</Button>
    ) : (
        <Button variant="outline-success" size="sm" onClick={deactivateUser}>Activate</Button>
    )}  
    <Button variant="outline-danger" size="sm" onClick={deleteUser}>Delete</Button>
    
    <Button variant="outline-primary" size="sm" >Edit</Button>
    </td>
    </tr>
    )
}