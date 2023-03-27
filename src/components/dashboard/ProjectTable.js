import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

const ProjectTables = () => {
  const [courses, setCourses] = useState([]);
  useEffect(()=>{
    fetch("https://api-cyu8h01yw-chiragbhanderi1.vercel.app/getcourses")
    .then((res) => res.json())
    .then((data) => {
      setCourses(data)
    })
    .catch((err) => console.log(err)); 
  })
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Courses</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the Courses
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Title</th>
                <th>Subtitle</th>
                <th>Price</th>
                <th>Students Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((tdata, index) => index<5 && (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.img}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.title}</h6>
                        <span className="text-muted">{tdata.duration}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.subtitle}</td>
                  <td>{tdata.price}</td>
                  <td>{(tdata.students).length}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
