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
  Table,
  Label,
  Input,
  FormText
} from "reactstrap";
import { useNavigate } from "react-router-dom";
const Courses = () => {
  const Navigate =useNavigate();
  const [loadingimg,setLoadingimg] =useState();
  const [loadingbann,setLoadingbann] =useState();
  const [loadingvid,setLoadingvid] =useState();
  const [loadingmat,setLoadingmat] =useState();
  const [loadingass,setLoadingass] =useState();
  const [courses, setCourses] = useState([]);
  // eslint-disable-next-line
  const [files, setFiles] = useState({});
  const [videoData, setVideoData] = useState({
    url:"",
    title:"",
    desc:""
  });
  // eslint-disable-next-line
  const [videoArray,setVideoArray]=useState([]);
  const [update, setUpdate] = useState(null);
  // eslint-disable-next-line
  const [materials,setMaterials] =useState({})
  const [materialArray,setMaterialArray]=useState([]);
  const [materialData, setMaterialData] = useState({
    url:"",
    title:"",
  });
  // eslint-disable-next-line
  const [error,setError] =useState([])
  // eslint-disable-next-line
  const [assignments,setAssignments] =useState({})
  const [assignmentArray,setAssignmentArray]=useState([]);
  const [assignmentData, setAssignmentData] = useState({
    url:"",
    title:"",
  });
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedBann, setSelectedBann] = useState(null);
  const [courseData, setCourseData] = useState({
    title: "",
    subtitle:"",
    details: "",
    benifits:"",
    duration: "",
    price: "",
    img:"",
    banner:"",
    category:"",
    materials:{},
    assignments:{},
    videos:{}
  });
  useEffect(() => {
    if(!localStorage.getItem('myuser')){
      Navigate("/login")
    }
    // Fetch all courses from the API
    fetch("https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/getcourses")
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
  const handleBannerUpload = (e)=>{
    setSelectedBann(e.target.files[0]);
  }
  const uploadBanner = async()=>{
   try{ 
    setLoadingbann(true)
    const formData = new FormData();
    formData.append("file", selectedBann);
    const res = await  fetch("https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/filecourses",{
      method:"POST",
      body:formData
    })
      const json = await res.json()
      const downloadUrl = await json.downloadUrl;
      setCourseData({
        ...courseData,
        banner:downloadUrl
      })
      setLoadingbann(false)}catch(error){console.log(error)}
  }
  const handleImageUpload = (e)=>{
    setSelectedImg(e.target.files[0]);
  }
  const uploadImg = async()=>{
   try{ 
    setLoadingimg(true)
    const formData = new FormData();
    formData.append("file", selectedImg);
    const res = await  fetch("https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/filecourses",{
      method:"POST",
      body:formData
    })
      const json = await res.json()
      const downloadUrl = await json.downloadUrl;
      setCourseData({
        ...courseData,
        img:downloadUrl
      })
      setLoadingimg(false)}catch(error){console.log(error)}
  }
  const handleAssignmentUpload = (e) => {
      setAssignments(e.target.files[0]);
  };
  const addAssignments=()=>{
    try{
      assignmentArray.push(assignmentData);
      setAssignmentData({
        url:"",
        title:""
      }) 
      setCourseData({...courseData,assignments:assignmentArray}) 
    }catch(error){
      setError(error)
    }
  }
  const uploadAssignment = async ()=>{
      // Upload files to the database and get their download URLs
      setLoadingass(true)
        try {
        const formData = new FormData();
        formData.append("file", assignments);
        const res = await  fetch("https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/filecourses",{
          method:"POST",
          body:formData
        })
        const json = await res.json()
        const downloadUrl = await json.downloadUrl;
        // assignments = downloadUrl[0]
        setAssignmentData({
          title:assignments.name,
          url:downloadUrl[0]
        })
      } catch (error) {
        setError(error)
      }
    setLoadingass(false)
  }
  const handleMaterialsUpload = (e) => {
    setMaterials(e.target.files[0]);
  };
  const addmaterials=()=>{
    try{
      materialArray.push(materialData);
      setMaterialData({
        url:"",
        title:""
      }) 
      setCourseData({...courseData,materials:materialArray});
    }catch(error){
      setError(error)
    }
  }
  const uploadMaterial = async ()=>{
    setLoadingmat(true)
    // Upload files to the database and get their download URLs
      try{
        const formData = new FormData();
        formData.append("file", materials);
        const res = await  fetch("https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/filecourses",{
          method:"POST",
          body:formData
        })
        const json = await res.json()
        const downloadUrl = await json.downloadUrl;
        setMaterialData({
          title:materials.name,
          url:downloadUrl[0]
        })
    }catch(error){
      setError(error)
    }
  setLoadingmat(false)
  }
  const handleVideoUpload = (e) => {
    setFiles(e.target.files[0]);
  };
  const uploadVideo = async()=>{
    setLoadingvid(true)
    try {
      const formData = new FormData();
      formData.append("file", files);
      const res = await  fetch("https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/filecourses",{
        method:"POST",
        body:formData
      })
        const json = await res.json()
        const downloadUrl = await json.downloadUrl;
        setVideoData({
          ...videoData,
          title:files.name,
          url:downloadUrl[0],
        })
        setLoadingvid(false)
    } catch (error) {
      console.log(error)
    }
  }
  const AddvideoData=()=>{
    // Upload files to the database and get their download URLs
      try{
        videoArray.push(videoData);
        setVideoData({
          url:"",
          title:"",
          desc:"",
        })
        setCourseData({...courseData,videos:videoArray})
      }catch(error){
        setError(error)
      }
  }
  const deleteVideo=(index)=>{
    const updatedArray = videoArray.filter((item, i) => i !== index);
    setVideoArray(updatedArray);
    setVideoData({
      url:"",
      title:"",
      desc:"",
    })
    setCourseData({...courseData,videos:videoArray})
  }
  const deleteMat=(index)=>{
    const updatedArray = materialArray.filter((item, i) => i !== index);
    setMaterialArray(updatedArray);
    setMaterialData({
      url:"",
      title:""
    })
    setCourseData({...courseData,materials:materialArray})
  }
  const deleteAss=(index)=>{
    const updatedArray = assignmentArray.filter((item, i) => i !== index);
    setAssignmentArray(updatedArray);
    setAssignmentData({
      url:"",
      title:""
    })
    setCourseData({...courseData,assignments:assignmentArray})
  }
  const handleVideoData=(e)=>{
    setVideoData({
      ...videoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setCourseData({
      ...courseData,
      videos:videoArray,
      materials:materialArray,
      assignments:assignmentArray
    })
    // Add the course to the database with the download URLs of the files
    fetch("https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    })
      .then((res) => {res.json()})
      .then((data) => {
        setUpdate(false);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteCourse = (id) => {
    // Send a DELETE request to the API to delete the course with the given ID
    fetch(`https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/deletecourse/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCourses(courses.filter((course) => course.id !== id));
      })
      .catch((err) => console.log(err));
  };
  const handleUpdateCourse = (e) => {
   try{ 
    e.preventDefault();
   
    // Send a PUT request to the API to update the course with the given ID
    fetch(`https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/updatecourse/${courseData.title}`, {
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
    setVideoArray(course.videos);
    setMaterialArray(course.materials);
    setAssignmentArray(course.assignments);
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
      category:course.category,
      img:course.img,
      videos:course.videos,
      materials:course.materials,
      assignments:course.assignments
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
                /></FormGroup>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={courseData.category}
                  onChange={handleInputChange}
                  type="select"
                > 
                <option disabled>Select Category</option>
                <option  value={"Data Science"}>Data Science</option>
                <option value={"IOT"}>IOT</option>
                <option value={"SEO"}>SEO</option>
                <option value={"Digital Marketing"}>Digital Marketing</option>
                <option value={"Machine Learning"}>Machine Learning</option>
                <option value={"Others"}>Others</option>
                </Input>
              </FormGroup> 
              <FormGroup>
                <Label for="details">Details</Label>
                <Input
                  id="details"
                  name="details"
                  value={courseData.details}
                  onChange={handleInputChange}
                  placeholder="Details in form of paraagraphs could contain html tags"
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
                  placeholder="Benifits in Form of paragraphs could contain html tags"
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
                <Label for="banner">Banner</Label>
                <div className='d-flex'>
                <Input id="banner" name="banner" type="file" onChange={handleBannerUpload}/>
                <Button onClick={uploadBanner} className='ms-2'>Upload</Button>
                </div>
                <FormText>
                {loadingbann && <p className='text-danger'>Please Wait Banner is Been Uploading</p>}
                  You Must Wait Until Image is been Uploaded
                </FormText>
              </FormGroup>
              {!update && <FormGroup style={{backgroundColor:"#c5e8fa"}} className="p-3 rounded">
                <Label for="videos">Video</Label>
                <div className='d-flex'>
                <Input id="videos" name="videos"  type="file" readOnly={loadingvid} onChange={handleVideoUpload} />
                <Button onClick={uploadVideo} className="ms-1">Upload</Button>
                </div>
                <FormText >
                {loadingvid && <p className='text-danger'>Please Wait Videos are Been Uploading</p>}<br/>
                </FormText>
                <Label for="desc" className="mt-1">Video Description</Label>
                <Input id="desc" name="desc" type="text" value={videoData.desc} readOnly={loadingvid} placeholder="Decription for the above video" onChange={handleVideoData}/>
                <Button onClick={AddvideoData} disabled={loadingvid} className="mt-2">Add</Button>
                {videoArray!=null && videoArray.map((videos,index)=>(
                            <CardBody style={{overflowX:"auto"}}  key={index} >
                            <Table bordered hover>
                              <tbody>                                   
                                <tr >
                                  <th scope="row">{index+1}</th>
                                  <td>{videos.title}</td>
                                  <td><a href={videos.url}> <video src={videos.url} width={"100px"} height={"100px"}/></a></td>
                                  <td>{videos.desc}</td>
                                  <td   onClick={()=>{deleteVideo(index)}} className="text-center align-middle" ><i className="bi bi-trash bg-dark text-white p-2 rounded " role="button" > </i></td>
                                </tr>                                   
                              </tbody>
                            </Table>                           
                          </CardBody>
                   ))}
              </FormGroup>}
              {!update &&<FormGroup style={{backgroundColor:"#fbfca2"}} className="rounded p-3">
                <Label for="materials">Materials</Label>
                <div className='d-flex'>
                <Input id="materials" name="materials" multiple type="file" onChange={handleMaterialsUpload}/>
                <Button onClick={uploadMaterial} className='ms-2'>Upload</Button>
                </div>
                <FormText>
                {loadingmat && <p className='text-danger'>Please Wait Materials are Been Uploading</p>}
                  You Must Wait Until Materials are been Uploaded<br/>
                </FormText>
                <Button onClick={addmaterials} disabled={loadingmat} className="mt-2">Add</Button>
                {materialArray!=null && materialArray.map((mat,index)=>(
                            <CardBody style={{overflowX:"auto"}}  key={index} >
                            <Table bordered hover>
                              <tbody>                                   
                                <tr >
                                  <th scope="row">{index+1}</th>
                                  <td>{mat.title}</td>
                                  <td><a href={mat.url}> <embed src={mat.url} width="100px" height="100px" /></a></td>
                                  <td onClick={()=>{deleteMat(index)}} className="text-center align-middle" ><i className="bi bi-trash bg-dark text-white p-2 rounded " role="button" > </i></td>
                                </tr>                                   
                              </tbody>
                            </Table>                           
                          </CardBody>
                   ))}
              </FormGroup>}
             {!update && <FormGroup  style={{backgroundColor:"#a2fcab"}} className="rounded p-3">
                <Label for="assignments">Assignments</Label>
                <div className='d-flex'>
                <Input id="assignments" name="assignments" multiple type="file" onChange={handleAssignmentUpload} />
                <Button onClick={uploadAssignment} className='ms-2'>Upload</Button>
                </div>
                <FormText>
                {loadingass && <p className='text-danger'>Please Wait Assignments are Been Uploading</p>}
                  You Must Wait Until Assignments is been Uploaded<br/>
                </FormText>
                <Button onClick={addAssignments} disabled={loadingass} className="mt-2">Add</Button>
                {assignmentArray!=null && assignmentArray.map((ass,index)=>(
                            <CardBody style={{overflowX:"auto"}}  key={index} >
                            <Table bordered hover>
                              <tbody>                                   
                                <tr >
                                  <th scope="row">{index+1}</th>
                                  <td>{ass.title}</td>
                                  <td><a href={ass.url}> <embed src={ass.url} width="100px" height="100px" /></a></td>
                                  <td onClick={()=>{deleteAss(index)}} className="text-center align-middle" ><i className="bi bi-trash bg-dark text-white p-2 rounded " role="button" > </i></td>
                                </tr>                                   
                              </tbody>
                            </Table>                           
                          </CardBody>
                   ))}
              </FormGroup>}
              <Button type="submit" disabled={loadingass || loadingimg || loadingmat || loadingvid || loadingbann}  style={{width:"100%"}}>{update?"Update":"Add"} Courses</Button>
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
