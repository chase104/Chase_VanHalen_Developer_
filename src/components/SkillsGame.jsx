import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SkillsGame = ({ handleConfettiExplosion }) => {
  const [skills, setSkills] = useState({
    html5: {
      id: "html5",
      name: "HTML5",
      category: "frontend",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faHtml5",
    },
    css3: {
      id: "css3",
      name: "CSS3",
      category: "frontend",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faCss3",
    },
    sass: {
      id: "sass",
      name: "SASS",
      category: "frontend",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faCss3",
    },
    javascript: {
      id: "javascript",
      name: "JavaScript",
      category: "frontend",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faJs",
    },
    typescript: {
      id: "typescript",
      name: "TypeScript",
      category: "frontend",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faJs",
    },
    react: {
      id: "react",
      name: "React",
      category: "frontend",
      currentLocation: "skills",
      animation: "spin",
      icon: "faReact",
    },
    redux: {
      id: "redux",
      name: "Redux",
      category: "frontend",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faReact",
    },
    bootstrap: {
      id: "bootstrap",
      name: "Bootstrap",
      category: "frontend",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faBootstrap",
    },
    nodejs: {
      id: "nodejs",
      name: "Node.js",
      category: "backend",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faJs",
    },
    express: {
      id: "express",
      name: "Express",
      category: "backend",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faJs",
    },
    mongodb: {
      id: "mongodb",
      name: "MongoDB",
      category: "backend",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faJs",
    },
    sql: {
      id: "sql",
      name: "SQL",
      category: "backend",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faJs",
    },
    restfulapis: {
      id: "restfulapis",
      name: "RESTful APIs",
      category: "backend",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faJs",
    },
    graphql: {
      id: "graphql",
      name: "GraphQL",
      category: "backend",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faJs",
    },
    git: {
      id: "git",
      name: "Git",
      category: "other",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faJs",
    },
    github: {
      id: "github",
      name: "GitHub",
      category: "other",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faJs",
    },
    heroku: {
      id: "heroku",
      name: "Heroku",
      category: "other",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faJs",
    },
    aws: {
      id: "aws",
      name: "AWS",
      category: "other",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faJs",
    },
    netlify: {
      id: "netlify",
      name: "Netlify",
      category: "other",
      currentLocation: "skills",
      animation: "pulse",
      icon: "faJs",
    },
  });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [skillsKeys, setSkillsKeys] = useState(
    Object.keys(skills).sort(() => Math.random() - 0.5)
  );

  console.log(skills);
  const onDragEnd = (result) => {
    console.log(result);
    console.log(skills[result.draggableId]);
    if (!result.destination) return;
    if (
      result.destination.droppableId !== skills[result.draggableId].category &&
      result.destination.droppableId !== "skills"
    )
      return;
    console.log(skills[result.draggableId]);
    let selectedItem = {
      ...skills[result.draggableId],
      currentLocation: result.destination.droppableId,
    };
    const items = { ...skills, [result.draggableId]: selectedItem };
    if (result.destination.droppableId !== "skills") {
      handleConfettiExplosion({
        clientX: tooltipPosition.x,
        clientY: tooltipPosition.y,
      });
      if (unplacedSkills.length <= 0) {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            handleConfettiExplosion({
              clientX: tooltipPosition.x,
              clientY: tooltipPosition.y,
            });
          }, 250);
        }
      }
    }
    setSkills(items);
  };
  const handleMouseMove = (e) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  let unplacedSkills = skillsKeys.filter(
    (key) => skills[key].currentLocation == "skills"
  );
  return (
    <div className="">
      <DragDropContext onDragEnd={onDragEnd} className="row">
        <div className="col-md-12">
          <Droppable droppableId={"skills"}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  backgroundColor: snapshot.isDraggingOver
                    ? "lightblue"
                    : "lightgrey",
                  padding: 20,
                }}
                className="col-md-12 my-4"
              >
                <h4>Chase's Skills</h4>
                <div className="buttons-container d-flex flex-wrap gap-1">
                  {unplacedSkills.map((key, index) => (
                    <Draggable key={key} draggableId={key} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="w-md-25 w-50"
                          style={{
                            userSelect: "none",
                            padding: 16,
                            borderRadius: "5px",
                            margin: "0 0 8px 0",
                            minHeight: "50px",
                            backgroundColor: snapshot.isDragging
                              ? "#263B4A"
                              : "#456C86",
                            color: "white",
                            maxWidth: 200,
                            ...provided.draggableProps.style,
                          }}
                        >
                          {skills[key].name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
                <div>
                  {unplacedSkills.length ? (
                    "Place the skills in the correct category"
                  ) : (
                    <a href="#projects">
                      {" "}
                      <h3 className="text-primary">
                        Congratulations! Now you can check out my projects
                        below!
                      </h3>
                    </a>
                  )}
                </div>
              </div>
            )}
          </Droppable>
        </div>
        <div className="d-flex justify-content-center gap-3">
          {["frontend", "backend", "other"].map((category, index) => (
            <Droppable key={index} droppableId={category}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? "lightblue"
                      : "lightgrey",
                    padding: 20,
                    paddingBottom: 40,
                    width: 250,
                  }}
                >
                  <h4>{category}</h4>
                  {skillsKeys
                    .filter((key) => skills[key].currentLocation === category)
                    .map((key, index) => (
                      <Draggable key={key} draggableId={key} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: "none",
                              padding: 16,
                              margin: "0 0 8px 0",
                              minHeight: "50px",
                              backgroundColor: snapshot.isDragging
                                ? "#263B4A"
                                : "#456C86",
                              color: "white",
                              ...provided.draggableProps.style,
                            }}
                          >
                            {skills[key].name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default SkillsGame;
