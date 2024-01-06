// import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import {  Link, useNavigate, useParams } from 'react-router-dom';
import {
  CardBody,
  Button,
  Table, Modal, ModalHeader, ModalBody, ModalFooter,Input,Label,FormGroup
} from "reactstrap"; 
const CoursesDetails = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showaddModal, setShowaddModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showaddAssModal, setShowaddAssModal] = useState(false);
  const [showaddFaqModal, setShowaddFaqModal] = useState(false);
  const [showaddMatModal, setShowaddMatModal] = useState(false);
  const [videos,setVideos] = useState([])
  const [faqs,setFaqs] = useState([])
  const [materials,setMaterials] = useState({})
  const [student,setStudents] = useState([])
  const [loadingvid,setLoadingvid] =useState();
  const [assignments,setAssignments] = useState([])
  const [files, setFiles] = useState({});
  const [materialData, setMaterialData] = useState({
    url:"",
    title:"",
  });
  const [videoData ,setVideoData] = useState({
    url:"",
    title:"",
    desc:""
  });
  const [faqData ,setFaqData] = useState({
    answer:"",
    question:""
  });
  const [assignmentData, setAssignmentData] = useState({
    url:"",
    title:"",
  });
  const { courseslug } = useParams();
  const Navigate =useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('name')){
      Navigate("/login")
    }
    // Fetch all internships from the API
    fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getcourse/${courseslug}`)
      .then((res) => res.json())
      .then((data) =>{
        setCourses(data) 
        setVideos(data.videos)
        setMaterials(data.materials) 
        setAssignments(data.assignments) 
        setFaqs(data.faqs) 
        setStudents((data.students))
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line
    },[])
  const handleButtonClick = (video) => {
    setVideoData(video);
    setShowModal(!showModal);
  };
  const handleFaqClick = (faq) => {
    setFaqData(faq);
    setShowFaqModal(!showFaqModal);
  };
  const handleaddButton = () => {
    setShowaddModal(!showaddModal);
  };
  const deleteVideo =(id)=>{
    fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/deletecoursedata/${courses.title}/videos/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setVideos(videos.filter((video) => video.id !== id));
    })
    .catch((err) => console.log(err));
  }
  const deleteFaq =(id)=>{
    fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/deletecoursedata/${courses.title}/faqs/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setFaqs(faqs.filter((faq) => faq.id !== id));
    })
    .catch((err) => console.log(err));
  }
  const deleteMat =(id)=>{
    fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/deletecoursedata/${courses.title}/materials/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setMaterials(materials.filter((material) => material.id !== id));
    })
    .catch((err) => console.log(err));
  }
  const deleteAss =(id)=>{
    fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/deletecoursedata/${courses.title}/assignments/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setAssignments(assignments.filter((assignment) => assignment.id !== id));
    })
    .catch((err) => console.log(err));
  }
  const uploadVideo = async()=>{
    setLoadingvid(true)
    try {
      const formData = new FormData();
      formData.append("file", files);
      const res = await  fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/filecourses",{
        method:"POST",
        body:formData
      })
        const json = await res.json()
        const downloadUrl = await json.downloadUrl;
        setVideoData({
          ...videoData,
          title:files.name,
          url:downloadUrl,
        })
        setFiles({})
        setLoadingvid(false)
    } catch (error) {
      console.log(error)
    }
  }
  const addvideos =(e)=>{
  // Add the course to the database with the download URLs of the files
  fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/addcoursedata/${courses.title}/videos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(videoData),
  })
    .then((res) => {res.json()})
    .then((data) => {
      setShowaddModal(!showaddModal);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    })
    .catch((err) => console.log(err));
  }
  const addfaqs =(e)=>{
  // Add the course to the database with the download URLs of the files
  fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/addcoursedata/${courses.title}/faqs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(faqData),
  })
    .then((res) => {res.json()})
    .then((data) => {
      setShowaddFaqModal(!showaddFaqModal);
      faqs.push(faqData);
      setFaqData({
        question:"",
        answer:""
      })
      // eslint-disable-next-line no-restricted-globals
      // location.reload();
    })
    .catch((err) => console.log(err));
  }
  const addass =()=>{
    // Add the course to the database with the download URLs of the files
    fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/addcoursedata/${courses.title}/assignments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignmentData),
    })
      .then((res) => {res.json()})
      .then((data) => {
        setShowaddAssModal(!showaddAssModal);         
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log(err));
  }
  const addmat =()=>{
      // Add the course to the database with the download URLs of the files
    fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/addcoursedata/${courses.title}/materials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(materialData),
    })
      .then((res) => {res.json()})
      .then((data) => {
        setShowaddModal(!showaddModal);
        
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log(err));
  }
  const openvideomodal =(item)=>{
    setShowaddModal(!showaddModal);
  }
  const updateVideo =(e)=>{
    setVideoData({
      ...videoData,
      [e.target.name] : e.target.value
    })
  }
  const updateFaq =(e)=>{
    setFaqData({
      ...faqData,
      [e.target.name] : e.target.value
    })
  }
  const editVideo =()=>{
    try{        
      // Send a PUT request to the API to update the course with the given ID
      fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/updatecoursedata/${courses.title}/videos/${videoData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      })
        .then((res) =>{ 
          if(Response.status ===200){
            res.json()
          }
        })
        .then((data) => {
          setShowModal(!showModal);
          setVideoData({
            title:"",
            desc:"",
            url:""
          })
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        })
        .catch((err) => console.log(err));
      }catch(error){alert(error)}
    }
  const editFaq =()=>{
    try{        
      // Send a PUT request to the API to update the course with the given ID
      fetch(`https://api-cnn5jio2q-chiragbhanderi1.vercel.app/updatecoursedata/${courses.title}/faqs/${faqData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faqData),
      })
        .then((res) =>{ 
          if(Response.status ===200){
            res.json()
          }
        })
        .then((data) => {
          setShowFaqModal(!showFaqModal);
          setFaqData({
            question:"",
            answer:""
          })
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        })
        .catch((err) => console.log(err));
      }catch(error){alert(error)}
    }
  const uploadMaterial = async ()=>{
    setLoadingvid(true)
    // Upload files to the database and get their download URLs
      try{
        const formData = new FormData();
        formData.append("file", files);
        const res = await  fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/filecourses",{
          method:"POST",
          body:formData
        })
        const json = await res.json()
        const downloadUrl = await json.downloadUrl;
        setMaterialData({
          title:files.name,
          url:downloadUrl
        })
        setFiles({})
    }catch(error){
      console.log(error)
    }
  setLoadingvid(false)
  }
  const uploadAssignment = async ()=>{
    // Upload files to the database and get their download URLs
    setLoadingvid(true)
      try {
      const formData = new FormData();
      formData.append("file", files);
      const res = await  fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/filecourses",{
        method:"POST",
        body:formData
      })
      const json = await res.json()
      const downloadUrl = await json.downloadUrl;
      // assignments = downloadUrl
      setAssignmentData({
        title:files.name,
        url:downloadUrl
      })
    } catch (error) {
      console.log(error)
    }
  setLoadingvid(false)
}
  return (
    <div>
      <div className="container bg-white p-5">
        <img src={courses.banner} width={"100%"} alt="banner"/>
            <h1 className="text-center border-bottom mb-3">{courses.title}</h1>
        <div className="row ">
          <div className="col-md">
            <h4>Category : {courses.category}</h4>
            <h5 className="mt-3 bg-white p-2">Details :</h5>
            <div className="ms-5">
              <div  dangerouslySetInnerHTML={{__html:courses.details}} ></div>
            </div>
            <h5 className="mt-3 bg-white p-2">Benefits :</h5>
            <div className="ms-5 ">                
              <div  dangerouslySetInnerHTML={{__html:courses.benefits}} ></div>      
            </div>
          <h5 className="mt-3 bg-white p-2">Duration :</h5>
          <div className="col-md ms-5 ">{courses.duration}</div>
          <h5 className="mt-3 bg-white p-2">Price :</h5>
          <div className="col-md ms-5 ">{courses.price}</div>
          </div>
          <div className="col-md" >
            <img
              src={`${courses.img}`}
              alt="Blog "
              className="img-fluid mx-auto d-block"
            />
          </div>
        </div>
        <div className="row " >
          <h1 className="text-center mt-4"> Videos</h1>
          <div>
          <Button className="float-end p- mb-1" style={{width:"max-content"}}  onClick={()=>{openvideomodal()}}>
            <i className="bi bi-plus me-2"> </i>
            Add Videos
          </Button>
          </div>
          <div className="rounded" style={{backgroundColor:"#ededed"}}>
          {( !Array.isArray(videos) || videos.length === 0) && <div> No Videos to show</div>}
          {Array.isArray(videos) && videos.map((video,index)=>{
             return  <CardBody style={{overflowX:"auto", padding:"0"}}   key={index} >
                            <Table bordered hover className="table table-bordered ">
                              <tbody className="p-5">                                   
                                <tr className="table-light ">
                                  <th scope="row" className="align-middle">{index+1}</th>
                                  <td className="align-middle">{video.title}</td>
                                   <td> 
                                    <video width="320"  height="240" controls><source src={video.url} type="video/mp4"/>
                                      Your browser does not support the video tag.
                                    </video>
                                    </td>
                                  <td className="align-middle">{video.desc}</td>
                                  <td  className="text-center align-middle" >
                                    <i className="bi bi-trash bg-dark text-white p-2 m-1 rounded " onClick={()=>{deleteVideo(video.id)}} role="button" > </i>
                                    <i className="bi bi-pencil-square bg-dark text-white p-2 m-1 rounded " onClick={()=>{handleButtonClick(video)}} role="button" > </i>
                                  </td>
                                </tr>                                   
                              </tbody>
                            </Table>                           
                       </CardBody>            
          })}  
          </div>
          <h1 className="text-center mt-4"> Materials</h1>
          <div>
          <Button className="float-end p- mb-1" style={{width:"max-content"}}  onClick={()=>{setShowaddMatModal(!showaddMatModal)}}>
            <i className="bi bi-plus me-2"> </i>
            Add Materials
          </Button>
          </div>
          <div className="rounded" style={{backgroundColor:"#ededed"}}>
          {(!Array.isArray(materials) || materials.length ===0) && <div> No Materials to show</div>}
          {Array.isArray(materials) && materials.map((materials,index)=>{
             return <CardBody style={{overflowX:"auto", padding:"0"}}  key={index} >
                        <Table bordered hover>
                          <tbody>                                   
                            <tr className="table-light">
                              <th scope="row" className="align-middle">{index+1}</th>
                              <td className="align-middle">{materials.title}</td>
                              <td> <iframe src={materials.url} id="material-frame" height="200" title={materials.title}/></td>
                              <td className="text-center align-middle"><Link to={materials.url}><button className="btn btn-dark" >Open </button></Link></td>
                              <td className="text-center align-middle" >
                                <i  onClick={()=>{deleteMat(materials.id)}}  className="bi bi-trash bg-dark text-white p-2 rounded m-1 " role="button" > </i>
                              </td>
                            </tr>                                   
                          </tbody>
                        </Table>                           
                  </CardBody> 
          })}  
          </div>
          <h1 className="text-center mt-4"> Assignments</h1>
          <div>
          <Button className="float-end p- mb-1" style={{width:"max-content"}}  onClick={()=>{setShowaddAssModal(!showaddAssModal)}}>
            <i className="bi bi-plus me-2"> </i>
            Add Assignments
          </Button>
          </div>
          <div className="rounded mt-2" style={{backgroundColor:"#ededed"}}>
          {(!Array.isArray(assignments) || assignments.length ===0 )&& <div> No Assignments to show</div>}
          {Array.isArray(assignments) && assignments.map((assignment,index)=>{
             return <CardBody style={{overflowX:"auto", padding:"0"}}  key={index} >
                        <Table bordered hover>
                          <tbody>                                   
                            <tr className="table-light">
                              <th scope="row" className="align-middle">{index+1}</th>
                              <td className="align-middle">{assignment.title}</td>
                              <td> <iframe src={assignment.url} id="material-frame" height="200" title={assignment.title}/></td>
                              <td className="text-center align-middle"><Link to={assignment.url}><button className="btn btn-dark" >Open </button></Link></td>
                              <td className="text-center align-middle" >
                                <i onClick={()=>{deleteAss(assignment.id)}}  className="bi bi-trash bg-dark text-white p-2 m-1 rounded " role="button" > </i>
                              </td>
                            </tr>                                   
                          </tbody>
                        </Table>                           
                  </CardBody> 
          })}  
          </div>
          <h1 className="text-center mt-4"> FAQs</h1>
          <div>
          <Button className="float-end p- mb-1" style={{width:"max-content"}}  onClick={()=>{setShowaddFaqModal(!showaddFaqModal)}}>
            <i className="bi bi-plus me-2"> </i>
            Add Questions
          </Button>
          </div>
          <div className="rounded mt-2" style={{backgroundColor:"#ededed"}}>
          {(!Array.isArray(faqs) || faqs.length ===0 )&& <div> No Questions to show</div>}
         <div className="accordion" id="accordionExample">
          {Array.isArray(faqs) && faqs.map((faq,index)=>{
             return  <div className="accordion-item" key={index}>
               <h2 className="accordion-header" id={`heading${index}`}>
                 <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                  Question {index+1}: {faq.question}
                  <i onClick={()=>{deleteFaq(faq.id)}}  className="bi bi-trash bg-dark text-white p-2 ms-4  rounded " role="button" > </i>
                  <i className="bi bi-pencil-square bg-dark text-white p-2 m-1 rounded " onClick={()=>{handleFaqClick(faq)}} role="button" > </i>
                 </button>
               </h2>
               <div id={`collapse${index}`} className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                 <div className="accordion-body">
                  Answer : {faq.answer}
                 </div>
               </div>
             </div>
          })}  
           </div>
          </div>
          <Modal isOpen={showFaqModal} toggle={handleFaqClick}>
            <ModalHeader toggle={handleFaqClick}>Update Question</ModalHeader>
            <ModalBody>
              <FormGroup className="mt-2">
                <Label for="question">Question</Label>
                <Input id="question" name="question" type="text" value={faqData.question} onChange={updateFaq}/>
              </FormGroup>
              <FormGroup className="mt-2">
                <Label for="answer">Answer</Label>
                <Input id="answer" name="answer" type="text" value={faqData.answer} onChange={updateFaq}/>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="dark" onClick={()=>{editFaq()}}>
                Update
              </Button>
              <Button color="secondary" onClick={handleFaqClick}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={showModal} toggle={handleButtonClick}>
            <ModalHeader toggle={handleButtonClick}>{videoData.title}</ModalHeader>
            <ModalBody>
              <iframe src={videoData.url} id="material-frame" className="align-middle" height="200" title={videoData.title}/>
              <FormGroup className="mt-2">
              <Label for="desc">Description</Label>
              <Input id="desc" name="desc" type="text" value={videoData.desc} onChange={updateVideo}/>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="dark" onClick={()=>{editVideo()}}>
                Update
              </Button>{' '}
              <Button color="secondary" onClick={handleButtonClick}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={showaddModal} toggle={handleaddButton}>
            <ModalHeader toggle={handleaddButton}>Add Video</ModalHeader>
            <ModalBody>
              <FormGroup className="mt-2">
              <Label for="videos">Video</Label>
                <div className='d-flex'>
                <Input id="videos" name="videos"  type="file" onChange={(e)=>{setFiles(e.target.files[0]);}} />
                <Button onClick={uploadVideo} className="ms-1">Upload</Button>
                </div>
              <Label for="desc">Description</Label>
              <Input id="desc" name="desc" type="text" readOnly={loadingvid} value={videoData.desc} onChange={updateVideo}/>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="dark" disabled={loadingvid} onClick={()=>{addvideos()}}>
                Add
              </Button>{' '}
              <Button color="secondary" onClick={handleaddButton}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={showaddMatModal} toggle={()=>{setShowaddMatModal(!showaddMatModal);}}>
            <ModalHeader toggle={()=>{setShowaddMatModal(!showaddMatModal);}}>Add Material</ModalHeader>
            <ModalBody>
              <FormGroup className="mt-2">
              <Label for="material">Material</Label>
                <div className='d-flex'>
                <Input id="material" name="material"  type="file" onChange={(e)=>{setFiles(e.target.files[0]);}} />
                <Button onClick={uploadMaterial} className="ms-1">Upload</Button>
                </div>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="dark" disabled={loadingvid} onClick={()=>{addmat()}}>
                Add
              </Button>{' '}
              <Button color="secondary" onClick={()=>{setShowaddMatModal(!showaddMatModal);}}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={showaddFaqModal} toggle={()=>{setShowaddFaqModal(!showaddFaqModal);}}>
            <ModalHeader toggle={()=>{setShowaddFaqModal(!showaddFaqModal);}}>Add Question</ModalHeader>
            <ModalBody>
              <FormGroup className="mt-2">
                <Label for="question">Question</Label>
                <Input id="question" name="question"  type="text" onChange={updateFaq} />
              </FormGroup>
              <FormGroup className="mt-2">
                <Label for="answer">Answer</Label>
                <Input id="answer" name="answer"  type="text" onChange={updateFaq} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="dark"  onClick={()=>{addfaqs()}}>
                Add
              </Button>{' '}
              <Button color="secondary" onClick={()=>{setShowaddFaqModal(!showaddFaqModal);}}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={showaddAssModal} toggle={()=>{setShowaddAssModal(!showaddAssModal);}}>
            <ModalHeader toggle={()=>{setShowaddAssModal(!showaddAssModal);}}>Add Assignment</ModalHeader>
            <ModalBody>
              <FormGroup className="mt-2">
              <Label for="material">Assignment</Label>
                <div className='d-flex'>
                <Input id="material" name="material"  type="file" onChange={(e)=>{setFiles(e.target.files[0]);}} />
                <Button onClick={uploadAssignment} className="ms-1">Upload</Button>
                </div>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="dark" disabled={loadingvid} onClick={()=>{addass()}}>
                Add
              </Button>{' '}
              <Button color="secondary" onClick={()=>{setShowaddAssModal(!showaddAssModal);}}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <div className="col-md mt-4 justify-content-center">
            <h1 className="text-center"> Students Enrolled</h1>
            {student.length===0 && <div className="text-center">No Students Have Enrolled Yet.</div>}
            <h5>Total No. of Students Enrolled :{student.length}</h5>
            {student.map((item)=>(
              <div>
              <ul className="list-group">
                <li className="list-group-item">{item}</li>
              </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetails;
