import {
  faBootstrap,
  faCss3,
  faHtml5,
  faJs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { faJ } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkillsView from "./SkillsView";
import { useState } from "react";
import SkillsGame from "./SkillsGame";

const Skills = ({ handleConfettiExplosion }) => {
  const [selectedView, setSelectedView] = useState(null);
  return (
    <section className="my-6 text-center min-vh-100">
      <div className="container">
        <div className="text-center">
          <h4 className="text-uppercase fw-bold text-primary">Skills</h4>
          <hr className="w-25 mx-auto" />
          <h2 className="mb-4">Time for the important stuff. What can I do?</h2>

          <div className="d-flex justify-content-center gap-4">
            <div
              className={`btn btn-outline-primary skills-choice-button ${
                selectedView === "skills" ? "active" : ""
              }`}
              onClick={() => setSelectedView("skills")}
            >
              View Skills
            </div>
            <div style={{ width: "3px", background: "lightgrey" }}></div>
            <div
              className={`btn btn-outline-primary skills-choice-button ${
                selectedView === "game" ? "active" : ""
              }`}
              onClick={() => setSelectedView("game")}
            >
              Make it a game
            </div>
          </div>
        </div>
        {/* show one or the other */}
        {/* skills - 3 columns of frontend, backend, other */}
        {selectedView === "skills" && <SkillsView />}
        {/* game - game component */}
        {selectedView === "game" && (
          <SkillsGame handleConfettiExplosion={handleConfettiExplosion} />
        )}
      </div>
    </section>
  );
};

export default Skills;
