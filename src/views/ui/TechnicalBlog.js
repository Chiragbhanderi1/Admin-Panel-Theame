import React, { useState, useEffect } from 'react';
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
  FormText,
  CardSubtitle,
  CardText,
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
const TechnicalBlog = () => {
  const Navigate =useNavigate();
  const [blogss, setBlog] = useState([]);
  // eslint-disable-next-line
  const [selectedImg, setSelectedImg] = useState([]);
  const [update,setUpdate] =useState(false)
  const [loading,setLoading] =useState(false)
  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    details: "",
    date: "",
    img:[]
  });
  const handleInputChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if(!localStorage.getItem('myuser')){
      Navigate("/login")
    }
    // Fetch all blogss from the API
    fetch("https://api-otkz60obx-chiragbhanderi1.vercel.app/gettechnicalblogs")
      .then((res) => res.json())
      .then((data) => {
        data.forEach(element => {
              const fireBaseTime = new Date(
                element.date._seconds * 1000 + element.date._nanoseconds / 1000000,
              );
              const date = fireBaseTime.toDateString();
              const atTime = fireBaseTime.toLocaleTimeString();
              element.date =(date +" "+ atTime)
          });
         setBlog(data)
        })
      .catch((err) => console.log(err));
      // eslint-disable-next-line
  }, []);
  const handleImageUpload = (e)=>{
    const uploadedFiles = (e.target.files);
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        selectedImg[file.name] = file;
      }
  }
  const uploadImg = async()=>{
    setLoading(true)
      for(const name in selectedImg){
        try {
        const formData = new FormData();
        formData.append("file", selectedImg[name]);
        const res = await  fetch("https://api-otkz60obx-chiragbhanderi1.vercel.app/fileevent",{
          method:"POST",
          body:formData
        })
        const json = await res.json()
        const downloadUrl = await json.downloadUrl;
        selectedImg.push( downloadUrl[0])
        setBlogData({
          ...blogData,
          img:selectedImg
        })
        console.log(selectedImg)
      } catch (error) {
        console.log(error)
      }
    }
    setLoading(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the blogs to the database with the download URLs of the files
    fetch("https://api-otkz60obx-chiragbhanderi1.vercel.app/technicalblogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdate(false);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteBlog = (id) => {
    // Send a DELETE request to the API to delete the blogs with the given ID
    fetch(`https://api-otkz60obx-chiragbhanderi1.vercel.app/deletetechnicalblog/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setBlog(blogss.filter((blogs) => blogs.id !== id));
      })
      .catch((err) => console.log(err));
  };
  const handleMore =(id)=>{
    Navigate(`/technicalblog/${id}`)
  }
  const handleUpdateBlog = (e) => {
    e.preventDefault();
    // Send a PUT request to the API to update the blogs with the given ID
    fetch(`https://api-otkz60obx-chiragbhanderi1.vercel.app/updatetechnicalblog/${blogData.title}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
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
  const handleEditBlog = (blogs) => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    setBlogData({
      title: blogs.title,
      subtitle: blogs.subtitle,
      details: blogs.details,
    });
    setUpdate(true);
  };
  return (
    <div>
     <Row>
      <Col>
        <Card>
          <CardTitle tag="h4" className="text-center border-bottom p-3 mb-0">
            <i className="bi bi-calendar-blogs me-2"> </i>
            Blog
          </CardTitle>
          <CardTitle tag="h6" className=" p-3 mb-0">
            <i className="bi bi-plus me-2"> </i>
            Add Blog
          </CardTitle>
          <CardBody>
            <Form onSubmit={update?handleUpdateBlog:handleSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title for a Blog"
                  value={blogData.title}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="subtitle">SubTitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={blogData.subtitle}
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
                  value={blogData.details}
                  onChange={handleInputChange}
                  placeholder="Details in form of paragraph"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="img">Image</Label>
                <div className='d-flex'>
                <Input id="img" name="img" multiple type="file" onChange={handleImageUpload}/>
                <Button onClick={uploadImg} className='ms-2'>Upload</Button>
                </div>
                <FormText>
                {loading && <p className='text-danger'>Please Wait Image is Been Uploading</p>}
                  You Must Wait Unit Image is been Uploaded
                </FormText>
              </FormGroup>
              <Button type='submit'disabled={loading} style={{width:"100%"}}>{update?"Update":"Add"} Blog</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Row>
        {blogss.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Card>
              <div className='text-center justify-content-center d-flex align-items-center p-2'>
                <iframe src={blg.img[0]} title="something" height={"200px"} width={"100%"} style={{width:"275px"}}></iframe>
              </div>
              <CardBody className="p-4">
                <CardTitle tag="h5">{blg.title}</CardTitle>
                <CardSubtitle>{blg.subtitle}</CardSubtitle>
                <CardText className="mt-3" dangerouslySetInnerHTML={{__html:blg.details}}></CardText>
                <div className="text-center">
                <Button onClick={()=>{handleEditBlog(blg)}} color="dark" className="mt-1">Edit</Button>
                <Button onClick={()=>{handleDeleteBlog(blg.id)}} color="dark" className="ms-2 mt-1">Delete</Button>
                <Button onClick={()=>{handleMore(blg.id)}} color="dark" className="ms-2  mt-1">More</Button></div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default TechnicalBlog
