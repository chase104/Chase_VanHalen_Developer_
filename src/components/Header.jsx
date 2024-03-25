import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [text, setText] = useState("");
  let finalText = "I am Chase Van Halen";
  useEffect(() => {
    if (text.length) return;
    for (let i = 0; i < finalText.length; i++) {
      setTimeout(() => {
        setText((prev) => prev + finalText[i]);
      }, 100 * i);
    }
  }, []);

  return (
    <header className="header  py-5 vh-100 text-center position-relative">
      <div className="text-container position-relative d-flex flex-column justify-content-center align-items-center h-100">
        <h5 className="text-primary fs-3 fw-bold text-uppercase">
          Hello, World.
        </h5>
        <h1 id="typing-text" className="display-1 fw-bold text-white">
          {text}
        </h1>

        <p className="roles text-white text-uppercase fs-4">
          <span>Full Stack Web Developer | </span>
          <span>Software Educator</span>
        </p>

        <a href="#about" className="btn btn-outline-light btn-lg mt-3 chevron">
          <div className="d-flex">
            <div className="me-3">
              <FontAwesomeIcon
                icon={faChevronDown}
                className="chevron"
                size="1x"
              />{" "}
            </div>
            <div className="text-start">
              <span>More About Me</span>
            </div>
          </div>
        </a>

        <div className="social d-flex gap-3  mt-4">
          <a href="#">
            <FontAwesomeIcon icon={faGithub} size="3x" color="white" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faLinkedin} size="3x" color="white" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faGithub} size="3x" color="white" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faLinkedin} size="3x" color="white" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
