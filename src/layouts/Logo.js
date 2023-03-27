// import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="text-decoration-none" >
      <img src="https://technoithub.in/assets/images/logo.png"className="rounded-circle" alt="logo" width={"50px"}></img>
      <span className="text-white  fs-5 pt-4  ms-1">Techno It Hub</span>
    </Link>
  );
};

export default Logo;
