import React,{ useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Table, Card, CardTitle, CardBody,Button, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup } from "reactstrap";
const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [user,setUser]=useState([]);
    const Navigate = useNavigate();
    const openuser =(id)=>{
      fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getuser/${id}`)
          .then((res) => res.json())
          .then((data) =>{setUser(data)})
          .catch((err) => console.log(err));
      setShowModal(!showModal);
    }
    const handleMore =(id) =>{
      Navigate(`/courses/${id}`)
    }
    const approve =(request)=>{
      const data ={
        type:request.type,
        courseId:request.courseId,
        courseimage:request.courseimage
      }
      fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/subscribedcourse/${request.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) =>{ 
        if(Response.status ===200){
          res.json()
        }
      })
      .then((data) => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log(err));
      const info = {
        status : "Approved"
      }
      fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/updaterequest/${request.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) =>{ 
        if(Response.status ===200){
          res.json()
        }
      })
      .then((data) => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log(err));
    };
    const reject = (id)=>{
      const data = {
        status : "Rejected"
      }
      fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/updaterequest/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) =>{ 
        if(Response.status ===200){
          res.json()
        }
      })
      .then((data) => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log(err));
    };
    const undo = (id)=>{
      const data = {
        status : "Pending"
      }
      fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/updaterequest/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) =>{ 
        if(Response.status ===200){ 
          res.json()
        }
      })
      .then((data) => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log(err));
    };
    useEffect(() => {
        if(!localStorage.getItem('name')){
          Navigate("/login")
        }
        // Fetch all internships from the API
        fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getrequests")
          .then((res) => res.json())
          .then((data) =>{setRequests(data)})
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
            Requests
          </CardTitle>
          <CardBody style={{overflowX:"auto"}}>
            <Table bordered hover >
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Action</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                    {requests.map((request,index)=>(
                <tr key={index} >
                  <th scope="row">{index+1}</th>
                  <td onClick={()=>{openuser(request.email)}}>{request.email}</td>
                  <td onClick={()=>{handleMore(request.courseId)}}>{request.courseId}</td>
                  <td>
                  { request.status==="Pending"&& <div> 
                      <button className="btn btn-success" onClick={()=>{approve(request)}}> Approve</button>
                      <button className="btn btn-danger ms-2" onClick={()=>{reject(request.id)}}> Reject</button>
                    </div> }
                  { request.status==="Rejected"&& <div> 
                      <button className="btn btn-warning" onClick={()=>{undo(request.id)}}> Undo <i class="bi bi-arrow-counterclockwise"></i></button>
                    </div> }
                  </td>
                  <td>{ request.status}</td>
                </tr>
                    ))}
              </tbody>
            </Table>           
          </CardBody>
        </Card>
        </Col>
        <Modal isOpen={showModal} toggle={()=>{setShowModal(!showModal);}}>
            <ModalHeader toggle={()=>{setShowModal(!showModal);}}>User Details</ModalHeader>
            <ModalBody>
              <FormGroup className="mt-2">
              <ul className="list-group">
                <li className="list-group-item"><b>Name :</b> {user.name}</li>
                <li className="list-group-item"><b>Email :</b> {user.email}</li>
                <li className="list-group-item"><b>College :</b> {user.college}</li>
                <li className="list-group-item"><b>Contact :</b> {user.contact}</li>
                <li className="list-group-item"><b>Address :</b> {user.address}</li>
                <li className="list-group-item"><b>Year :</b> {user.year}</li>
              </ul>                
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={()=>{setShowModal(!showModal);}}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
      </Row>
    </div>
  )
}

export default Requests
