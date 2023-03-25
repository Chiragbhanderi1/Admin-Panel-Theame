import React, { useEffect, useState } from 'react'

const Assignments = () => {
    // eslint-disable-next-line
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        // Fetch all courses from the API
        fetch("https://api-1vjt09w2e-chiragbhanderi1.vercel.app/getassignments")
          .then((res) => res.json())
          .then((data) => setAssignments(data))
          .catch((err) => console.log(err));
      }, []);
  return (
    <div className='bg-white'>
      journal-text
    </div>
  )
}

export default Assignments
