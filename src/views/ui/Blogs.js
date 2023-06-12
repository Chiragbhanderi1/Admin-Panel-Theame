import React from 'react'
import Blog from "../../components/dashboard/Blog";
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Row, 
    Col,
    CardTitle,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
  } from "reactstrap";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    const [update,setUpdate] =useState(false)
    const [loading,setLoading] =useState(false)
    const [blogData, setBlogData] = useState({
      title: "",
      author: "",
      details:"",
      img:""
    });
    const handleInputChange = (e) => {
      setBlogData({
        ...blogData,
        [e.target.name]: e.target.value,
      });
    };
    const Navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('name')){
          Navigate("/login")
        }
        // Fetch all internships from the API
        fetch("https://api-flu5fl4i5-chiragbhanderi1.vercel.app/getblogs")
          .then((res) => res.json())
          .then((data) =>{setBlogs(data); })
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
        const res = await  fetch("https://api-flu5fl4i5-chiragbhanderi1.vercel.app/fileevent",{
          method:"POST",
          body:formData
        })
          const json = await res.json()
          const downloadUrl = await json.downloadUrl;
          setBlogData({
            ...blogData,
            img:downloadUrl
          })
          setLoading(false)
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Add the blog to the database with the download URLs of the files
        fetch("https://api-flu5fl4i5-chiragbhanderi1.vercel.app/blogs", {
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
        // Send a DELETE request to the API to delete the blog with the given ID
        fetch(`https://api-flu5fl4i5-chiragbhanderi1.vercel.app/deleteblog/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            setBlogs(blogs.filter((blog) => blog.id !== id));
            console.log(res)
          })
          .catch((err) => console.log(err));
      };
      const handleUpdateBlog = (e) => {
        e.preventDefault();
        // Send a PUT request to the API to update the blog with the given ID
        fetch(`https://api-flu5fl4i5-chiragbhanderi1.vercel.app/updateblog/${blogData.id}`, {
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
      const handleEditBlog = (blog) => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        setBlogData({
          id:blog.id,
          title: blog.title,
          author: blog.author,
          date:blog.date,
          details:blog.details
        });
        setUpdate(true);
      };
  return (
 <div>
    <Row>
      <Col lg="12">
      <Card className='container'>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-kanban me-2"> </i>
          Blogs
        </CardTitle>
        <Form onSubmit={update?handleUpdateBlog:handleSubmit} className='p-4'>
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
                <Label for="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={blogData.author}
                  onChange={handleInputChange}
                  placeholder="Author"
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
                  placeholder="Details"
                  type="text"
                />
              </FormGroup> 
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={blogData.date}
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
                  You Must Wait Unit Image is been Uploaded
                </FormText>
              </FormGroup>
              <Button type='submit' disabled={loading} style={{width:"100%"}}>{update?"Update":"Add"} Blog</Button>
            </Form>

      </Card>
      </Col>
    </Row>
    <Row>
        {blogs.map((blg, index) => (
          <Col sm="12" lg="12" xl="6" key={index}>
            <Blog
              image={blg.img}
              title={blg.title}
              subtitle={blg.author}
              text1={blg.date} 
              text2={blg.details}
              deletebtn ={()=>{handleDeleteBlog(blg.id)}}
              morebutton = "true"
              editbtn ={()=>{handleEditBlog(blg)}}
              color="dark"
            />
          </Col>
        ))}
      </Row>
  </div>
  )
}

export default Blogs
