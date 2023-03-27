import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
const InternshipDetails = () => {
  const [interships, setInterships] = useState([]);
  const [student,setStudent] = useState([])
  const [perks,setPerks] = useState([])
  const [detailsData,setdetailsData] = useState({
    location:"",
    exp:"",
    duration:"",
    know:"",
    mode:"",
    stippend:""
  })
  const { internshipslug } = useParams(); 
  const Navigate =useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('myuser')){
      Navigate("/login")
    }
    // Fetch all internships from the API
    fetch(`https://api-cyu8h01yw-chiragbhanderi1.vercel.app/getintership/${internshipslug}`)
    .then((res) => res.json())
    .then((data) =>{
      setInterships(data)
      setStudent(data.students)
      setPerks((data.perks || "").split("*"))
      setdetailsData({
        location:data.details.location,
        duration:data.details.duration,
        exp:data.details.exp,
        mode:data.details.mode,
        stippend:data.details.stippend ,
        know:data.details.know,
      })
    })
    .catch((err) => console.log(err));
    // eslint-disable-next-line
  },[])
  return (
    <div>
        <div className="container bg-white p-5">
            <h2 className="text-center border-bottom mb-3">{interships.title}</h2>
        <div className="row">
          <div className="col-md">
            <h5 className="text-center">{interships.subtitle}</h5>
            <h5 className="mt-3">Details :</h5>
            <ul className="list-group">
                <li className="list-group-item"><b>Duration :</b>{detailsData.duration}</li>
                <li className="list-group-item"><b>Location :</b>{detailsData.location}</li>
                <li className="list-group-item"><b>Experience Req. :</b>{detailsData.exp}</li>
                <li className="list-group-item"><b>Mode : </b>{detailsData.mode}</li>
                <li className="list-group-item"><b>Stippend :</b> {detailsData.stippend}</li>
              </ul>
            <h5 className="mt-3">Perks :</h5>
            <div >
                { perks.map((item)=>(
                    <ul className="list-group">
                        <li className="list-group-item">{item}</li>
                  </ul>
                ))}
            </div>
          </div>
          <div className="col-md" >
            <img
              src={`${interships.img}`}
              alt="Blog "
              className="img-fluid mx-auto d-block"
            />
          </div>
        </div>
        <div className="row">
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
  )
}

export default InternshipDetails
