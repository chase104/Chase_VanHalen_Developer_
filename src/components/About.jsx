import { useEffect, useRef, useState } from "react";
import headshot from "../assets/linkedInProfile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faAward,
  faCodePullRequest,
  faTasks,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

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
      title: "International Startup Awards",
      end: 3,
      icon: faAward,
      hasPlus: false,
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
                <p>{num.title}</p>
              </div>
            ))}
          </div>
          <hr className="w-25 mx-auto" />
          <h2 className="mb-4">My Background</h2>
        </div>
        <div className="about-content align-items-center h-100 row">
          <img
            src={headshot}
            alt="headshot"
            className="about-img img-fluid rounded-circle col-9 mb-4 mb-md-0 col-sm-6 col-md-4 col-lg-4 mx-auto"
          />
          <p className="lead fw-normal col-12 col-md-8 col-lg-8 fs-5">
            I am a Senior Full-Stack Engineer and Systems Architect specializing in highly concurrent backend systems and production-grade AI integrations. With a focus on scale and resilience, I build architectures that solve complex business problems, from engineering high-throughput microservices to deploying agentic AI workflows.
            <br /><br />
            Currently, I drive technical strategy for an EdTech platform serving over 200,000 users. My recent work includes architecting a custom Go (Golang) microservice from the ground up to replace an expensive third-party vendor. By leveraging Go's native streaming and concurrency models, this system securely processes 50,000+ daily CPU-intensive file uploads with near-zero latency.
            <br /><br />
            Beyond traditional backend architecture, I specialize in bridging the gap between scalable infrastructure and applied AI. I have designed and deployed RAG architectures and multi-agent systems using the Gemini API that ground LLMs in domain-specific data—resulting in a 70% reduction in AI hallucinations and a 60% drop in manual customer support overhead.
            <br /><br />
            Whether I am provisioning distributed AWS infrastructure for an award-winning startup or optimizing zero-latency industrial management interfaces for manufacturing floors, my engineering philosophy remains the same: write efficient, maintainable code that drives quantifiable business value.
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
