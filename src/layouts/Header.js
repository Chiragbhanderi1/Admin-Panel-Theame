import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  // NavbarBrand,
  // UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
// import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user1 from "../assets/images/users/user1.jpg";
import Cookies from "js-cookie";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const Navigate = useNavigate();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  // const Handletoggle = () => {
  //   setIsOpen(!isOpen);
  // };
  const name = Cookies.get('number');
  
  const handlelogout =()=>{
    Cookies.remove('number');
    Navigate("/login")
  }
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar color="dark" dark expand="md" >
      <div className="d-flex align-items-center">
        <Button
          color="dark"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2" >
        <Button
          color="dark"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={() => {
            setIsOpen(!isOpen);
          }}

        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
          
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem className="text-white">
            WelCome {name} :)
          </NavItem>

        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="dark">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem><Link className="text-decoration-none text-dark" to={'/myaccount'}>My Account</Link></DropdownItem>
            <DropdownItem> <Link className="text-decoration-none text-dark" to={'/signup'}>Add Admin </Link></DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={handlelogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
