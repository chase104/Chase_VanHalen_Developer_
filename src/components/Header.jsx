import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faChevronDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import startubLogo from "../assets/awards/startub.png";
import santanderLogo from "../assets/awards/santander_explorer.png";
import spinUocLogo from "../assets/awards/spin_uoc.png";
import babsonLogo from "../assets/awards/babson.png";
import awsCert from "../assets/awards/aws_cert.png";
import gcpCert from "../assets/awards/gcp_cert.png";

const awardsList = [
  {
    logo: spinUocLogo,
    name: "Spin UOC",
    url: "https://www.uoc.edu/en/news/2022/184-peerpod-spinuoc",
  },
  {
    logo: startubLogo,
    name: "StartUB!",
    url: "https://www.ub.edu/startub/",
  },
  {
    logo: santanderLogo,
    name: "Santander X Explorer",
    url: "https://explorerbyx.org/",
  },
  {
    logo: babsonLogo,
    name: "Babson College",
    url: "https://www.babson.edu/",
  },
  {
    logo: awsCert,
    name: "AWS Certified Developer – Associate",
    url: "https://aws.amazon.com/certification/certified-developer-associate/",
  },
  {
    logo: gcpCert,
    name: "GCP Cloud Digital Leader",
    url: "https://cloud.google.com/learn/certification/cloud-digital-leader",
  },
];

const Header = ({ handleConfettiExplosion }) => {
  const [text, setText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  let tooltipStates = ["", "Email copied to clipboard!", "Bye!"];

  const [tooltipText, setTooltipText] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  let finalText = "I'm Chase Van Halen";

  useEffect(() => {
    if (text.length === finalText.length) {
      setIsTypingDone(true);
      return;
    }
    for (let i = 0; i < finalText.length; i++) {
      setTimeout(() => {
        setText((prev) => prev + finalText[i]);
        if (i === finalText.length - 1) {
          setTimeout(() => {
            setIsTypingDone(true);
          }, 200);
        }
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
        }, 1000);
      }
      if (tooltipText === tooltipStates[2]) {
        //bye
        setTimeout(() => {
          setTooltipText(tooltipStates[0]); // ""
        }, 500);
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
    <header className="header py-5 min-vh-100 text-center position-relative d-flex align-items-center justify-content-center">
      <div className="text-container position-relative d-flex flex-column justify-content-center align-items-center w-100 my-auto py-5">
        <div className="header-title-group text-center">
          <h5 className="text-primary fs-3 fw-bold text-uppercase">Hi there!</h5>
          <h1 id="typing-text" className="display-1 fw-bold text-white">
            {text}<span className="blinking-cursor" aria-hidden="true" />
          </h1>

          <p className="roles text-white text-uppercase fs-4 mb-2">
            <span>Senior Software Engineer</span>
          </p>
        </div>

        <div className={`header-reveal-section d-flex flex-column align-items-center w-100 ${isTypingDone ? "is-visible" : ""}`}>
          <a
            href="#about"
            className="btn btn-primary btn-lg mt-4 mt-md-5 chevron about-link hero-primary-cta"
          >
            <div className="d-flex align-items-center">
              <div className="me-3 d-flex align-items-center">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="chevron-icon"
                  size="1x"
                />{" "}
              </div>
              <div className="text-start">
                <span className="fw-semibold">See My Impact</span>
              </div>
            </div>
          </a>

          <div className="social d-flex gap-4 mt-5 pt-lg-2">
            <div role="button" onClick={copyEmailToClipboard} aria-label="Copy email">
              <FontAwesomeIcon icon={faEnvelope} size="3x" color="white" />
            </div>
            <a
              href="https://www.linkedin.com/in/chase-van-halen-8068a5108/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <FontAwesomeIcon icon={faLinkedin} size="3x" color="white" />
            </a>
            <a
              href="https://github.com/chase104"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <FontAwesomeIcon icon={faGithub} size="3x" color="white" />
            </a>
          </div>

          {/* Header Award Logos Bar - Placed Under Social Links */}
          <div
            className="header-awards-container mt-4 pt-lg-1 px-3 py-2 rounded-4 d-flex flex-wrap align-items-center justify-content-center gap-2"
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              maxWidth: "92%",
            }}
          >
            {awardsList.map((award, i) => (
              <a
                key={i}
                href={award.url}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center justify-content-center bg-white p-1 rounded-3 shadow-sm text-decoration-none"
                style={{
                  height: "44px",
                  minWidth: "75px",
                  maxWidth: "115px",
                  flex: "0 1 auto",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                title={`Visit ${award.name}`}
              >
                <img
                  src={award.logo}
                  alt={award.name}
                  style={{
                    maxHeight: "38px",
                    maxWidth: "96%",
                    objectFit: "contain",
                  }}
                />
              </a>
            ))}
          </div>
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
