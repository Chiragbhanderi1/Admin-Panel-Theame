import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Assignment Submitted
        </Modal.Title>
      </Modal.Header>
        {props.data.length===0 && <Modal.Body>No assignment Submitted by this user.</Modal.Body>}
        {props.data.map(((data,index)=>(
          <Modal.Body key={index}>
              <div><b>UserId : </b>{data.user}</div>
              {/* <div><b>Submitted on : </b>{data.submitted_on}</div> */}
              <div><b>Course Name:</b> {data.course.replace("%20", ' ')}</div>
              <div><b>Assignment Name : </b>{data.name}</div>
              <a href={data.assignment}><button className='btn btn-dark'>View</button></a>
          </Modal.Body>
        )))}
      <Modal.Footer>
        <Button onClick={props.onHide}  className='btn btn-dark '>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const Users = () => { 
    const [users, setUsers] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalData,setModalData] =useState([])
    const Navigate = useNavigate();
    const openModal =(uid)=>{
      setModalShow(true)
      fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getsubmittedassignment/${uid}`)
      .then((res) => res.json())
      .then((data) => setModalData(data))
      .catch((err) => console.log(err));
      console.log(modalData)
    }
  
    useEffect(() => {
        if(!localStorage.getItem('name')){
          Navigate("/login")
        }
        // Fetch all internships from the API
        fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getusers")
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
          <CardBody style={{overflowX:"auto"}}>
            <Table bordered hover >
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
                <tr key={index} onClick={() => {openModal(user.email)}}>
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
            <MyVerticallyCenteredModal
                show={modalShow}
                data={modalData}
                onHide={() => setModalShow(false)}
            />
           
          </CardBody>
        </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Users
