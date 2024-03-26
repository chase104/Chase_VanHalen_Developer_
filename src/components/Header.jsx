import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faChevronDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Header = ({ handleConfettiExplosion }) => {
  const [text, setText] = useState("");
  let tooltipStates = ["", "Email copied to clipboard!", "Bye!"];

  const [tooltipText, setTooltipText] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  let finalText = "I'm Chase Van Halen";

  useEffect(() => {
    if (text.length) return;
    for (let i = 0; i < finalText.length; i++) {
      setTimeout(() => {
        setText((prev) => prev + finalText[i]);
      }, 100 * i);
    }
  }, []);
  useEffect(() => {
    // wehen change happens
    if (tooltipText !== null) {
      if (tooltipText === tooltipStates[1]) {
        // copied
        setTimeout(() => {
          setTooltipText(tooltipStates[2]); //bye
        }, 2000);
      }
      if (tooltipText === tooltipStates[2]) {
        //bye
        setTimeout(() => {
          setTooltipText(tooltipStates[0]); // ""
        }, 1000);
      }
      if (tooltipText === tooltipStates[0]) {
        //bye
        handleConfettiExplosion({
          clientX: tooltipPosition.x,
          clientY: tooltipPosition.y,
        });
        setTooltipText(null);
      }

      const handleMouseMove = (e) => {
        setTooltipPosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Remove event listener on cleanup
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [tooltipText]);
  const emailString = "chase.vanhalen88@gmail.com";

  const copyEmailToClipboard = async (e) => {
    try {
      await navigator.clipboard.writeText(emailString);
      setTooltipPosition({ x: e.clientX, y: e.clientY });
      setTooltipText("Email copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <header className="header  py-5 vh-100 text-center position-relative">
      <div className="text-container position-relative d-flex flex-column justify-content-center align-items-center h-100">
        <h5 className="text-primary fs-3 fw-bold text-uppercase">Hi there!</h5>
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
          <div role="button" onClick={copyEmailToClipboard}>
            <FontAwesomeIcon icon={faEnvelope} size="3x" color="white" />
          </div>
          <a href="#">
            <FontAwesomeIcon icon={faLinkedin} size="3x" color="white" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faGithub} size="3x" color="white" />
          </a>
        </div>
      </div>
      {tooltipText !== null && (
        <div
          className="tooltip-custom"
          style={{
            position: "fixed",
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            // transform: "translateX(40%)",
            // Additional styling to position the tooltip correctly
          }}
        >
          {tooltipText}
        </div>
      )}
    </header>
  );
};

export default Header;
