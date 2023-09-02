import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,Table,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
const Signup = () => {
  const [name, setName] = useState('');
  const [adminname, setAdminname] = useState('');
  const [password, setPassword] = useState('');
  const [superpassword, setSuperpassword] = useState('');
  const [admins, setAdmins] = useState([]);  
  const [error, setError] = useState([]);  
  const [contact, setContact] = useState([]);  
  const [showModal, setShowModal] = useState(true);
  const Navigate = useNavigate();
  useEffect(() => {
    // Fetch all internships from the API
    fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getadmins")
      .then((res) => res.json())
      .then((data) =>{setAdmins(data)})
      .catch((err) => console.log(err));
      // eslint-disable-next-line
  }, []);
  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (superpassword==="admin") {
      setShowModal(false);
    }else{
      setError("Invalid Password");
    }
  };
  const handleDelete = (id) => {
    // Send a DELETE request to the API to delete the event with the given ID
    fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/admindelete/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        if (id===localStorage.getItem('name')) {
          localStorage.removeItem('name')
          Navigate('/login')
        }
        setAdmins(admins.filter((admins) => admins.id !== id));
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/adminsignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:name,username:adminname,password:password,contact:contact}),
    })
      .then((res) => {
        if (res.status===200) {
          alert("New Admin Added!");
          const data ={name:name,username:adminname,password:password,contact:contact};
          admins.push(data);
          setName("");
          setPassword("");
          setAdminname("");
          setContact("");
        }else{
          alert("Check Credentails Or Internal Error");
        }
      })
      .catch((err) => alert(err));
  }
  return (
    <div className='bg-white'>
      <Modal isOpen={showModal}>
        <ModalHeader>Password Verification</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleModalSubmit}>
            <FormGroup>
              <Label for="superpassword">Password:</Label>
              <Input type="password" id="superpassword" required value={superpassword} onChange={(e) => setSuperpassword(e.target.value)} />
            </FormGroup>
            {error && <p className='text-danger'>{error}</p>}
            <Button type="submit">Continue</Button>
          </Form>
        </ModalBody>
      </Modal>
<Row>
      <Col>
        <Card>
          <CardTitle tag="h4" className="text-center border-bottom p-3 mb-0">
          <i className="bi bi-person-fill-lock me-2"></i>
            Admins
          </CardTitle>
          <CardTitle tag="h6" className=" p-3 mb-0">
          <i className="bi bi-person-fill-lock me-2"></i> 
            Add Admin
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" id="name" className="form-control form-control-lg" required  value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Enter a valid Admin Name" />
              </FormGroup> 
              <FormGroup>
                <Label for="adminname">Username</Label>
                <Input type="text" id="adminname" className="form-control form-control-lg" required  value={adminname} onChange={(e) => setAdminname(e.target.value)}
                 placeholder="Enter a Username"/>
              </FormGroup>
              <FormGroup>
                <Label for="contact">Contact</Label>
                <Input type="number" id="contact" className="form-control form-control-lg" required  value={contact} onChange={(e) => setContact(e.target.value)}
                 placeholder="Enter Contact Number"/>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" id="password" className="form-control form-control-lg" required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password" />
              </FormGroup>
              <Button type="submit" className="btn btn-primary btn-lg" style={{paddingLeft: "2.5rem", paddingRight: "2.5rem", width:"100%"}}>Add Admin</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
      <h3 className='text-center'>All Admins</h3>
    <Table bordered hover >
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                    {admins.map((admin,index)=>(
                <tr key={index} >
                  <th scope="row">{index+1}</th>
                  <td>{admin.username}</td>
                  <td>{admin.name}</td>
                  <td>{admin.contact}</td>
                  <td><Button onClick={()=>{handleDelete(admin.id)}}>Delete</Button></td>
                </tr>
                    ))}
              </tbody>
            </Table>
    </div>
  )
}

export default Signup
