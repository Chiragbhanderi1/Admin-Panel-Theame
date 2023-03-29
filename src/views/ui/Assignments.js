import React, { useEffect, useState } from 'react'

const Assignments = () => {
    // eslint-disable-next-line
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        // Fetch all courses from the API
        fetch("https://api-p1sakfilu-chiragbhanderi1.vercel.app/getsubmittedassignment")
          .then((res) => res.json())
          .then((data) => {
           data.forEach(element => {
            const fireBaseTime = new Date(
              element.submitted_on._seconds * 1000 + element.submitted_on._nanoseconds / 1000000,
            );
            const date = fireBaseTime.toDateString();
            const atTime = fireBaseTime.toLocaleTimeString();
            element.submitted_on =(date +" "+ atTime)
            });
           setAssignments(data)
          })
          .catch((err) => console.log(err));
      }, []);
  return (
    <div className='bg-white p-5'>
      <h1 className='border-bottom'>Assignments</h1>
      {assignments.map((assignment,index)=>(
        <div key={index} className="border-bottom pb-3 pt-3">
          <div><b>UserId : </b>{assignment.user}</div>
          <div><b>Submitted on : </b>{assignment.submitted_on}</div>
          <div><b>Course Name : </b>{assignment.course}</div>
          <a href={assignment.assignment}><button className='btn btn-dark'>View</button></a>
        </div>
      ))}
    </div>
  )
}

export default Assignments
