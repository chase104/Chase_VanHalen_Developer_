import { useEffect, useRef, useState } from "react";
import headshot from "../assets/linkedInProfile.png";
import startubLogo from "../assets/awards/startub.png";
import santanderLogo from "../assets/awards/santander_explorer.png";
import spinUocLogo from "../assets/awards/spin_uoc.png";
import babsonLogo from "../assets/awards/babson.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faAward,
  faCodePullRequest,
  faTasks,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

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
];

const About = () => {
  const [numbers, setNumbers] = useState([
    {
      value: 0,
      formattedValue: "0",
      title: "Code Reviews Conducted",
      end: 265,
      icon: faCodePullRequest,
      hasPlus: true,
    },
    {
      value: 0,
      formattedValue: "0",
      title: "Issues Solved",
      end: 880,
      icon: faTasks,
      hasPlus: true,
    },
    {
      value: 0,
      formattedValue: "0",
      title: "Users Served",
      end: 800000,
      icon: faUsers,
      hasPlus: true,
    },
    {
      value: 0,
      formattedValue: "0",
      title: "Startup Awards & Grants",
      end: 4,
      icon: faAward,
      hasPlus: false,
      isAwardBlock: true,
    },
  ]);

  const aboutRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNumbers((prevNumbers) =>
            prevNumbers.map((item) => {
              const duration = 2000;
              const increment = (item.end / duration) * 10;

              const animateNumber = (currentValue, endValue) => {
                if (currentValue < endValue) {
                  setNumbers((prevNumbers) =>
                    prevNumbers.map((num) =>
                      num.title === item.title
                        ? {
                            ...num,
                            value: Math.min(currentValue + increment, endValue),
                            formattedValue: Math.floor(
                              Math.min(currentValue + increment, endValue)
                            ).toLocaleString(),
                          }
                        : num
                    )
                  );
                  setTimeout(
                    () => animateNumber(currentValue + increment, endValue),
                    10
                  );
                }
              };

              animateNumber(item.value, item.end);
              return item;
            })
          );
          observer.disconnect();
        }
      },
      { threshold: 0.33 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={aboutRef}
      id="about"
      className="about bg-light pt-6 pb-7 position-relative"
    >
      <div className="container">
        <div className="text-center">
          <h4 className="text-uppercase fw-bold text-primary">About Me</h4>
          <div className="row stats py-5">
            {numbers.map((num, index) => (
              <div
                key={index}
                className="stat-block text-center col-md-3 col-sm-10"
              >
                <div className="d-flex gap-2 mb-1 align-items-center justify-content-center">
                  <FontAwesomeIcon
                    icon={num.icon}
                    size="2x"
                    className="fa-primary-color"
                  />
                  <h2 className="counter mb-0 xl-text">
                    {num.formattedValue}
                    {num.hasPlus ? "+" : ""}
                  </h2>
                </div>
                <p className="mb-1">{num.title}</p>
                {num.isAwardBlock && (
                  <div
                    className="award-emblems-row d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2 mt-3 mx-auto"
                    style={{
                      maxWidth: "100%",
                    }}
                  >
                    {awardsList.map((award, i) => {
                      const isVisible = i < Math.floor(num.value);
                      return (
                        <a
                          key={i}
                          href={award.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="award-emblem-card d-flex align-items-center justify-content-center bg-white p-1 rounded-3 shadow-sm w-100 text-decoration-none"
                          style={{
                            flex: "1 1 0",
                            minWidth: "0",
                            maxWidth: "220px",
                            height: "65px",
                            border: "1px solid rgba(0, 0, 0, 0.08)",
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible
                              ? "scale(1) translateY(0)"
                              : "scale(0.5) translateY(12px)",
                            transition:
                              "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease",
                            pointerEvents: isVisible ? "auto" : "none",
                            cursor: "pointer",
                          }}
                          title={`Visit ${award.name}`}
                        >
                          <img
                            src={award.logo}
                            alt={award.name}
                            style={{
                              maxHeight: "50px",
                              maxWidth: "92%",
                              objectFit: "contain",
                            }}
                          />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
          <hr className="w-25 mx-auto" />
          <h2 className="mb-4">My Background</h2>
        </div>
        <div className="about-content text-start clearfix">
          <img
            src={headshot}
            alt="headshot"
            className="about-img img-fluid rounded-circle shadow-sm"
          />
          <p className="lead fw-normal fs-5 mb-4">
            I am a Senior Full-Stack Engineer and Systems Architect specializing in highly concurrent backend systems and production-grade AI integrations. With a focus on scale and resilience, I build architectures that solve complex business problems, from engineering high-throughput microservices to deploying agentic AI workflows.
          </p>
          <p className="lead fw-normal fs-5 mb-4">
            Currently, I drive technical strategy for a high-growth SaaS platform serving over 200,000 users. My recent work includes architecting a custom Go (Golang) microservice from the ground up to replace an expensive third-party vendor. By leveraging Go's native streaming and concurrency models, this system securely processes 50,000+ daily CPU-intensive file uploads with near-zero latency.
          </p>
          <p className="lead fw-normal fs-5 mb-4">
            Beyond traditional backend architecture, I specialize in bridging the gap between scalable infrastructure and applied AI. I have designed and deployed RAG architectures and multi-agent systems using the Gemini API that ground LLMs in domain-specific data—resulting in a 70% reduction in AI hallucinations and a 60% drop in manual customer support overhead.
          </p>
          <p className="lead fw-normal fs-5 mb-0">
            Whether I am provisioning distributed AWS infrastructure for <a href="https://playpod.education" target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none fw-bold">Playpod</a>—an EdTech platform that secured 1st Prize at StartUB! and Santander X Explorer, Spin UOC honors, and a Babson College Entrepreneurship Grant—or optimizing zero-latency industrial management interfaces for manufacturing floors, my engineering philosophy remains the same: write efficient, maintainable code that drives quantifiable business value.
          </p>
        </div>
      </div>
     
      <a href="#skills">
        <FontAwesomeIcon
          icon={faArrowDown}
          size="3x"
          className="down-arrow-custom"
          color="black"
        />
      </a>
    </section>
  );
};

export default About;
