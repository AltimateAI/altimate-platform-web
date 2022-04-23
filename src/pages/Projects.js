import React, { useEffect, useState } from "react";
import moment from "moment";
import ProjectModal from "./ProjectModal";
import { delete_project, get_my_projects, get_project } from "../auth/actions/userAction";
import ErrorMessage from "./ErrorMessage";
import { ThreeDots } from "react-loader-spinner";
import { logoutUser } from "../auth/actions/userAction"; 
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Project = ({logoutUser}) => {
  const navigate = useNavigate();
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
    <main class="main-wrapper">
			<div class="menu-area">
				<div class="menu-item">
					<a href="#"><img src="images/logo.png" alt="" /></a>
				</div>
				<div class="menu-item2">
					<ul>
						<li><a class="active" href="#"><span><img src="images/01.png" /><img src="images/05.png" /></span>Projects</a></li>
						<li><a href="#"><span><img src="images/02.png" /><img src="images/06.png" /></span>Templates</a></li>
						<li><a href="#"><span><img src="images/03.png" /><img src="images/07.png" /></span>Reports</a></li>
						<li><a href="#"><span><img src="images/04.png" /></span>Settings</a></li>
					</ul>
				</div>
			</div>
			<div class="menu-area2">
				<i class="fas fa-times"></i>
				<div class="menu-item">
					<a href="#"><img src="images/logo.png" alt="" /></a>
				</div>
				<div class="menu-item2">
					<ul>
						<li><a class="active" href="#"><span><img src="images/01.png" /><img src="images/05.png" /></span>Projects</a></li>
						<li><a href="#"><span><img src="images/02.png" /><img src="images/06.png" /></span>Templates</a></li>
						<li><a href="#"><span><img src="images/03.png" /><img src="images/07.png" /></span>Reports</a></li>
						<li><a href="#"><span><img src="images/04.png" /></span>Settings</a></li>
					</ul>
				</div>
			</div>
      <div class="content-area">
				<div class="project-area">
					<div class="project-item">
						<div>
							<h2>Projects</h2>
						</div>
						<div>
							<i class="fas fa-bars"></i>
							<p>Welcome, Raouf G.</p>
							<a href="#" onClick={() => logoutUser(navigate)}>Logout</a>
						</div>
					</div>					
				</div>
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
					<div class="project-item2">
            <a data-toggle="modal" onClick={() => setActiveModal(true)} href="#">Add Project</a>
          </div>
      )}
      <ErrorMessage message={errorMessage} />        
      {loaded && projects && !activeModal && (
        <div class="project-item3">
          <div class="table-responsive">
            <table cellpadding="0">
              <thead>
                <tr>
                  <th><span>Project Name</span></th>
                  <th><span>Description</span></th>
                  <th><span>Created</span> </th>
                  <th><span>Last Run <img src="images/08.png" /></span></th>
                  <th><span>Action</span></th>
                </tr>
              </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{moment(project.creation_date).format("MMM Do YY")}</td>
                <td>{moment(project.creation_date).format("MMM Do YY")}</td>
                <td>
									<ul>
										<li><a href="#" onClick={() => handleUpdate(project.id)}><img src="images/09.png" /></a></li>
										<li><a href="#" onClick={() => handleDelete(project.id)}><img src="images/10.png" /></a></li>
									</ul>
								</td>
              </tr>                
            ))}
          </tbody>
          </table>
					</div>
				</div>
      )} 
      {!loaded && (
        <ThreeDots
          color="white"
          height={49}
          width={100}
        />
      )}
      </div>
    </main>
  );
};
const mapStateToProps = ({session}) => ({
  user : session.user
})

export default connect(mapStateToProps, {logoutUser})(Project);
