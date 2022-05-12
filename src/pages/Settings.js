import React, { useEffect, useState } from "react";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";
import { logoutUser } from "../auth/actions/userAction";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { generateSdkAccessKey, get_my_SdkAccessKeys } from "../auth/actions/userAction";

const Setting = ({logoutUser}) => {
  const navigate = useNavigate();
  const [keys, setKeys] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);

  const getKeys = async () => {
    get_my_SdkAccessKeys(setKeys, setLoaded);
  };

  useEffect(() => {
    getKeys();
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
						<li><a href="reports"><span><img src="images/03.png" /><img src="images/07.png" /></span>Reports</a></li>
						<li><a class="active" href="settings"><span><img src="images/04.png" /></span>Settings</a></li>
					</ul>
				</div>
			</div>
			<div class="menu-area2">
				<i class="fas fa-times"></i>
				<div class="menu-item">
					<a href="#"><img src="images/logo.png" alt="" /></a>
				</div>
			</div>
      <div class="content-area">
				<div class="project-area">
					<div class="project-item">
						<div>
							<h2>Settings</h2>
						</div>
						<div>
							<i class="fas fa-bars"></i>
							<p>Welcome</p>
							<a href="#" onClick={() => logoutUser(navigate)}>Logout</a>
						</div>
					</div>
          <div class="project-item2 project-item20">
						<h2>Access Keys</h2>
						<a href="#" onClick={() => generateSdkAccessKey(setKeys, setLoaded)}>Generate Access Key</a>
					</div>				
				</div>
      {loaded && keys && (
        <div class="project-item3 project-item5">
          <div class="table-responsive">
            <table cellPadding="0">
              <thead>
                <tr>
                  <th><span>Key</span></th>
									<th><span>Status</span></th>
									<th><span>Created <img src="images/08.png" /></span></th>
									<th><span>Action</span></th>
                </tr>
              </thead>
          <tbody>
            {keys.map((key) => (
              <tr>
              <td>{key.access_key}</td>
              <td>{key.access_key_status}</td>
              <td>{moment(key.creation_date).format("MMM Do YY")}</td>
              <td>
                <ul>
                  <li><a href="#"><img src="images/16.png" /></a></li>
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

export default connect(mapStateToProps, {logoutUser})(Setting);
