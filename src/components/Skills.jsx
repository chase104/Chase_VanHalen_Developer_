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
import docker from "../assets/docker.png";
import go from "../assets/go.png";
import antigravity from "../assets/antigravity.png";
import agentic from "../assets/agentic.png";
import microservices from "../assets/microservices.png";
import distributed from "../assets/distributed.png";
import gcp from "../assets/gcp.png";
import systemDesign from "../assets/system_design.png";
import tdd from "../assets/tdd.png";
import e2e from "../assets/e2e.png";
import { faJ } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkillsView from "./SkillsView";
import { useState } from "react";
import SkillsGame from "./SkillsGame";

const Skills = ({ handleConfettiExplosion }) => {
  let skills = {
    frontend: [
      { name: "JavaScript", logo: js, animation: "pulse", company: "Catalyst & Playpod", description: "Built high-traffic React & Node web applications for 200,000+ active users.", tidbit: "JavaScript was created in just 10 days in May 1995 by Brendan Eich while at Netscape!" },
      { name: "TypeScript", logo: tsLogo, animation: "pulse", company: "Catalyst", description: "Engineered type-safe frontend components and backend microservices.", tidbit: "TypeScript was created at Microsoft by Anders Hejlsberg, the lead architect behind C#!" },
      { name: "React", logo: react, animation: "spin", company: "Catalyst & Playpod", description: "Architected award-winning SaaS MVPs (Playpod) and frontend UIs for 200,000+ users.", tidbit: "React was originally developed by Jordan Walke at Facebook in 2011 and first deployed on Facebook's News Feed!" },
      { name: "Redux", logo: redux, animation: "spin", company: "Playpod & Catalyst", description: "Managed complex global state and real-time data synchronization in React apps.", tidbit: "Redux was created by Dan Abramov and Andrew Clark in 2015, inspired by Facebook's Flux architecture!" },
      { name: "HTML5", logo: html, animation: "pulse", company: "Catalyst", description: "Structured accessible (WCAG/a11y) semantic interfaces across enterprise platforms.", tidbit: "HTML5 introduced native <video> and <audio> tags in 2014, ending web browser dependence on Flash!" },
      { name: "CSS3", logo: css, animation: "pulse", company: "Catalyst", description: "Crafted modern responsive design systems, flexbox/grid layouts, and custom styling.", tidbit: "CSS was first proposed by Håkon Wium Lie in 1994 while working with Tim Berners-Lee at CERN!" },
      { name: "SASS", logo: sass, animation: "pulse", company: "Catalyst", description: "Architected modular SCSS stylesheet systems and custom Bootstrap component themes.", tidbit: "Sass stands for Syntactically Awesome Style Sheets and was designed by Hampton Catlin in 2006!" },
      { name: "Bootstrap", logo: bootstrap, animation: "pulse", company: "Catalyst", description: "Built responsive UI interfaces and internal tools for enterprise platforms.", tidbit: "Bootstrap was originally created at Twitter by Mark Otto and Jacob Thornton as 'Twitter Blueprint'!" },
      { name: "Material UI", logo: mui, animation: "pulse", company: "Playpod & Catalyst", description: "Created administrative dashboards and accessible component libraries.", tidbit: "Material UI implements Google's Material Design principles inspired by real-world physical paper and ink!" },
    ],
    backend: [
      { name: "Go (Golang)", logo: go, animation: "pulse", company: "Catalyst", description: "Architected high-throughput microservice processing 50,000+ daily uploads using goroutines.", tidbit: "Go was designed at Google by Rob Pike, Ken Thompson (co-creator of Unix), and Robert Griesemer!" },
      { name: "Microservices", logo: microservices, animation: "pulse", company: "Catalyst", description: "Decomposed monolithic backends into resilient Go & Node microservices.", tidbit: "The term 'Microservices' was formalized at a software architecture workshop near Venice in 2011!" },
      { name: "Distributed Systems", logo: distributed, animation: "pulse", company: "Playpod & Catalyst", description: "Provisioned fault-tolerant AWS infrastructure and data pipelines for 200k+ users.", tidbit: "Lamport Timestamps solved clock synchronization in distributed systems and earned Leslie Lamport a Turing Award!" },
      { name: "SQL", logo: sql, animation: "pulse", company: "Parijat Controlware & Playpod", description: "Optimized SQL Server & PostgreSQL queries for real-time analytics with near-zero latency.", tidbit: "SQL (originally SEQUEL) was developed at IBM in the 1970s by Donald Chamberlin and Raymond Boyce!" },
      { name: "MongoDB", logo: mongo, animation: "pulse", company: "Per Scholas & Playpod", description: "Designed NoSQL database schemas and aggregation pipelines for SaaS platforms.", tidbit: "MongoDB's name comes from the word 'humongous' because it was engineered to handle huge data volumes!" },
      { name: "GraphQL", logo: graphql, animation: "pulse", company: "Catalyst", description: "Built efficient API schemas to query complex, high-cardinality relational datasets.", tidbit: "GraphQL was built internally by Facebook in 2012 to power mobile newsfeeds before being open-sourced!" },
      { name: "Node.js", logo: node, animation: "pulse", company: "Catalyst & Playpod", description: "Engineered backend microservices, REST APIs, and automated AI chatbot backends.", tidbit: "Node.js was created by Ryan Dahl in 2009 by combining Google's V8 JavaScript engine with an event loop!" },
      { name: "Next.js", logo: next, animation: "pulse", company: "Catalyst", description: "Developed performant, server-rendered web applications with optimized SEO.", tidbit: "Next.js was created by Vercel (formerly ZEIT) in 2016 to bring seamless server-side rendering to React!" },
      { name: "Express", logo: express, animation: "pulse", company: "Playpod", description: "Architected RESTful backend servers and middleware pipelines for Playpod (Babson Grant & 1st Prize award-winning SaaS platform).", tidbit: "Express is the standard server framework for Node.js and was inspired by Ruby's Sinatra framework!" },
      { name: "RESTful APIs", logo: rest, animation: "pulse", company: "Catalyst", description: "Designed endpoints for high-throughput file processing, AI automated workflows, and third-party integrations.", tidbit: "REST (Representational State Transfer) was defined by Roy Fielding in his 2000 Ph.D. dissertation!" },
      { name: "JWT", logo: jwt, animation: "pulse", company: "Playpod", description: "Implemented secure JSON Web Token authentication and multi-tenant authorization.", tidbit: "JWTs are self-contained, holding all claims inside the token signature without needing DB lookups!" },
      { name: "Passport Session", logo: passport, animation: "pulse", company: "Playpod", description: "Configured session-based authentication and OAuth strategies for SaaS onboarding.", tidbit: "Passport.js supports over 500+ authentication strategies ranging from local passwords to OAuth2!" },
    ],
    ["Cloud & DevOps"]: [
      { name: "GCP", logo: gcp, animation: "pulse", company: "Catalyst", description: "Integrated Google Gemini LLM APIs to deploy automated support chatbots and intelligent automation tools.", tidbit: "Google Cloud grew out of Google App Engine, which launched in 2008 to host apps on Google infra!" },
      { name: "AWS", logo: aws, animation: "pulse", company: "Playpod", description: "Provisioned AWS infrastructure (EC2, S3, RDS) from scratch for Playpod (1st Prize StartUB! & Santander X winner, Babson Grant recipient).", tidbit: "Amazon S3 launched in March 2006 as AWS's first official cloud service and now stores trillions of files!" },
      { name: "Docker", logo: docker, animation: "pulse", company: "Catalyst", description: "Containerized microservices and development environments to ensure consistent CI/CD deployments.", tidbit: "Docker was released in 2013 by Solomon Hykes at dotCloud, revolutionizing Linux container technology!" },
      { name: "Git", logo: git, animation: "pulse", company: "Playpod & Catalyst", description: "Managed Git branching strategies, pull requests, and automated code review workflows.", tidbit: "Linus Torvalds wrote the initial version of Git in just 10 days in April 2005 to manage Linux kernel code!" },
      { name: "GitHub", logo: github, animation: "pulse", company: "Playpod & Catalyst", description: "Integrated GitHub Actions for automated CI/CD pipelines, testing, and security hotfixes.", tidbit: "GitHub's mascot is named 'Mona the Octocat' — a half-octopus, half-cat created by graphic designer Simon Oxley!" },
      { name: "Heroku", logo: heroku, animation: "pulse", company: "Playpod", description: "Deployed early SaaS prototypes with automated database provisioning and cloud hosting.", tidbit: "Heroku was founded in 2007 to pioneer running Ruby on Rails apps via simple `git push heroku main`!" },
      { name: "Netlify", logo: netlify, animation: "pulse", company: "Catalyst", description: "Automated continuous deployment and instant preview builds for production web apps.", tidbit: "Netlify coined the term 'Jamstack' (JavaScript, APIs, Markup) in 2016 to describe modern web stacks!" },
      { name: "Render", logo: render, animation: "pulse", company: "Playpod", description: "Hosted production web services with auto-scaling background workers and zero downtime.", tidbit: "Render won TechCrunch Disrupt Startup Battlefield in 2019 as a modern developer cloud platform!" },
      { name: "Stripe", logo: stripe, animation: "pulse", company: "Playpod", description: "Integrated end-to-end payment processing, SaaS subscriptions, and webhooks.", tidbit: "Stripe was founded by Irish brothers Patrick and John Collison in 2010 to simplify online payments!" },
    ],
    ["Systems & Engineering"]: [
      { name: "Agentic Development", logo: agentic, animation: "pulse", company: "Catalyst", description: "Optimized agentic coding workflows using LLMs, reducing refactors & code fixes by 35%.", tidbit: "Agentic AI workflows allow models to autonomously plan, execute tool calls, and self-correct errors!" },
      { name: "Google Antigravity", logo: antigravity, animation: "pulse", company: "Catalyst", description: "Leveraged cutting-edge agentic development tools for high-velocity software engineering.", tidbit: "Google Antigravity powers AI agentic pair-programming workflows to accelerate complex software builds!" },
      { name: "System Design", logo: systemDesign, animation: "pulse", company: "Catalyst & Playpod", description: "Architected scalable SaaS MVPs and microservice ecosystems handling 200,000+ users.", tidbit: "The CAP Theorem states a distributed system can only guarantee two of three: Consistency, Availability, & Partition Tolerance!" },
      { name: "TDD", logo: tdd, animation: "pulse", company: "Playpod", description: "Practiced Test-Driven Development with Jest, Vitest, and Cypress to eliminate regression bugs.", tidbit: "Test-Driven Development (TDD) follows a strict 'Red-Green-Refactor' cycle popularized by Kent Beck!" },
      { name: "E2E Testing", logo: e2e, animation: "pulse", company: "Playpod & Catalyst", description: "Built comprehensive end-to-end test suites with Cypress & Playwright for critical user flows.", tidbit: "E2E testing simulates full end-user browser interactions down through backend and DB persistence!" },
      { name: "Jest & Vitest Testing", logo: jest, animation: "pulse", company: "Playpod", description: "Implemented unit and integration testing pipelines to validate build velocity and code quality.", tidbit: "Vitest was built natively on top of Vite's transformation engine, running unit tests up to 10x faster!" },
      { name: "Agile", logo: agile, animation: "pulse", company: "Playpod & Catalyst", description: "Directed technical strategy, sprint planning, and code reviews across engineering teams.", tidbit: "The Agile Manifesto was written by 17 developers during a weekend retreat at a ski resort in Utah in 2001!" },
    ],
  };
  const [selectedView, setSelectedView] = useState("skills");
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
