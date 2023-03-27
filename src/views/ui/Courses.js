import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
const Courses = () => {
  const Navigate =useNavigate();
  const [loadingimg,setLoadingimg] =useState();
  const [loadingvid,setLoadingvid] =useState();
  const [loadingmat,setLoadingmat] =useState();
  const [loadingass,setLoadingass] =useState();
  const [courses, setCourses] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(0);
  // eslint-disable-next-line
  const [files, setFiles] = useState({});
  const [update, setUpdate] = useState(null);
  // eslint-disable-next-line
  const [fileUrls,setfileUrls] =useState([]);
  // eslint-disable-next-line
  const [materails,setMaterails] =useState({})
  // eslint-disable-next-line
  const [error,setError] =useState([])
  // eslint-disable-next-line
  const [materailsUrls, setMaterailsUrls] = useState([])
  // eslint-disable-next-line
  const [assignments,setAssignments] =useState({})
  // eslint-disable-next-line
  const [assignmentsUrls, setAssignmentsUrls] = useState([])
  const [selectedImg, setSelectedImg] = useState(null);
  const [courseData, setCourseData] = useState({
    title: "",
    subtitle:"",
    details: "",
    benifits:"",
    duration: "",
    price: "",
    img:"",
    materails:{},
    assignments:{},
    videos:{}
  });
  useEffect(() => {
    if(!localStorage.getItem('myuser')){
      Navigate("/login")
    }
    // Fetch all courses from the API
    fetch("https://api-cyu8h01yw-chiragbhanderi1.vercel.app/getcourses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.log(err));
      // eslint-disable-next-line
  }, []);
  const handleInputChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageUpload = (e)=>{
    setSelectedImg(e.target.files[0]);
  }
  const uploadImg = async()=>{
   try{ 
    setLoadingimg(true)
    const formData = new FormData();
    formData.append("file", selectedImg);
    const res = await  fetch("https://api-cyu8h01yw-chiragbhanderi1.vercel.app/filecourses",{
      method:"POST",
      body:formData
    })
     console.log(res);
      const json = await res.json()
      const downloadUrl = await json.downloadUrl;
      setCourseData({
        ...courseData,
        img:downloadUrl
      })
      setLoadingimg(false)
      setIsButtonDisabled(isButtonDisabled+1);}catch(error){console.log(error)}
  }
  const handleAssignmentUpload = (e) => {
      const uploadedFiles = (e.target.files);
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        assignments[file.name] = file;
      }
  };
  const uploadAssignment = async ()=>{
      // Upload files to the database and get their download URLs
      setLoadingass(true)
      for(const name in assignments){
        try {
          const formData = new FormData();
        formData.append("file", assignments[name]);
        const res = await  fetch("https://api-cyu8h01yw-chiragbhanderi1.vercel.app/filecourses",{
          method:"POST",
          body:formData
        })
        console.log(res);
        const json = await res.json()
        const downloadUrl = await json.downloadUrl;
        assignments[name] = downloadUrl[0]
        setCourseData({
          ...courseData,
          assignments:assignments
        })
      } catch (error) {
        setError(error)
      }
    }
    setLoadingass(false)
  }
  const handleMaterailsUpload = (e) => {
    const uploadedFiles = (e.target.files);
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      materails[file.name] = file;
    }
  };
  const uploadMaterail = async ()=>{
    setLoadingmat(true)
    // Upload files to the database and get their download URLs
    for(const name in materails){
      try{const formData = new FormData();
      formData.append("file", materails[name]);
      const res = await  fetch("https://api-cyu8h01yw-chiragbhanderi1.vercel.app/filecourses",{
        method:"POST",
        body:formData
      })
      console.log(res);
      const json = await res.json()
      const downloadUrl = await json.downloadUrl;
        console.log("done");
        materails[name] = downloadUrl[0]
        setCourseData({
          ...courseData,
          materails:materails
        })
        setIsButtonDisabled(isButtonDisabled+1);
    }catch(error){
      setError(error)
    }
 }
  setLoadingmat(false)
  }
  const handleVideoUpload = (e) => {
    const uploadedFiles = (e.target.files);
    for (let i = 0; i < uploadedFiles.length; i++) {
      const filename = uploadedFiles[i];
      files[filename.name] = filename;
    }
  };
  const uploadVideo = async ()=>{
    setLoadingvid(true)
    // Upload files to the database and get their download URLs
    for(const name in files){
      try{const formData = new FormData();
      formData.append("file", files[name]);
      const res = await  fetch("https://api-cyu8h01yw-chiragbhanderi1.vercel.app/filecourses",{
        method:"POST",
        body:formData
      })
       console.log(res);
        const json = await res.json()
        const downloadUrl = await json.downloadUrl;
        files[name] = downloadUrl[0]
        console.log("done");
        setCourseData({
          ...courseData,
          videos:files
        })
      }catch(error){
        setError(error)
      }
    }
    setLoadingvid(false)
  }
  const handleAddCourse = async (e) => {
    console.log(courseData)
    e.preventDefault();
    // Add the course to the database with the download URLs of the files
    fetch("https://api-cyu8h01yw-chiragbhanderi1.vercel.app/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdate(false);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteCourse = (id) => {
    // Send a DELETE request to the API to delete the course with the given ID
    fetch(`https://api-cyu8h01yw-chiragbhanderi1.vercel.app/deletecourse/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCourses(courses.filter((course) => course.id !== id));
      })
      .catch((err) => console.log(err));
  };
  const handleUpdateCourse = (e) => {
   try{ e.preventDefault();
    // Send a PUT request to the API to update the course with the given ID
    fetch(`https://api-cyu8h01yw-chiragbhanderi1.vercel.app/updatecourse/${courseData.title}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
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
    }catch(error){alert(error)}
  };
  const handleMore =(id) =>{
    Navigate(`/courses/${id}`)
  }
  const handleEditCourse = (course) => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    setCourseData({
      id: course.title,
      title: course.title,
      subtitle: course.subtitle,
      details: course.details,
      benifits: course.benifits,
      price: course.price,
      duration: course.duration,
      img:course.img,
      videos:course.videos,
      assignments:course.assignments,
      materails:course.materails
    });
    setUpdate(true);
  };
  return (
    <div>
           <Row>
      <Col>
        <Card>
          <CardTitle tag="h4" className="text-center border-bottom p-3 mb-0">
            <i className="bi bi-book me-2"> </i>
            Courses
          </CardTitle>
          <CardTitle tag="h6" className=" p-3 mb-0">
            <i className="bi bi-plus me-2"> </i>
            Add Courses
          </CardTitle>
          <CardBody>
            <Form onSubmit={update?handleUpdateCourse:handleAddCourse}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title of a Courses"
                  value={courseData.title}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="subtitle">SubTitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  placeholder="SubTitle"
                  value={courseData.subtitle}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormGroup> 
              <FormGroup>
                <Label for="details">Details</Label>
                <Input
                  id="details"
                  name="details"
                  value={courseData.details}
                  onChange={handleInputChange}
                  placeholder="Details in form of points, seprated by '*'"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="benifits">Benifits</Label>
                <Input
                  id="benifits"
                  name="benifits"
                  value={courseData.benifits}
                  onChange={handleInputChange}
                  placeholder="Benifits in form of points, seprated by '*'"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={courseData.duration}
                  onChange={handleInputChange}
                  placeholder="Duration of Course"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  value={courseData.price}
                  onChange={handleInputChange}
                  placeholder="Price of Course"
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
                {loadingimg && <p className='text-danger'>Please Wait Image is Been Uploading</p>}
                  You Must Wait Until Image is been Uploaded
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label for="videos">Videos</Label>
                <div className='d-flex'>
                <Input id="videos" name="videos" multiple type="file" onChange={handleVideoUpload} />
                <Button onClick={uploadVideo} className='ms-2'>Upload</Button>
                </div>
                <FormText>
                {loadingvid && <p className='text-danger'>Please Wait Videos are Been Uploading</p>}
                  You Must Wait Until Videos are been Uploaded
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label for="materails">Materials</Label>
                <div className='d-flex'>
                <Input id="materails" name="materails" multiple type="file" onChange={handleMaterailsUpload}/>
                <Button onClick={uploadMaterail} className='ms-2'>Upload</Button>
                </div>
                <FormText>
                {loadingmat && <p className='text-danger'>Please Wait Materials are Been Uploading</p>}
                  You Must Wait Until Materials are been Uploaded
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label for="assignments">Assignments</Label>
                <div className='d-flex'>
                <Input id="assignments" name="assignments" multiple type="file" onChange={handleAssignmentUpload} />
                <Button onClick={uploadAssignment} className='ms-2'>Upload</Button>
                </div>
                <FormText>
                {loadingass && <p className='text-danger'>Please Wait Assignments are Been Uploading</p>}
                  You Must Wait Until Assignments is been Uploaded
                </FormText>
              </FormGroup>
              <Button type="submit"   style={{width:"100%"}}>{update?"Update":"Add"} Courses</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Row>
        {courses.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.img}
              title={blg.title}
              subtitle={blg.subtitle}
              text1={blg.details}
              text2={blg.price}
              deletebtn ={()=>{handleDeleteCourse(blg.title)}}
              morebtn ={()=>{handleMore(blg.title)}}
              editbtn ={()=>{handleEditCourse(blg)}}
              color="dark"
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Courses
