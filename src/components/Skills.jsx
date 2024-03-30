import {
  faBootstrap,
  faCss3,
  faHtml5,
  faJs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import tsLogo from "../assets/ts.png";
import js from "../assets/js.png";
import react from "../assets/react.png";
import html from "../assets/html.png";
import css from "../assets/css.png";
import sass from "../assets/sass.png";
import redux from "../assets/redux.png";
import bootstrap from "../assets/bootstrap.jpg";
import agile from "../assets/agile.png";
import aws from "../assets/aws.png";
import jest from "../assets/jest.png";
import vitest from "../assets/vitest.png";
import mailjet from "../assets/mailjet.png";
import mongo from "../assets/mongo.png";
import multer from "../assets/multer.png";
import sql from "../assets/sql.png";
import stripe from "../assets/stripe.png";
import rest from "../assets/rest.jpg";
import jwt from "../assets/jwt.png";
import mui from "../assets/mui.png";
import git from "../assets/git.png";
import github from "../assets/github.png";
import passport from "../assets/passport.png";
import node from "../assets/node.png";
import next from "../assets/next.png";
import express from "../assets/express.png";
import heroku from "../assets/heroku.png";
import netlify from "../assets/netlify.png";
import render from "../assets/render.png";
import graphql from "../assets/graphql.png";
import apollo from "../assets/apollo.png";
import { faJ } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkillsView from "./SkillsView";
import { useState } from "react";
import SkillsGame from "./SkillsGame";

const Skills = ({ handleConfettiExplosion }) => {
  let skills = {
    frontend: [
      { name: "JavaScript", logo: js, animation: "pulse" },
      { name: "TypeScript", logo: tsLogo, animation: "pulse" },
      { name: "React", logo: react, animation: "spin" },
      { name: "Redux", logo: redux, animation: "spin" },
      { name: "HTML5", logo: html, animation: "pulse" },
      { name: "CSS3", logo: css, animation: "pulse" },
      { name: "SASS", logo: sass, animation: "pulse" },
      { name: "Bootstrap", logo: bootstrap, animation: "pulse" },
      { name: "Material UI", logo: mui, animation: "pulse" },
      { name: "Apollo Client", logo: apollo, animation: "pulse" },
    ],
    backend: [
      { name: "SQL", logo: sql, animation: "pulse" },
      { name: "MongoDB", logo: mongo, animation: "pulse" },
      { name: "Apollo Server", logo: apollo, animation: "pulse" },
      { name: "Node.js", logo: node, animation: "pulse" },
      { name: "Next.js", logo: next, animation: "pulse" },
      { name: "Express", logo: express, animation: "pulse" },
      { name: "RESTful APIs", logo: rest, animation: "pulse" },
      { name: "JWT", logo: jwt, animation: "pulse" },
      { name: "Passport Session", logo: passport, animation: "pulse" },
    ],
    ["General Development Tools"]: [
      { name: "AWS", logo: aws, animation: "pulse" },
      { name: "Jest Testing", logo: jest, animation: "pulse" },
      { name: "Vitest Testing", logo: vitest, animation: "pulse" },
      { name: "Git", logo: git, animation: "pulse" },
      { name: "GitHub", logo: github, animation: "pulse" },
      { name: "GraphQL", logo: graphql, animation: "pulse" },

      { name: "Agile", logo: agile, animation: "pulse" },
      { name: "Heroku", logo: heroku, animation: "pulse" },
      { name: "Netlify", logo: netlify, animation: "pulse" },
      { name: "Render", logo: render, animation: "pulse" },
      { name: "Stripe", logo: stripe, animation: "pulse" },
    ],
  };
  const [selectedView, setSelectedView] = useState(null);
  return (
    <section className=" pt-6 pb-3 text-center min-vh-100" id="skills">
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
        {selectedView === "skills" && <SkillsView skills={skills} />}
        {/* game - game component */}
        {selectedView === "game" && (
          <SkillsGame
            handleConfettiExplosion={handleConfettiExplosion}
            skills={skills}
          />
        )}
      </div>
    </section>
  );
};

export default Skills;
