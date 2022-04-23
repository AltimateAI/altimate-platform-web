import React, { useEffect, useState } from "react";
import moment from "moment";
import {Formik, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { add_project } from "../auth/actions/userAction";
import { delete_project, get_my_projects, get_project } from "../auth/actions/userAction";
import { ThreeDots } from "react-loader-spinner";
import { logoutUser } from "../auth/actions/userAction";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Project = ({logoutUser}) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [project, setProject] = useState("")
  const [loaded, setLoaded] = useState(false);

  const handleUpdate = async (id) => {
    get_project(id, setProject);
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

  return (
    <main class="main-wrapper">
			<div class="menu-area">
				<div class="menu-item">
					<a href="projects"><img src="images/logo.png" alt="" /></a>
				</div>
				<div class="menu-item2">
					<ul>
						<li><a class="active" href="projects"><span><img src="images/01.png" /><img src="images/05.png" /></span>Projects</a></li>
						<li><a href="templates"><span><img src="images/02.png" /><img src="images/06.png" /></span>Templates</a></li>
						<li><a href="reports"><span><img src="images/03.png" /><img src="images/07.png" /></span>Reports</a></li>
						<li><a href="settings"><span><img src="images/04.png" /></span>Settings</a></li>
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
        
          <Formik
                    initialValues={{
                        name: "",
                        description: "",
                    }}
                    validationSchema={
                        Yup.object({
                            name: Yup.string()
                                .required("Name required")
                        })
                    }
                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        add_project(values, setSubmitting, setFieldError)
                    }}
                >
                    {( {handleSubmit,
                        isSubmitting} ) => (
                      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="description-area">
                        <form onSubmit={handleSubmit}>
                            <h2>Add Project</h2>                          
                            <label>Project Name</label>
                            <Field type="text" name="name" placeholder="Cryptocurrency Project" required />
                            <ErrorMessage name="name" component="div" />
                            <label>Project Description</label>
                            <Field type="text" name="description" placeholder="Coin Analysis of ETH" />
                            <ErrorMessage name="description" component="div" />
                            {!isSubmitting && (
                                <div className="description-item">
                                <div>
                                    <button type="submit">Save</button>
                                </div>
                                <div>
                                    <a data-dismiss="modal" aria-label="Close" href="#">Cancel</a>
                                </div>
                            </div>
                            )}
                            {isSubmitting && (
                                  <ThreeDots
                                color="blue"
                                height={49}
                                width={80}
                                />                            
                            )}
                            
                        </form>
                        </div>
              </div>
            </div>
            </div>  
                    )}
                </Formik>      
  
				<div class="project-item2">
						<a data-toggle="modal" data-target="#exampleModalCenter" href="#">Add Project</a>
					</div>
      {loaded && projects && (
        <div class="project-item3">
          <div class="table-responsive">
            <table cellPadding="0">
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
