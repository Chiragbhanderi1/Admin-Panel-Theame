import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const Internships = lazy(() => import("../views/ui/Internships"));
const InternshipDetails = lazy(()=>import("../views/ui/InternshipDetails"));
const Assignments = lazy(()=>import("../views/ui/Assignments"));
const CourseDetails = lazy(()=>import("../views/ui/CourseDetails"));
const Login = lazy(()=>import("../views/ui/Login"));
const Signup = lazy(()=>import("../views/ui/Signup"));
const Users = lazy(()=>import("../views/ui/Users"))
const EventDetails = lazy(()=>import("../views/ui/EventDetails"));
const Courses = lazy(() => import("../views/ui/Courses"));
const Events = lazy(() => import("../views/ui/Events"));
const TechnicalBlog = lazy(()=>import("../views/ui/TechnicalBlog"))
const TechnicalBlogDetails = lazy(()=>import("../views/ui/TechnicalBlogDetails"))
const Banner = lazy(()=>import("../views/ui/Banner"))
const Blogs = lazy(()=>import("../views/ui/Blogs"))
const Requests = lazy(()=>import("../views/ui/Requests"))
const Contactus = lazy(()=>import("../views/ui/Contactus"))
const Achievement = lazy(()=>import("../views/ui/Achievements.js"))
const MyAccount = lazy(()=>import("../views/ui/MyAccount.js"))
/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/users", exact: true, element: <Users   /> },
      { path: "/starter", exact: true, element: <Starter   /> },
      { path: "/internships", exact: true, element: <Internships /> },
      { path: "/internships/:internshipslug", exact: true, element: <InternshipDetails /> },
      { path: "/courses", exact: true, element: <Courses /> },
      { path: "/assignments", exact: true, element: <Assignments /> },
      { path: "/courses/:courseslug", exact: true, element: <CourseDetails /> },
      { path: "/events", exact: true, element: <Events /> },
      { path: "/events/:eventslug", exact: true, element: <EventDetails /> },
      { path: "/technicalblogs", exact: true, element: <TechnicalBlog /> },
      { path: "/technicalblog/:blogslug", exact: true, element: <TechnicalBlogDetails /> },
      { path: "/banner", exact: true, element: <Banner/> },
      { path: "/blogs", exact: true, element: <Blogs/> },
      { path: "/contactus", exact: true, element: <Contactus/> },
      { path: "/achievements", exact: true, element: <Achievement/> },
      { path: "/signup", exact: true, element: <Signup/> },
      { path: "/myaccount", exact: true, element: <MyAccount/> },
      { path: "/requests", exact: true, element: <Requests/> },
    ],
  },{ path: "/login", element: <Login/> },
];

export default ThemeRoutes;
