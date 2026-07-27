import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TidbitBanner = ({ currentSkill }) => {
  const [displaySkill, setDisplaySkill] = useState(currentSkill);
  const [prevSkill, setPrevSkill] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (currentSkill && (!displaySkill || currentSkill.id !== displaySkill.id)) {
      setPrevSkill(displaySkill);
      setDisplaySkill(currentSkill);
      setIsAnimating(true);

      const timer = setTimeout(() => {
        setPrevSkill(null);
        setIsAnimating(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [currentSkill]);

  if (!displaySkill && !prevSkill) return null;

  const renderSkillContent = (skill) => (
    <div className="d-flex flex-column gap-2 w-100">
      {/* 1. Trivia Tidbit Section */}
      {skill.tidbit && (
        <div className="skill-tidbit-banner alert text-start shadow-sm rounded-4 px-4 py-3 mb-0">
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="fs-5">💡</span>
            <strong className="text-dark fs-6">
              Did you know? ({skill.name})
            </strong>
          </div>
          <p className="mb-0 text-dark fs-6">{skill.tidbit}</p>
        </div>
      )}

      {/* 2. Experience / Tooltip Content Section */}
      {(skill.company || skill.description) && (
        <div className="skill-experience-banner alert text-start shadow-sm rounded-4 px-4 py-3 mb-0">
          <div className="d-flex align-items-center justify-content-between mb-1 flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
              <span className="fs-5">💼</span>
              <strong className="text-dark fs-6">
                Where & How I Used It ({skill.name}):
              </strong>
            </div>
            {skill.company && (
              <span className="badge bg-primary text-white rounded-pill px-3 py-1 fs-7">
                {skill.company}
              </span>
            )}
          </div>
          {skill.description && (
            <p className="mb-0 text-dark fs-6">{skill.description}</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="tidbit-slider-container">
      {prevSkill && (
        <div
          key={`prev-${prevSkill.id}`}
          className="skill-banner-wrapper skill-tidbit-banner-exit tidbit-slide-out-left"
        >
          {renderSkillContent(prevSkill)}
        </div>
      )}

      {displaySkill && (
        <div
          key={`curr-${displaySkill.id}`}
          className={`skill-banner-wrapper skill-tidbit-banner-entry ${
            isAnimating ? "tidbit-slide-in-right" : ""
          }`}
        >
          {renderSkillContent(displaySkill)}
        </div>
      )}
    </div>
  );
};

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
          icon: skill.logo,
          company: skill.company,
          description: skill.description,
          tidbit: skill.tidbit,
        };
      });
    });

    return result;
  }

  const [skills, setSkills] = useState(transformSkills(propsSkills));
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [lastPlacedSkill, setLastPlacedSkill] = useState(null);
  const [skillsKeys, setSkillsKeys] = useState(
    Object.keys(skills).sort(() => Math.random() - 0.5)
  );

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (
      result.destination.droppableId !== skills[result.draggableId].category &&
      result.destination.droppableId !== "skills"
    )
      return;

    let selectedItem = {
      ...skills[result.draggableId],
      currentLocation: result.destination.droppableId,
    };
    const items = { ...skills, [result.draggableId]: selectedItem };
    if (result.destination.droppableId !== "skills") {
      setLastPlacedSkill(selectedItem);
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
    <div className="py-2">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="col-md-12">
          <Droppable droppableId={"skills"}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`skills-game-container my-4 ${
                  snapshot.isDraggingOver ? "is-dragging-over" : ""
                }`}
              >
                <div className="d-flex align-items-center justify-content-center gap-3 mb-3 flex-wrap">
                  <h4 className="chases-skills-title mb-0 fs-3">Chase's Skills</h4>
                  <span className="skill-count-badge">
                    {unplacedSkills.length} remaining
                  </span>
                </div>
                
                <div className="buttons-container text-start d-flex justify-content-center flex-wrap gap-2">
                  {unplacedSkills
                    .sort((a, b) => a.localeCompare(b))
                    .map((key, index) => (
                      <Draggable key={key} draggableId={key} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`skill-badge-item skill-tooltip-container ${
                              snapshot.isDragging ? "is-dragging" : ""
                            }`}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div className="skill-icon-wrapper">
                              <img
                                src={skills[key].icon}
                                alt={skills[key].name}
                              />
                            </div>
                            <span>{skills[key].name}</span>

                            {!snapshot.isDragging && skills[key].description && (
                              <div className="skill-tooltip">
                                {skills[key].company && (
                                  <div className="tooltip-company">
                                    {skills[key].company}
                                  </div>
                                )}
                                <div className="tooltip-desc">
                                  {skills[key].description}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
                {provided.placeholder}
                <div className="mt-3 text-center">
                  {unplacedSkills.length ? (
                    <p className="fs-5 text-muted fw-semibold mb-3">
                      Drag & drop each skill into its matching category below!
                    </p>
                  ) : (
                    <div className="alert alert-success d-inline-block px-4 py-3 shadow-sm rounded-4 mb-3">
                      <h4 className="alert-heading fw-bold mb-1 text-primary">🎉 Congratulations!</h4>
                      <p className="mb-2 text-dark fs-5">
                        Now you've got a good sense of my tech skills.
                      </p>
                      <a href="#contact" className="btn btn-primary fw-semibold rounded-pill px-4 py-2">
                        Let's talk about how we can work together →
                      </a>
                    </div>
                  )}

                  <TidbitBanner currentSkill={lastPlacedSkill} />
                </div>
              </div>
            )}
          </Droppable>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-3">
          {Object.keys(propsSkills).map((category, index) => (
            <Droppable key={index} droppableId={category}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`skills-category-box flex-fill ${
                    snapshot.isDraggingOver ? "is-dragging-over" : ""
                  }`}
                  style={{ minWidth: "220px" }}
                >
                  <h4 className="fw-bold text-capitalize text-primary border-bottom pb-2 mb-3 text-center">
                    {category}
                  </h4>
                  {skillsKeys
                    .filter((key) => skills[key].currentLocation === category)
                    .map((key, index) => (
                      <Draggable key={key} draggableId={key} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`skill-badge-item skill-tooltip-container ${
                              snapshot.isDragging ? "is-dragging" : ""
                            }`}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div className="skill-icon-wrapper">
                              <img
                                src={skills[key].icon}
                                alt={skills[key].name}
                              />
                            </div>
                            <span>{skills[key].name}</span>

                            {!snapshot.isDragging && skills[key].description && (
                              <div className="skill-tooltip">
                                {skills[key].company && (
                                  <div className="tooltip-company">
                                    {skills[key].company}
                                  </div>
                                )}
                                <div className="tooltip-desc">
                                  {skills[key].description}
                                </div>
                              </div>
                            )}
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
