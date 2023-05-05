import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Table } from "reactstrap";
import { useNavigate, useParams } from 'react-router-dom';
const EventsDetails = () => {
  const [events, setEvents] = useState([]);
  const [student,setStudent] = useState({})
  const { eventslug } = useParams();
  const Navigate =useNavigate();
  const students = [];
  const ids=[];
  useEffect(()=>{
    if(!localStorage.getItem('myuser')){
      Navigate("/login")
    }
    // Fetch all internships from the API
    fetch(`https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/getevent/${eventslug}`)
    .then((res) => res.json())
    .then((data) =>{
      setEvents(data)
      setStudent(data.students)
      data.students.forEach(element => {
        const index = element.lastIndexOf("-");
        const result = element.substring(0, index);
        const id = element.slice(index+1);
        students.push(result)
        ids.push(id) 
      });
      const result2 = Object.fromEntries(students.map((key, index) => [key, ids[index]]));
      setStudent(result2)
    })
    .catch((err) => console.log(err));
    
    // eslint-disable-next-line
  },[])
  
  function convertToExcel(data) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return excelBuffer;
  }
  
  function downloadExcelFile(buffer, fileName) {
    const data = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}.xlsx`);
  }
  
  function handleClick(data) {
      const convertedData = Object.entries(data).map(([email, id], index) => ({
      Sr: index + 1,
      Email: email,
      Id: id
    }));
    
    console.log(convertedData);
    
    const buffer = convertToExcel(convertedData);
    downloadExcelFile(buffer, events.title);
  }
  
  return (
    <div>
      <div className="container bg-white">
        <img src={events.banner} width={"100%"} alt="banner"/>
            <h1 className="text-center border-bottom mb-3">{events.title}</h1>
        <div className="row">
          <div className="col-md">
            <h5 className="mt-3 bg-white p-2">Details :</h5>
            <div className="ms-5">
               <div  dangerouslySetInnerHTML={{__html:events.details}}></div>
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
            <h1 className="text-center mt-4"> Students Enrolled</h1>
            <div className="float-end "><button className="btn btn-dark" onClick={() => handleClick(student)}><i className="bi bi-file-earmark-arrow-down"></i>Download Excel List</button></div>
            {student.length===0 && <div className="text-center">No Students Have Enrolled Yet.</div>}
            <h5>Total No. of Students Enrolled :{student.length}</h5>
              <Table bordered hover>
             <thead>
               <tr>
                 <th>Sr.</th>
                 <th>Email</th>
                 <th>Id</th>
               </tr>
             </thead>
             <tbody>
           {Object.keys(student).map((key,index)=>{
              return <tr key={index}>
                 <th scope="row">{index+1}</th>
                 <td>{key}</td>
                 <td>{student[key]}</td>
               </tr>
            })}
             </tbody>
           </Table>
           
          </div>
        </div>
    </div>
  );
};

export default EventsDetails
    