import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
const CoursesDetails = () => {
  const [courses, setCourses] = useState([]);
  const [videos,setVideos] = useState([])
  const [materials,setMaterials] = useState({})
  const [details,setDetails] = useState([])
  const [benifits,setBenifits] = useState([])
  const [student,setStudents] = useState([])
  const [assignments,setAssignments] = useState([])
  const { courseslug } = useParams();
  const Navigate =useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('myuser')){
      Navigate("/login")
    }
    // Fetch all internships from the API
    fetch(`https://api-cyu8h01yw-chiragbhanderi1.vercel.app/getcourse/${courseslug}`)
      .then((res) => res.json())
      .then((data) =>{
        setCourses(data)
        setVideos(data.videos)
        setMaterials(data.materails)
        setAssignments(data.assignments)
        setDetails((data.details).split("*"))
        setBenifits((data.benifits).split("*"))
        setStudents((data.students))
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line
    },[])
  return (
    <div>
      <div className="container bg-white p-5">
            <h1 className="text-center border-bottom mb-3">{courses.title}</h1>
        <div className="row ">
          <div className="col-md">
            <h5 className="mt-3">Details :</h5>
            <div className="ms-5">
                { details.map((item)=>(
                    <div className="col-md">{item}</div>
                ))}
            </div>
            <h5 className="mt-3">Benifits :</h5>
            <div className="ms-5 ">
                { benifits.map((item)=>(
                    <div className="col-md">{item}</div>
                ))}
            </div>
          <h5 className="mt-3">Duration :</h5>
          <div className="col-md ms-5 ">{courses.duration}</div>
          <h5 className="mt-3">Price :</h5>
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
        <div className="row">

          <h1 className="text-center"> Videos</h1>
          <div className="d-flex flex-wrap justify-content-center">
          {Object.keys(videos).length ===0 && <div> No Videos to show</div>}
          {Object.keys(videos).map((key)=>{
             return <div className="m-2">
               <video width="320"  height="240" controls>
                  <source src={videos[key]} type="video/mp4"/>
                  Your browser does not support the video tag.
              </video>
              <h4 className="text-center">{key}</h4>
            </div>
          })}  
          </div>
          <h1 className="text-center"> Materails</h1>
          <div className="d-flex flex-wrap justify-content-center">
          {Object.keys(materials).length ===0 && <div> No Materails to show</div>}
          {Object.keys(materials).map((key)=>{
             return <div className="m-2">
                 {/* eslint-disable-next-line */}
                <iframe src={materials[key]}
                  id="material-frame"
                  height="500"/>
                 <h4 className="text-center">{key}</h4>
            </div>
          })}  
          </div>
          <h1 className="text-center"> Assignments</h1>
          <div className="d-flex flex-wrap justify-content-center">
          {Object.keys(assignments).length ===0 && <div> No Assignments to show</div>}
          {Object.keys(assignments).map((key)=>{
             return <div className="m-2">
                 {/* eslint-disable-next-line */}
                <iframe src={assignments[key]}
                  id="material-frame"
                  height="500"/>
                 <h4 className="text-center">{key}</h4>
            </div>
          })}  
          </div>
          <div className="col-md justify-content-center">
            <h1 className="text-center"> Students Enrolled</h1>
            {student.length===0 && <div className="text-center">No Students Have Enrolled Yet.</div>}
            {student.map((item)=>(
              <div>
                <h5>Total No. of Students Enrolled :{student.length}</h5>
              <ul class="list-group">
                <li class="list-group-item">{item}</li>
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
