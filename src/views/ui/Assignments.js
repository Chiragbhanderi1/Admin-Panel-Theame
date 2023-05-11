import React, { useEffect, useState } from 'react'

const Assignments = () => {
    // eslint-disable-next-line
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        // Fetch all courses from the API
        fetch("https://api-f0ms2ifmj-chiragbhanderi1.vercel.app/getsubmittedassignments")
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
      {assignments.length ===0 && <h5>No Assignments to show</h5>}
      {assignments.map((assignment,index)=>(
        <div key={index} className="border-bottom pb-3 pt-3">
          <div className='d-flex align-items-center'>
            <p className='me-4'>{index+1}</p>
            <div>
              <div><b>UserId : </b>{assignment.user}</div>
              <div><b>Submitted on : </b>{assignment.submitted_on}</div>
              <div><b>Course Name:</b> {assignment.course.replace("%20",' ')}</div>
              <div><b>Assignment Name : </b>{assignment.name}</div>
              <a href={assignment.assignment}><button className='btn btn-dark'>View</button></a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Assignments
