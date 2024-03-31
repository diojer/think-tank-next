import Link from "next/link";
import Image from "next/image";
import "./Navbar.css";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { UseStateContext } from "../contexts/ContextProvider";

//FontAwesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { admin } = true;
  return (
    <nav>
      <div className="wrapper">
        <div className="logo">
          <Link href="/" className="logo-wrapper">
            <div className="navbar-logo">
              <Image src="/images/img-20.png" fill objectFit="contain" />
            </div>
            <p className="logo-text">Leeds Policy Institute</p>
          </Link>
        </div>
        <input type="radio" name="slider" id="menu-btn" />
        <input type="radio" name="slider" id="close-btn" />
        <ul className="nav-links">
          <label htmlFor="close-btn" className="btn close-btn">
            <FontAwesomeIcon icon={faBars} />
          </label>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li className="dropdown">
            <Link href="#" className="dropbtn">
              About Us <FontAwesomeIcon icon={faChevronDown} />
            </Link>
            <div className="dropdown-content">
              <Link href="/about-us/team">Team</Link>
              <Link href="/about-us/platform">Our Platform</Link>
            </div>
          </li>
          <li>
            <a
              href="https://engage.luu.org.uk/groups/26GTR/leeds-think-tank-society/events"
              target="_blank"
              rel="noopener noreferrer"
            >
              Events
            </a>
          </li>
          <li>
            <Link href="/articles">Articles</Link>
          </li>
          <li>
            <Link href="/reports">Reports</Link>
          </li>
          <li className="dropdown">
            <Link href="#" className="dropbtn">
              Media <FontAwesomeIcon icon={faChevronDown} />
            </Link>
            <div className="dropdown-content">
              <Link href="/media/appearances">Media Appearances</Link>
              <Link href="/media/press-releases">Press Releases</Link>
            </div>
          </li>
          <li>
            <Link href="/sponsors">Sponsors</Link>
          </li>
          {/* Login Page */}
          <li>
            <Link href="/login">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>
          {/* Searchbar */}
          <li></li>
          {/* Admin */}
          {admin && (
            <li>
              <Link href="/portal/upload">
                <FontAwesomeIcon icon={faPencil} />
              </Link>
            </li>
          )}
        </ul>
        <label htmlFor="menu-btn" className="btn menu-btn">
          <FontAwesomeIcon icon={faBars} />
        </label>
      </div>
    </nav>
  );
}

export default Navbar;
