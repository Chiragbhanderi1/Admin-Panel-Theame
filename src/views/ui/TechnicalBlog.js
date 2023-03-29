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
const TechnicalBlog = () => {
  const Navigate =useNavigate();
  const [blogss, setBlog] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [update,setUpdate] =useState(false)
  const [loading,setLoading] =useState(false)
  const [blogsData, setBlogData] = useState({
    title: "",
    subtitle: "",
    details: "",
    date: "",
    img:""
  });
  const handleInputChange = (e) => {
    setBlogData({
      ...blogsData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if(!localStorage.getItem('myuser')){
      Navigate("/login")
    }
    // Fetch all blogss from the API
    fetch("https://api-p1sakfilu-chiragbhanderi1.vercel.app/gettechnicalblogs")
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
    setSelectedImg(e.target.files[0]);
  }
  const uploadImg = async()=>{
    setLoading(true)
    const formData = new FormData();
    formData.append("file", selectedImg);
    const res = await  fetch("https://api-p1sakfilu-chiragbhanderi1.vercel.app/fileevent",{
      method:"POST",
      body:formData
    })
     console.log(res);
      const json = await res.json()
      const downloadUrl = await json.downloadUrl;
      setBlogData({
        ...blogsData,
        img:downloadUrl
      })
      setLoading(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the blogs to the database with the download URLs of the files
    fetch("https://api-p1sakfilu-chiragbhanderi1.vercel.app/technicalblogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogsData),
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
    fetch(`https://api-p1sakfilu-chiragbhanderi1.vercel.app/deletetechnicalblog/${id}`, {
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
    fetch(`https://api-p1sakfilu-chiragbhanderi1.vercel.app/updatetechnicalblog/${blogsData.title}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogsData),
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
                  value={blogsData.title}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="subtitle">SubTitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={blogsData.subtitle}
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
                  value={blogsData.details}
                  onChange={handleInputChange}
                  placeholder="Details in form of paragraph"
                  type="text"
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
              <Button type='submit' style={{width:"100%"}}>{update?"Update":"Add"} Blog</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Row>
        {blogss.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.img}
              title={blg.title}
              subtitle={blg.subtitle}
              text1={blg.date}
              text2={blg.details.slice(10)}
              deletebtn ={()=>{handleDeleteBlog(blg.title)}}
              morebtn ={()=>{handleMore(blg.title)}}
              editbtn ={()=>{handleEditBlog(blg)}}
              color="dark"
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default TechnicalBlog
