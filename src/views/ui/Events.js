import React, { useState, useEffect } from 'react';
import Blog from "../../components/dashboard/Blog";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
const Events = () => {
  const Navigate =useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedBann, setSelectedBann] = useState(null);
  const [update,setUpdate] =useState(false)
  const [loading,setLoading] =useState(false)
  const [loadingbann,setLoadingbann] =useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    subtitle: "",
    details: "",
    date: "",
    price: "",
    img:"",
    banner:""
  });
  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if(!localStorage.getItem('myuser')){
      Navigate("/login")
    }
    // Fetch all events from the API
    fetch("https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/getevents")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
      // eslint-disable-next-line
  }, []);
  const handleImageUpload = (e)=>{
    setSelectedImg(e.target.files[0]);
  }
  const uploadImg = async()=>{
    setLoading(true)
    const formData = new FormData();
    formData.append("file", selectedImg);
    const res = await  fetch("https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/fileevent",{
      method:"POST",
      body:formData
    })
     console.log(res);
      const json = await res.json()
      const downloadUrl = await json.downloadUrl;
      setEventData({
        ...eventData,
        img:downloadUrl
      })
      setLoading(false)
  }
  const handleBannerUpload = (e)=>{
    setSelectedBann(e.target.files[0]);
  }
  const uploadBanner = async()=>{
    setLoadingbann(true)
    const formData = new FormData();
    formData.append("file", selectedBann);
    const res = await  fetch("https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/fileevent",{
      method:"POST",
      body:formData
    })
     console.log(res);
      const json = await res.json()
      const downloadUrl = await json.downloadUrl;
      setEventData({
        ...eventData,
        banner:downloadUrl
      })
      setLoadingbann(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the event to the database with the download URLs of the files
    fetch("https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdate(false);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteEvent = (id) => {
    // Send a DELETE request to the API to delete the event with the given ID
    fetch(`https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/deleteevent/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setEvents(events.filter((event) => event.id !== id));
      })
      .catch((err) => console.log(err));
  };
  const handleMore =(id)=>{
    Navigate(`/events/${id}`)
  }
  const handleUpdateEvent = (e) => {
    e.preventDefault();
    // Send a PUT request to the API to update the event with the given ID
    fetch(`https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/updateevent/${eventData.title}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((res) =>{ 
        if(Response.status ===200){
          res.json()
        }
      })
      .then((data) => {
        setUpdate(false);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log(err));
  };
  const handleEditEvent = (event) => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    setEventData({
      title: event.title,
      subtitle: event.subtitle,
      details: event.details,
      price: event.price,
      date:event.date
    });
    setUpdate(true);
  };
  return (
    <div>
     <Row>
      <Col>
        <Card>
          <CardTitle tag="h4" className="text-center border-bottom p-3 mb-0">
            <i className="bi bi-calendar-event me-2"> </i>
            Events
          </CardTitle>
          <CardTitle tag="h6" className=" p-3 mb-0">
            <i className="bi bi-plus me-2"> </i>
            Add Events
          </CardTitle>
          <CardBody>
            <Form onSubmit={update?handleUpdateEvent:handleSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title for a Event"
                  value={eventData.title}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="subtitle">SubTitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={eventData.subtitle}
                  onChange={handleInputChange}
                  placeholder="SubTitle"
                  type="text"
                />
              </FormGroup> 
              <FormGroup>
                <Label for="details">Details</Label>
                <Input
                  id="details"
                  name="details"
                  value={eventData.details}
                  onChange={handleInputChange}
                  placeholder="Details in form of paragraph"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  value={eventData.price}
                  onChange={handleInputChange}
                  placeholder="Price For Event Entry"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={eventData.date}
                  onChange={handleInputChange}
                  // min={new Date().toISOString().split('T')[0]}
                />
              </FormGroup>
              <FormGroup>
                <Label for="img">Image</Label>
                <div className='d-flex'>
                <Input id="img" name="img" type="file" onChange={handleImageUpload}/>
                <Button onClick={uploadImg} className='ms-2'>Upload</Button>
                </div>
                <FormText>
                {loading && <p className='text-danger'>Please Wait Image is Been Uploading</p>}
                  You Must Wait Unit Image is been Uploaded
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label for="banner">Banner</Label>
                <div className='d-flex'>
                <Input id="banner" name="banner" type="file" onChange={handleBannerUpload}/>
                <Button onClick={uploadBanner} className='ms-2'>Upload</Button>
                </div>
                <FormText>
                {loadingbann && <p className='text-danger'>Please Wait Image is Been Uploading</p>}
                  You Must Wait Unit Image is been Uploaded
                </FormText>
              </FormGroup>
              <Button type='submit' disabled={loading || loadingbann} style={{width:"100%"}}>{update?"Update":"Add"} Event</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Row>
        {events.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.img}
              title={blg.title}
              subtitle={blg.subtitle}
              text1={blg.date}
              text2={blg.details}
              deletebtn ={()=>{handleDeleteEvent(blg.title)}}
              morebtn ={()=>{handleMore(blg.title)}}
              editbtn ={()=>{handleEditEvent(blg)}}
              color="dark"
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Events
