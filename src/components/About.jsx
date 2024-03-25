import { useEffect, useRef, useState } from "react";
import headshot from "../images/headshot.jpg";
const About = () => {
  const [numbers, setNumbers] = useState([
    { value: 0, title: "Juniors Mentored", end: 322 },
    { value: 0, title: "Issues Solved", end: 285 },
    { value: 0, title: "Good Reviews", end: 159 },
    { value: 0, title: "Case Studies", end: 128 },
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
                            value: Math.min(currentValue + increment, endValue),
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
      { threshold: 0.5 }
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
          <p className="lead fw-normal col-lg-9">
            As a Full Stack Web Developer from Indiana, my tech journey began
            about 5 years ago, diverting from a career in law despite a 98th
            percentile LSAT score (171/180) and scholarship offers. I quickly
            transitioned from mastering foundational web technologies —
            JavaScript, HTML, and CSS — to advanced tools and libraries like
            React, TypeScript, and Express.js. My career highlights include
            contributing to several companies and launching my own startup web
            app now used in over 40 schools in Spain. Eager for new challenges,
            I&apos;m looking forward to opportunities that allow me to leverage
            my skills and experiences in innovative projects.
          </p>
        </div>
      </div>
      <div className="row mt-4">
        {numbers.map((num, index) => (
          <div key={index} className="col-md-3 col-sm-6 text-center">
            <h2 className="counter xl-text">{Math.round(num.value)}</h2>
            <p>{num.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
