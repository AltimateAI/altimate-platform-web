import { Field, Formik } from "formik";
import Iframe from './Iframe';
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { add_comment, get_html_table } from "../auth/actions/userAction";
import * as Yup from 'yup'
const HtmlContent = () => {  
  const [searchParams, setSearchParams] = useSearchParams();
  const public_id = searchParams.get("content");
  const [table, setTable] = useState(false)
  const [html_id, setHtml_id] = useState(false)
  const [comments, setComments] = useState(false)

  useEffect(() => {
    get_html_table(public_id, setTable, setHtml_id, setComments)
  }, [get_html_table, public_id, setTable, setHtml_id, setComments]);

  return (
    <main class="main-wrapper">
        <div class="menu-area">
          <div class="menu-item">
            <a href="#"><img src="images/logo.png" alt="" /></a>
          </div>
          <div class="menu-item2">
					<ul>
						<li><a href="https://altimateai.github.io/altimate-platform-web/projects"><span><img src="images/01.png" /><img src="images/05.png" /></span>Projects</a></li>
						<li><a href="https://altimateai.github.io/altimate-platform-web/templates"><span><img src="images/02.png" /><img src="images/06.png" /></span>Templates</a></li>
						<li><a class="active" href="https://altimateai.github.io/altimate-platform-web/reports"><span><img src="images/03.png" /><img src="images/07.png" /></span>Reports</a></li>
						<li><a href="https://altimateai.github.io/altimate-platform-web/settings"><span><img src="images/04.png" /></span>Settings</a></li>
					</ul>
          </div>
        </div>
        <div class="content-area">
          <div class="project-area">
            <div class="project-item">
              <div>
                <h2>Data Summary</h2>
              </div>
              <div>
                <i class="fas fa-bars"></i>
                <p>Welcome</p>
                <a href="#">Logout</a>
              </div>
            </div>					
          </div>
          <div class="update-area">
            <div class="update-item">
            </div>
            {table && (
              <Iframe content={table} />
            )}
          {table && comments && html_id && (
            <>
            <div class="update-item3">
                <h2>Comments</h2>
            </div>            
            {comments.map((comment) => (
              <div class="update-item3">
                <h3>Raouf G. <span>{moment(comment.creation_date).format("MMM Do YY")}</span></h3>
                <p>{comment.text}</p>
              </div>              
            ))}
                  <div class="update-item5">
                    <Formik
                        initialValues={{
                            html_id: html_id,
                            text: "",
                        }}
                        validationSchema={
                            Yup.object({
                              text: Yup.string()
                                    .required("Comment required")
                            })
                        }
                        onSubmit={(values, {}) => {
                            add_comment(values, setComments);
                        }}
                        >
                           {( {handleSubmit} ) => (
                            <form onSubmit={handleSubmit}>
                              <Field name="text" as="textarea" placeholder="Type your comment here"></Field>
                              <button type="submit">Send</button>
                            </form>                       
                          )}
                    </Formik>
                  </div>
              </>
          )}
        </div>
      </div>
    </main>
  );
};

export default HtmlContent;