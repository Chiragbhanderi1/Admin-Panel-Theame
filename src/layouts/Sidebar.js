import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Internships",
    href: "/internships",
    icon: "bi bi-bullseye",
  },
  {
    title: "Courses",
    href: "/courses",
    icon: "bi bi-book",
  },
  {
    title: "Events",
    href: "/events",
    icon: "bi bi-calendar-event",
  },
  {
    title: "Assignments",
    href: "/assignments",
    icon: "bi bi-journal-text",
  },
  {
    title: "Users",
    href: "/users",
    icon: "bi bi-people",
  },
  {
    title: "About",
    href: "/about",
    icon: "bi bi-person",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-md-3 position-fixed ">
      <div className="d-flex align-items-center bg-dark rounded p-4 ">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2 ">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                onClick={() => showMobilemenu()}
                className={
                  location.pathname === navi.href
                    ? "text-light fs-6 fw-bold bg-dark rounded-3 nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
