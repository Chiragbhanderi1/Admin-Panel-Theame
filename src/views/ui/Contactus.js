import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
    Row,
    Col,
    Button,
  } from "reactstrap";
const Contactus = () => {
    const Navigate =useNavigate();
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        if(!localStorage.getItem('myuser')){
          Navigate("/login")
        }
        // Fetch all contacts from the API
        fetch("https://api-otkz60obx-chiragbhanderi1.vercel.app/getcontactus")
          .then((res) => res.json())
          .then((data) => {setContacts(data)})
          .catch((err) => console.log(err));
          // eslint-disable-next-line
      }, []);
      const handleDeletecontact = (id) => {
        // Send a DELETE request to the API to delete the event with the given ID
        fetch(`https://api-otkz60obx-chiragbhanderi1.vercel.app/deletecontact/${id}`, {
          method: "DELETE",
        })
          .then(() => {
            setContacts(contacts.filter((contact) => contact.id !== id));
          })
          .catch((err) => console.log(err));
      };
  return (
    <div>
              <Row>
        <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-person-lines-fill me-2"> </i>
            Contact Us Messages 
          </CardTitle>
          <CardBody style={{overflowX:"auto"}}>
          {contacts.map((contact,index)=>(
      <Card key={index} className='d-flex flex-md-row align-items-center p-2'>
        <p >{index+1}</p>
        <CardBody className="pl-1">
          <CardTitle tag="h5">{contact.name}</CardTitle>
          <CardSubtitle>{contact.email}</CardSubtitle>
          <CardText className="mt-3" >{contact.contact}</CardText>
          <CardText className="mt-3" >{contact.message}</CardText>
        </CardBody>
        <Button onClick={()=>{handleDeletecontact(contact.id)}}>Delete</Button>
    </Card>
          ))}
          </CardBody>
        </Card>
        </Col>
      </Row>
        
    </div>
  )
}

export default Contactus
