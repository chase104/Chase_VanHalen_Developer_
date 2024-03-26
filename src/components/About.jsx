import { useEffect, useRef, useState } from "react";
import headshot from "../images/headshot.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faCode,
  faTasks,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
const About = () => {
  const [numbers, setNumbers] = useState([
    {
      value: 0,
      title: "Junior Developers Mentored",
      end: 145,
      icon: faUsers,
    },
    {
      value: 0,
      title: "Issues Solved",
      end: 502,
      icon: faTasks,
    },
    {
      value: 0,
      title: "Lines Of Code Written in Lastest Project",
      end: 68281,
      icon: faCode,
    },
    {
      value: 0,
      title: "International Startup Awards",
      end: 3,
      icon: faAward,
    },
  ]);

  const aboutRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNumbers((prevNumbers) =>
            prevNumbers.map((item) => {
              const duration = 1200; // Animation duration in milliseconds
              const increment = (item.end / duration) * 10; // Calculate increment to ensure all counters finish at the same time

              const animateNumber = (currentValue, endValue) => {
                if (currentValue < endValue) {
                  setNumbers((prevNumbers) =>
                    prevNumbers.map((num) =>
                      num.title === item.title
                        ? {
                            ...num,
                            // Store the numeric value for calculations and comparisons
                            value: Math.min(currentValue + increment, endValue),
                            // Use a separate property for the formatted string or format during rendering
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
          // Disconnect observer after triggering animation
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
    <section ref={aboutRef} id="about" className="about bg-light pt-6">
      <div className="container">
        <div className="text-center">
          <h4 className="text-uppercase fw-bold text-primary">About Me</h4>
          <hr className="w-25 mx-auto" />
          <h2 className="mb-4">Let me introduce myself.</h2>
        </div>
        <div className="about-content  align-items-center h-100 row">
          <img
            src={headshot}
            alt="headshot"
            className="about-img img-fluid rounded-circle col-9 mb-3 mb-md-0 col-sm-6   col-md-3   mx-auto"
          />
          <p className="lead fw-normal col-lg-9 fs-5">
            As a Full Stack Web Developer from Indiana, my tech journey began
            about 5 years ago, diverting from a career in law despite a 98th
            percentile LSAT score (171/180) and scholarship offers. A passion
            for technology led me to diligently master foundational web
            technologies — JavaScript, HTML, and CSS — then to advanced tools
            and libraries like React, TypeScript, and Express.js. My career
            highlights include creating web-interfaces for 7 Houston factories,
            servicing 20+ clients, and architecting/developing a startup web app
            currently live in the European market. Beyond my technical
            expertise, my bilingual (English/Spanish) abilities have been
            instrumental in bridging communication gaps, enhancing client
            relationships, and expanding market reach. Eager for new challenges,
            I&apos;m looking forward to opportunities that allow me to leverage
            my skills and experiences in innovative projects.
            {/* 3 continents (international) */}
            {/* bilingual */}
          </p>
        </div>
      </div>
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
              <h2 className="counter mb-0 xl-text">{num.formattedValue}</h2>
            </div>
            <p>{num.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
