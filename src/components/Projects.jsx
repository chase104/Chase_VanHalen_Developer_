import React, { useState } from "react";
import project1 from "../images/project1.jpg";
import project2 from "../images/project2.jpg";
import project3 from "../images/project3.jpg";
import project4 from "../images/project4.jpg";
import project5 from "../images/project5.jpg";
import project6 from "../images/project6.jpg";
import ReactImageLightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import {
  faNodeJs,
  faReact,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Projects = () => {
  const [projects, setProjects] = useState([
    {
      name: "Portfolio",
      image: project1,
      technologies: [
        { name: "react", logo: faReact },
        { name: "Node.js", logo: faNodeJs },
        { name: "Express", logo: faStackOverflow },
      ],
    },
    { name: "Loop Studios Website", image: project2 },
    { name: "Shortly Website", image: project3 },
    { name: "Flyo Website", image: project4 },
    { name: "Bookmark Website", image: project5 },
  ]);

  return (
    <section id="projects" className="portfolio py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h4 className="text-uppercase fw-bold text-primary">Portfolio</h4>
          <hr className="w-25 mx-auto" />
          <h2 className="mb-4">Check Out My Work</h2>
          <p className="lead">Here is a small sample of my projects.</p>
        </div>
        <div className="row gap-5">
          {projects.map((project, index) => {
            return (
              <div
                key={project.name}
                className={`col-md-4 mb-4 project-img-container  ${
                  index % 2 === 0 ? "offset-md-1" : "offset-md-2"
                }`}
              >
                <div className="project shadow-lg rounded-5 position-relative">
                  <div className="icons-container-projects">
                    {project.technologies &&
                      project.technologies.map((tech) => {
                        return (
                          <FontAwesomeIcon
                            key={tech.name + project.name}
                            icon={tech.logo}
                            size="2x"
                            color="primary"
                            title={tech.name}
                            className="bg-primary rounded-circle text-white px-2  py-1"
                          />
                        );
                      })}
                  </div>
                  <img
                    src={project.image}
                    alt=""
                    className="img-fluid rounded-3 "
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
