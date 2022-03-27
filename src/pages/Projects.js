import React, { useEffect, useState } from "react";
import moment from "moment";
import ProjectModal from "./ProjectModal";
import { delete_project, get_my_projects, get_project } from "../auth/actions/userAction";
import ErrorMessage from "./ErrorMessage";
import { StyledTable, StyledButton, ButtonGroup, colors, Avatar, TH, TD } from "../components/Styles";
import { ThreeDots } from "react-loader-spinner";

const Project = () => {
  const [projects, setProjects] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [id, setId] = useState(null);
  const [project, setProject] = useState(null);

  const handleUpdate = async (id) => {
    setId(id);
    get_project(id, setProject, setActiveModal);
  };

  const handleDelete = async (id) => {
    delete_project(id, setErrorMessage, setLoaded, setProjects);
  };

  const getProjects = async () => {
    get_my_projects(setProjects, setErrorMessage, setLoaded);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const closeModal = () => {
    setActiveModal(false);
    getProjects();
    setId(null);
    setProject(null);
  };

  return (
    <>
      {activeModal && (
          <ProjectModal
            active={activeModal}
            closeModal={closeModal}
            id={id}
            project={project}
            setErrorMessage={setErrorMessage}
        />
      )}
      {!activeModal && (
          <StyledButton
            to="#"
            onClick={() => setActiveModal(true)}>
                Create Project
          </StyledButton>
      )}
      <ErrorMessage message={errorMessage} />        
      {loaded && projects && !activeModal && (
        <StyledTable className="table is-fullwidth">
          <thead>
            <tr>
              <TH>Name</TH>
              <TH>Creation date</TH>
              <TH>Description</TH>
              <TH>Actions</TH>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <TD>{project.name}</TD>
                <TD>{moment(project.creation_date).format("MMM Do YY")}</TD>
                <TD>{project.description}</TD>
                <TD>
                  <ButtonGroup>
                    <StyledButton
                      to="#"
                      onClick={() => handleUpdate(project.id)}
                      backgroundcolor="green"
                      width={85}
                    >
                      Update
                    </StyledButton>
                    <StyledButton
                      to="#"
                      onClick={() => handleDelete(project.id)}
                      backgroundcolor="red"
                      width={80}
                    >
                      Delete
                    </StyledButton>
                  </ButtonGroup>                  
                </TD>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )} 
      {!loaded && (
        <ThreeDots
          color="white"
          height={49}
          width={100}
        />
      )}
    </>
  );
};

export default Project;