// import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
import { Link } from "react-router-dom";
import logo from "../assets/images/logos/logo.png"
const Logo = () => {
  return (
    <Link to="/" className="text-decoration-none" >
      <img src={logo} className="rounded-circle bg-white p-2" alt="logo" width={"50px"}></img>
      <span className="text-white  fs-5 pt-4  ms-1"> Citynect</span>
    </Link>
  );
};

export default Logo;
