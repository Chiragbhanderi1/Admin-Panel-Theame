import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Starter = () => {
  const [courses, setCourses] = useState([]);
  const [internships, setInternships] = useState([]);
  const [events, setEvents] = useState([]);
  // const [earning,setEarning] = useState(0);
  const [users, setUsers] = useState([]);
  const Navigate =useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('myuser')){
      Navigate("/login")
    }
    fetch("https://api-p1sakfilu-chiragbhanderi1.vercel.app/getcourses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data)
      })
      .catch((err) => console.log(err));

    fetch("https://api-p1sakfilu-chiragbhanderi1.vercel.app/getinterships")
    .then((res) => res.json())
    .then((data) =>{setInternships(data)})
    .catch((err) => console.log(err));

    fetch("https://api-p1sakfilu-chiragbhanderi1.vercel.app/getevents")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));

    fetch("https://api-p1sakfilu-chiragbhanderi1.vercel.app/getusers")
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
      {/* <Row className="text-center align-items-center justify-content-center">
      <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-info text-into"
            title="Users"
            subtitle="Total Users"
            earning={earning}
            icon="bi bi-people"
          />
        </Col>
      <Col sm="6" lg="4">
          <TopCards
            bg="bg-light-info text-into"
            title="Users"
            subtitle="Total Users"
            earning={users.length}
            icon="bi bi-people"
          />
        </Col>
      </Row> */}
      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables />
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
              text1={blg.details}
              color="dark"
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
