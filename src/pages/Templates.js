import React, { useEffect, useState } from "react";
import moment from "moment";
import { StyledTable, StyledButton, ButtonGroup, TH, TD } from "../components/Styles";
import { ThreeDots } from "react-loader-spinner";
import { get_notebooks } from "../auth/actions/userAction";

const Template = () => {
  const [loaded, setLoaded] = useState(false);
  const [notebooks, setNotebooks] = useState(null);

  const getNotebooks = async () => {
    get_notebooks(setNotebooks, setLoaded);
  };

  useEffect(() => {
    getNotebooks();
  }, []);

  return (
    <main class="main-wrapper">
			<div class="menu-area">
				<div class="menu-item">
					<a href="login"><img src="images/logo.png" alt="" /></a>
				</div>
				<div class="menu-item2">
					<ul>
						<li><a href="projects"><span><img src="images/01.png" /><img src="images/05.png" /></span>Projects</a></li>
						<li><a class="active" href="templates"><span><img src="images/02.png" /><img src="images/06.png" /></span>Templates</a></li>
						<li><a href="#"><span><img src="images/03.png" /><img src="images/07.png" /></span>Reports</a></li>
						<li><a href="#"><span><img src="images/04.png" /></span>Settings</a></li>
					</ul>
				</div>
			</div>
      <div class="content-area">
				<div class="project-area">
					<div class="project-item">
						<div>
							<h2>Templates</h2>
						</div>
						<div>
							<i class="fas fa-bars"></i>
							<p>Welcome, Raouf G.</p>
							<a href="#">Logout</a>
						</div>
					</div>				
				</div>
          {loaded && notebooks && (
            <div class="crypto-area">
              <div class="crypto-item">
            {notebooks.map((notebook) => (
              <div class="crypto-item-inner" key={notebook.id}>
							<div class="crypto-item-inner2">
								<h2>{notebook.name}<span>{moment(notebook.creation_date).format("MMM Do YY")}</span></h2>
								<p> <span></span>{notebook.description}</p>
								<ul>
									<li><a href="#"><img src="images/14.png" /></a></li>
									<li><a href="#"><img src="images/15.png" /></a></li>
								</ul>
							</div>
						</div>
            ))}
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

export default Template;