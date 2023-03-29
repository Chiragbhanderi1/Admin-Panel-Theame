import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
const Users = () => {
    const [users, setUsers] = useState([]);
    const Navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('myuser')){
          Navigate("/login")
        }
        // Fetch all internships from the API
        fetch("https://api-p1sakfilu-chiragbhanderi1.vercel.app/getusers")
          .then((res) => res.json())
          .then((data) =>{setUsers(data)})
          .catch((err) => console.log(err));
          // eslint-disable-next-line
      }, []);
  return (
    <div>
      <Row>
        <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-people me-2"> </i>
            Users
          </CardTitle>
          <CardBody style={{overflowX:"scroll"}}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>College Name</th>
                  <th>Contact No.</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                    {users.map((user,index)=>(
                <tr>
                  <th scope="row">{index+1}</th>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.college}</td>
                  <td>{user.contact}</td>
                  <td>{user.year}</td>
                </tr>
                    ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Users
