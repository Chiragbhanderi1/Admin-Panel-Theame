import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Internships = lazy(() => import("../views/ui/Internships"));
const InternshipDetails = lazy(()=>import("../views/ui/InternshipDetails"));
const Assignments = lazy(()=>import("../views/ui/Assignments"));
const CourseDetails = lazy(()=>import("../views/ui/CourseDetails"));
const Login = lazy(()=>import("../views/ui/Login"));
const Users = lazy(()=>import("../views/ui/Users"))
const EventDetails = lazy(()=>import("../views/ui/EventDetails"));
const Courses = lazy(() => import("../views/ui/Courses"));
const Events = lazy(() => import("../views/ui/Events"));
const TechnicalBlog = lazy(()=>import("../views/ui/TechnicalBlog"))
const TechnicalBlogDetails = lazy(()=>import("../views/ui/TechnicalBlogDetails"))

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/users", exact: true, element: <Users   /> },
      { path: "/starter", exact: true, element: <Starter   /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/internships", exact: true, element: <Internships /> },
      { path: "/internships/:internshipslug", exact: true, element: <InternshipDetails /> },
      { path: "/courses", exact: true, element: <Courses /> },
      { path: "/assignments", exact: true, element: <Assignments /> },
      { path: "/courses/:courseslug", exact: true, element: <CourseDetails /> },
      { path: "/events", exact: true, element: <Events /> },
      { path: "/events/:eventslug", exact: true, element: <EventDetails /> },
      { path: "/technicalblogs", exact: true, element: <TechnicalBlog /> },
      { path: "/technicalblog/:blogslug", exact: true, element: <TechnicalBlogDetails /> },
    ],
  },{ path: "/login", element: <Login/> },
];

export default ThemeRoutes;
