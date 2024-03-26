import {
  faBootstrap,
  faCss3,
  faHtml5,
  faJs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SkillsView = () => {
  let skills = {
    frontend: [
      { name: "HTML5", icon: faHtml5, animation: "pulse" },
      { name: "CSS3", icon: faCss3, animation: "pulse" },
      { name: "SASS", icon: faCss3, animation: "pulse" },
      { name: "JavaScript", icon: faJs, animation: "pulse" },
      { name: "TypeScript", icon: faJs, animation: "pulse" },
      { name: "React", icon: faReact, animation: "spin" },
      { name: "Redux", icon: faReact, animation: "spin" },
      { name: "Bootstrap", icon: faBootstrap, animation: "pulse" },
    ],
    backend: [
      { name: "Node.js", icon: faJs, animation: "pulse" },
      { name: "Express", icon: faJs, animation: "pulse" },
      { name: "MongoDB", icon: faJs, animation: "pulse" },
      { name: "SQL", icon: faJs, animation: "pulse" },
      { name: "RESTful APIs", icon: faJs, animation: "pulse" },
      { name: "GraphQL", icon: faJs, animation: "pulse" },
    ],
    other: [
      { name: "Git", icon: faJs, animation: "pulse" },
      { name: "GitHub", icon: faJs, animation: "pulse" },
      { name: "Heroku", icon: faJs, animation: "pulse" },
      { name: "AWS", icon: faJs, animation: "pulse" },
      { name: "Netlify", icon: faJs, animation: "pulse" },
      { name: "CI/CD", icon: faJs, animation: "pulse" },
    ],
  };
  return (
    <div className="row mt-5 ">
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
            <h4 className="text-primary d-flex">{skillType}</h4>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {skills[skillType].map((skill, index) => {
                return (
                  <li
                    key={index}
                    className={`d-flex gap-3 ${
                      skill.animation == "pulse"
                        ? "fa-icon-animation"
                        : "fa-spinning"
                    }`}
                  >
                    <FontAwesomeIcon
                      size="2x"
                      color="red"
                      icon={skill.icon}
                      className="me-2 w-25"
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
