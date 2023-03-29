import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
const EventsDetails = () => {
  const [events, setEvents] = useState([]);
  const [student,setStudent] = useState([])
  const { eventslug } = useParams();
  const Navigate =useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('myuser')){
      Navigate("/login")
    }
    // Fetch all internships from the API
    fetch(`https://api-1i547ey3k-chiragbhanderi1.vercel.app/getevent/${eventslug}`)
    .then((res) => res.json())
    .then((data) =>{
      setEvents(data)
      setStudent(data.students)
      console.log(data)
    })
    .catch((err) => console.log(err));
    // eslint-disable-next-line
  },[])
  return (
    <div>
      <div className="container bg-white">
            <h1 className="text-center border-bottom mb-3">{events.title}</h1>
        <div className="row">
          <div className="col-md">
            <h5 className="mt-3 bg-white p-2">Details :</h5>
            <div className="ms-5">
               <p>{events.details}</p>
            </div>
          <h5 className="mt-3 bg-white p-2">Date :</h5>
          <div className="col-md ms-5 ">{events.date}</div>
          <h5 className="mt-3 bg-white p-2">Price :</h5>
          <div className="col-md ms-5 ">{events.price}</div>
          </div>
          <div className="col-md" >
            <img
              src={`${events.img}`}
              alt="Blog "
              className="img-fluid mx-auto d-block"
            />
          </div>
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
  );
};

export default EventsDetails
    