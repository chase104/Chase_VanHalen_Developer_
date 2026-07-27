import {
  faBootstrap,
  faCss3,
  faHtml5,
  faJs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faIcons } from "@fortawesome/free-solid-svg-icons";

const SkillsView = ({ skills }) => {
  const [showIcons, setShowIcons] = useState(true);

  return (
    <div className="row mt-5 g-3">
      <div className="btn-group mb-3 buttons-toggle">
        <button
          className={`btn btn-outline-primary d-flex justify-content-center align-items-center slash ${
            !showIcons ? "active" : ""
          } `}
          onClick={() => setShowIcons(false)}
        >
          <FontAwesomeIcon icon={faIcons} />
        </button>
        <button
          className={`btn btn-outline-primary d-flex justify-content-center align-items-center ${
            showIcons ? "active" : ""
          } `}
          onClick={() => setShowIcons(true)}
        >
          <FontAwesomeIcon icon={faIcons} background="transparent" />
        </button>
      </div>
      {Object.keys(skills).map((skillType, index) => {
        return (
          <div
            key={index}
            className="col-12 col-sm-6 col-lg-3 p-2"
          >
            <div className="skills-view-card">
              <h4 className="text-primary fw-bold text-capitalize border-bottom pb-2 mb-3">{skillType}</h4>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                {skills[skillType].map((skill, index) => {
                  return (
                    <li
                      key={index}
                      className={`skill-view-badge skill-tooltip-container d-flex align-items-center text-start ${
                        skill.animation === "pulse"
                          ? "fa-icon-animation"
                          : "fa-spinning"
                      }`}
                    >
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className={`skills-icons ${
                          showIcons ? "" : "shrink-icons"
                        }`}
                      />

                      <span>{skill.name}</span>

                      {skill.description && (
                        <div className="skill-tooltip">
                          {skill.company && (
                            <div className="tooltip-company">
                              {skill.company}
                            </div>
                          )}
                          <div className="tooltip-desc">{skill.description}</div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsView;
