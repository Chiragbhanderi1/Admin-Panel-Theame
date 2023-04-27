import React, { useEffect, useState } from "react";
import {  Link, useNavigate, useParams } from 'react-router-dom';
import {
  CardBody,
  Table,
} from "reactstrap";
const CoursesDetails = () => {
  const [courses, setCourses] = useState([]);
  const [videos,setVideos] = useState([])
  const [materials,setMaterials] = useState({})
  const [student,setStudents] = useState([])
  const [assignments,setAssignments] = useState([])
  const { courseslug } = useParams();
  const Navigate =useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('myuser')){
      Navigate("/login")
    }
    // Fetch all internships from the API
    fetch(`https://api-otkz60obx-chiragbhanderi1.vercel.app/getcourse/${courseslug}`)
      .then((res) => res.json())
      .then((data) =>{
        setCourses(data) 
        setVideos(data.videos)
        setMaterials(data.materials) 
        setAssignments(data.assignments) 
        setStudents((data.students))
        console.log(data.videos)
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line
    },[])
    const deleteVideo =(id)=>{
      console.log(videos)
      fetch(`https://api-otkz60obx-chiragbhanderi1.vercel.app/deletecoursedata/${courses.title}/videos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setVideos(videos.filter((video) => video.id !== id));
      })
      .catch((err) => console.log(err));
    }
    const deleteMat =(id)=>{

    }
    const deleteAss =(id)=>{

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
            <h5 className="mt-3 bg-white p-2">Benifits :</h5>
            <div className="ms-5 ">                
              <div  dangerouslySetInnerHTML={{__html:courses.benifits}} ></div>      
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
          <h1 className="text-center"> Videos</h1>
          <div className="rounded" style={{backgroundColor:"#c5e8fa"}}>
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
                                  <td onClick={()=>{deleteVideo(video.id)}} className="text-center align-middle" ><i className="bi bi-trash bg-dark text-white p-2 rounded " role="button" > </i></td>
                                </tr>                                   
                              </tbody>
                            </Table>                           
                       </CardBody>            
          })}  
          </div>
          <h1 className="text-center"> Materials</h1>
          <div className="rounded" style={{backgroundColor:"#fbfca2"}}>
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
                              <td onClick={()=>{deleteMat(materials.id)}} className="text-center align-middle" ><i className="bi bi-trash bg-dark text-white p-2 rounded " role="button" > </i></td>
                            </tr>                                   
                          </tbody>
                        </Table>                           
                  </CardBody> 
          })}  
          </div>
          <h1 className="text-center"> Assignments</h1>
          <div className="rounded" style={{backgroundColor:"#a2fcab"}}>
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
                              <td onClick={()=>{deleteAss(assignment.id)}} className="text-center align-middle" ><i className="bi bi-trash bg-dark text-white p-2 rounded " role="button" > </i></td>
                            </tr>                                   
                          </tbody>
                        </Table>                           
                  </CardBody> 
          })}  
          </div>
          
          <div className="col-md justify-content-center">
            <h1 className="text-center"> Students Enrolled</h1>
            {student.length===0 && <div className="text-center">No Students Have Enrolled Yet.</div>}
            {student.map((item)=>(
              <div>
                <h5>Total No. of Students Enrolled :{student.length}</h5>
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
