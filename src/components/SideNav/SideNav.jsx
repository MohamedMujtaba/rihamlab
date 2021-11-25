import "./SideNav.css";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { BiTestTube } from "react-icons/bi";
import { FaRegMoneyBillAlt, FaRegPaperPlane } from "react-icons/fa";
import { Item } from "./SideNavStyle";
import Info from "../Info/Info";

const SideNav = () => {
  return (
    <div className="sidebar">
      <Item>
        <Link to="/" className="link">
          <FiUser />
        </Link>
        <Info content={'Users'} left={'70px'} />
      </Item>
      <Item>
        <Link to="/tests" className="link">
          <BiTestTube />
        </Link>
        <Info content={'Tests'} left={'70px'} />
      </Item>
      <Item>
        <Link to="/bills" className="link">
          <FaRegMoneyBillAlt />
        </Link>
        <Info content={'Bills'} left={'70px'} />
      </Item>
      <Item>
        <Link to="/results" className="link">
          <FaRegPaperPlane />
        </Link>
        <Info content={'Results'} left={'70px'} />
      </Item>
    </div>
  );
};

export default SideNav;
