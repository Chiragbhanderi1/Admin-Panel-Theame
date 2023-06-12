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
    const [emails, setEmails] = useState([]);
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };
    useEffect(() => {
        if(!localStorage.getItem('name')){
          Navigate("/login")
        }
        // Fetch all contacts from the API
        fetch("https://api-flu5fl4i5-chiragbhanderi1.vercel.app/getcontactus")
          .then((res) => res.json())
          .then((data) => {setContacts(data)})
          .catch((err) => console.log(err));
        fetch("https://api-flu5fl4i5-chiragbhanderi1.vercel.app/getnewsletters")
          .then((res) => res.json())
          .then((data) => {setEmails(data)})
          .catch((err) => console.log(err));
          // eslint-disable-next-line
      }, []);
      const handleDeletecontact = (id) => {
        // Send a DELETE request to the API to delete the event with the given ID
        fetch(`https://api-flu5fl4i5-chiragbhanderi1.vercel.app/deletecontact/${id}`, {
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
          
          <div className="bloc-tabs">
              <button className={toggleState === 1 ? "tabs active-tabs m-3 bg-dark text-white" : "tabs m-3 bg-white"} onClick={() => toggleTab(1)}>
              <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                <i className="bi bi-person-lines-fill me-2"> </i>
                Contact Us Messages 
              </CardTitle>
              </button>
              <button className={toggleState === 2 ? "tabs active-tabs m-3 bg-dark text-white" : "tabs m-3 bg-white"}  onClick={() => toggleTab(2)} >
              <CardTitle tag="h6" className="border-bottom p-3  mb-0">
              <i class="bi bi-newspaper">  </i>
                Newsletter Subscriptions 
              </CardTitle>
              </button>
          </div>
          <CardBody style={{overflowX:"auto"}} className={toggleState === 1 ? "content  active-content" : "content d-none"}>
          {contacts.length===0 && <h4>No Inquiry to show</h4>}
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
          <CardBody style={{overflowX:"auto"}} className={toggleState === 2 ? "content  active-content" : "d-none "}>
          {emails.map((email,index)=>(
          <ul className="list-group">
            <li className="list-group-item"><b>Email : </b>{email}</li>
          </ul>
          ))}
          </CardBody>
        </Card>
        </Col>
      </Row>
        
    </div>
  )
}

export default Contactus
