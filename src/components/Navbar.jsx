import { useEffect, useState } from "react";
import Logo from "../images/logo.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAws, faNodeJs, faReact } from "@fortawesome/free-brands-svg-icons";
// import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [navbarClasses, setNavbarClasses] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setNavbarClasses("bg-body-color navbar-sticky text-white");
      } else {
        setNavbarClasses("");
      }
    };

    // Add the event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top  navbar-light ${navbarClasses}`}
    >
      <div className="container">
        <a className="navbar-brand d-flex gap-3" href="#">
          <img src={Logo} alt="logo" />
          <span>Chase Van Halen</span>
          {/* <span className="fw-bold fs-4">CV</span> */}
          {/* <FontAwesomeIcon icon={faReact} size="2x" color="primary" />

          <FontAwesomeIcon icon={faNodeJs} size="2x" color="primary" />

          <FontAwesomeIcon icon={faAws} size="2x" color="primary" />

          <FontAwesomeIcon icon={faDatabase} size="2x" color="primary" /> */}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto text-white">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#details">
                Details
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projects">
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-outline-primary px-4 mx-4"
                href="#contact"
              >
                Contact Me
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
