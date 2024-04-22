import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SkillsGame = (props) => {
  let handleConfettiExplosion = props.handleConfettiExplosion;
  let propsSkills = props.skills;
  console.log(propsSkills);
  function transformSkills(skills) {
    const result = {};

    // Iterate through each category
    Object.keys(skills).forEach((category) => {
      skills[category].forEach((skill) => {
        const id = skill.name.toLowerCase().replace(/\s+/g, "");
        result[id] = {
          id: id,
          name: skill.name,
          category: category,
          currentLocation: "skills",
          animation: skill.animation,
          icon: skill.logo, // Directly use the logo provided
        };
      });
    });

    return result;
  }

  const [skills, setSkills] = useState(transformSkills(propsSkills));
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [skillsKeys, setSkillsKeys] = useState(
    Object.keys(skills).sort(() => Math.random() - 0.5)
  );

  console.log({ skills });
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
  console.log({ unplacedSkills });
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
                <div className="buttons-container text-start d-flex justify-content-center flex-wrap gap-1">
                  {unplacedSkills
                    .sort((a, b) => a.localeCompare(b))
                    .map((key, index) => (
                      <Draggable key={key} draggableId={key} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="w-md-25 w-100 w-sm-50"
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
                            <img
                              className="game-img img-fluid"
                              src={skills[key].icon}
                              alt="img"
                            />
                            {skills[key].name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
                {provided.placeholder}
                <div>
                  {unplacedSkills.length ? (
                    <p className="fs-3">
                      Place the skills in the correct category
                    </p>
                  ) : (
                    <h3 className="text-primary">
                      Congratulations! Now you've got a good sense of my tech
                      skills.{" "}
                      <a href="#contact">
                        {" "}
                        Let's talk about how we can work together.
                      </a>
                    </h3>
                  )}
                </div>
              </div>
            )}
          </Droppable>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
          {Object.keys(propsSkills).map((category, index) => (
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
                  className="w-100 w-md-25"
                >
                  <h4>{category[0].toUpperCase() + category.slice(1)}</h4>
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
                            <img
                              className="game-img img-fluid"
                              src={skills[key].icon}
                              alt="img"
                            />
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
