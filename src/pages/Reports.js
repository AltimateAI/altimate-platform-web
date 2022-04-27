import React, { useEffect, useState } from "react";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";
import { logoutUser } from "../auth/actions/userAction";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Report = ({logoutUser}) => {
  const navigate = useNavigate();
  const [reports, setReports] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);

  const getReports = async () => {
    //get_my_reports(setProjects, setErrorMessage, setLoaded);
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <main class="main-wrapper">
			<div class="menu-area">
				<div class="menu-item">
					<a href="reports"><img src="images/logo.png" alt="" /></a>
				</div>
				<div class="menu-item2">
					<ul>
						<li><a href="projects"><span><img src="images/01.png" /><img src="images/05.png" /></span>Projects</a></li>
						<li><a href="templates"><span><img src="images/02.png" /><img src="images/06.png" /></span>Templates</a></li>
						<li><a class="active" href="reports"><span><img src="images/03.png" /><img src="images/07.png" /></span>Reports</a></li>
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
							<h2>Reports</h2>
						</div>
						<div>
							<i class="fas fa-bars"></i>
							<p>Welcome, Raouf G.</p>
							<a href="#" onClick={() => logoutUser(navigate)}>Logout</a>
						</div>
					</div>					
				</div>
      {loaded && reports && (
        <div class="project-item3 project-item5">
          <div class="table-responsive">
            <table cellPadding="0">
              <thead>
                <tr>
                  <th><span>Report Name</span></th>
									<th><span>Project Name</span></th>
									<th><span>Last Updated</span></th>
									<th><span>Latest Comments <img src="images/08.png" /></span></th>
									<th><span>Action</span></th>
                </tr>
              </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                  <td style="color: #1093F3;">Data summary</td>
									<td>Housing Price</td>
									<td>{moment(report.creation_date).format("MMM Do YY")}</td>
									<td style="color: #1093F3;">{moment(report.creation_date).format("MMM Do YY")}</td>
									<td>
										<ul>
											<li><a href="#"><img src="images/10.png" /></a></li>
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

export default connect(mapStateToProps, {logoutUser})(Report);
