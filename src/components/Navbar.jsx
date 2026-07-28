import { useEffect, useState } from "react";
import Logo from "../images/logo.png";

const Navbar = () => {
  const [navbarClasses, setNavbarClasses] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);

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

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top navbar-dark ${navbarClasses}`}
    >
      <div className="container">
        <a className="navbar-brand d-flex gap-3 align-items-center" href="#" onClick={closeNav}>
          <img src={Logo} alt="logo" />
          <span>Chase Van Halen</span>
        </a>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          onClick={toggleNav}
          aria-controls="navbarNavDropdown"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ms-auto text-white align-items-lg-center gap-2 gap-lg-3">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#" onClick={closeNav}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about" onClick={closeNav}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#skills" onClick={closeNav}>
                Skills
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link btn btn-primary px-4 py-2 mt-2 mt-lg-0 text-white nav-cta-btn"
                href="#contact"
                onClick={closeNav}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

