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
    <div className="row mt-5 ">
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
            className={`col-md-3 bg-light p-4 ${
              index == 1
                ? "mx-md-3 my-3 my-md-0"
                : index === 0
                ? "ms-auto"
                : "me-auto"
            }`}
          >
            <h4 className="text-black d-flex">{skillType}</h4>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {skills[skillType].map((skill, index) => {
                return (
                  <li
                    key={index}
                    className={`d-flex gap-3 align-items-center bg-light ${
                      skill.animation == "pulse"
                        ? "fa-icon-animation"
                        : "fa-spinning"
                    }`}
                  >
                    <img
                      src={skill.logo}
                      alt="ts"
                      className={`w-25 max-w-35 skills-icons ${
                        showIcons ? "" : "shrink-icons"
                      }`}
                    />

                    {skill.name}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsView;
