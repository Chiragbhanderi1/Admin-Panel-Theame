import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
const TechnicalBlogDetails = () => {
  const [blogs, setBlogs] = useState([]);
  const [image, setImage] = useState([]);
  const { blogslug } = useParams();
  const Navigate =useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('myuser')){
      Navigate("/login")
    }
    // Fetch all internships from the API
    fetch(`https://api-23jv80idk-chiragbhanderi1.vercel.app/gettechnicalblog/${blogslug}`)
    .then((res) => res.json())
    .then((data) =>{
            const fireBaseTime = new Date(
              data.date._seconds * 1000 + data.date._nanoseconds / 1000000,
            );
            const date = fireBaseTime.toDateString();
            const atTime = fireBaseTime.toLocaleTimeString();
            data.date =(date +" "+ atTime)
       setBlogs(data);
       setImage(data.img[0])
    })
    .catch((err) => console.log(err));
    // eslint-disable-next-line
  },[])
  return (
    <div>
      <div className="container bg-white">
            <h1 className="text-center border-bottom mb-3">{blogs.title}</h1>
        <div className="row">
          <div className="col-md">
            <h5 className="text-center">{blogs.subtitle}</h5>
          <h5 className="mt-3 bg-white p-2">Date :</h5>
          <div className="col-md ms-5 ">{blogs.date}</div>
            <h5 className="mt-3 bg-white p-2">Details :</h5>
            <div className="ms-5">
               <p>{blogs.details}</p>
            </div>
          </div>
          <div className="col-md wrap" >
           {(image.includes('.mp4')) && <iframe
              src={`${blogs.img[0]}`}
              alt="Blog " 
              className="img-fluid mx-auto d-block frame"
              width={"100%"} 
              frameborder='0' 
              scrolling='no'
              height={"100%"}
              title="someting"
            />}
            {(!image.includes('.mp4')) &&<img
              src={`${image}`}
              alt="Blog"
              className="img-fluid mx-auto d-block frame"
              width={"100%"} 
              height={"100%"}
            />}
          </div>
        </div>
        </div>
    </div>
  );
};

export default TechnicalBlogDetails
    