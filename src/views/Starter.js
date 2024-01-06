import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

const Starter = () => {
  const [courses, setCourses] = useState([]);
  const [request, setRequest] = useState([]);
  const [internships, setInternships] = useState([]);
  const [events, setEvents] = useState([]);
  // const [earning,setEarning] = useState(0);
  const [users, setUsers] = useState([]);
  const Navigate =useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('name')){
      Navigate("/login")
    }
    fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getcourses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data)
      })
      .catch((err) => console.log(err));
    fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getrequests")
      .then((res) => res.json())
      .then((data) => {
        setRequest(data)
      })
      .catch((err) => console.log(err));

    fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getinternships")
    .then((res) => res.json())
    .then((data) =>{setInternships(data)})
    .catch((err) => console.log(err));

    fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getevents")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));

    fetch("https://api-cnn5jio2q-chiragbhanderi1.vercel.app/getusers")
    .then((res) => res.json())
    .then((data) =>{setUsers(data)})
    .catch((err) => console.log(err));
     // eslint-disable-next-line
  },[])
  return (
    <div>
      {/***Top Cards***/}
      <Row className="text-center">
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Courses"
            subtitle="Total Courses"
            earning={courses.length}
            icon="bi bi-book"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Internships"
            subtitle="Total Internships"
            earning={internships.length}
            icon="bi bi-bullseye"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Events"
            subtitle="Total Events"
            earning={events.length}
            icon="bi bi-calendar-event"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="Users"
            subtitle="Total Users"
            earning={users.length}
            icon="bi bi-people"
          />
        </Col>
      </Row>
      <Row>
        <Col lg="12">
        <Card>
        <CardBody>
          <Link to={"/requests"} className="text-dark" style={{textDecoration:"none"}}>
            <CardTitle tag="h5">Payment Requests <i className="bi bi-box-arrow-up-right fs-6 ms-2"></i></CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Offline Payment Requests
            </CardSubtitle>
          </Link>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Email</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {request.map((tdata, index) => index<3 && (
                <tr key={index} className="border-top">
                  <td>{index+1}</td>
                  <td>{tdata.email}</td>
                  <td>{tdata.courseId}</td>
                  <td>{tdata.status} </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
        </Col>
      </Row>
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart events={events} internships={internships} courses={courses}/>
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds users={users}/>
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables courses={courses} />
        </Col>
      </Row>
      {/***Blog Cards***/}
      
      <Row className="bg-white p-1 m-1">
        <h5 className="mt-1 mb-1">Events</h5>
        <h6 className="text-muted mb-4">Some Events</h6>
        {events.map((blg, index) => index<4 && (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.img}
              title={blg.title}
              subtitle={blg.subtitle}
              color="dark"
              editbutton="true"
              delbutton="true"
              morebutton="true"
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
