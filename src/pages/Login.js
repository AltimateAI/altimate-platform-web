import * as Yup from 'yup'

import {Formik, Field, ErrorMessage} from 'formik'

import { connect } from "react-redux";
import { loginUser } from "../auth/actions/userAction";
import { useNavigate } from "react-router-dom"

const Login = ({loginUser}) => {
    const navigate = useNavigate();
    return (
		<div class="login-area">
			<div class="login-item2">
				<a href="/altimate-platform-web/home"><img src="images/logo.png" alt="" /></a>
			</div>
			<Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                        validationSchema={
                            Yup.object({
                                email: Yup.string()
                                    .email("Invalid email address")
                                    .required("Required field"),
                                password: Yup.string()
                                    .min(3, "Password is too short")
                                    .max(30, "password is too long")
                                    .required("Required field")
                            })
                        }
                        onSubmit={(values, {setSubmitting, setFieldError}) => {
                            console.log(values)
                            loginUser(values, navigate, setFieldError, setSubmitting);
                        }}
                    >
                        {({ handleSubmit,
                            isSubmitting, 
                        }) => (
                        <div class="login-item">
				            <div class="login-item-inner">
                                <form onSubmit={handleSubmit}>
                                    <div class="login-item-inner2">
                                        <h3>Welcome to <a href="/altimate-platform-web/home">Altimate AI</a></h3>
                                        <div>
                                            <p>No Account ?<br></br><a href="/altimate-platform-web/signup">Sign up</a></p>
                                        </div>
                                    </div>
                                    <h2>Sign in</h2>
                                    <label>Enter your email address</label>
                                    <Field name="email" type="email"/>
                                    <ErrorMessage name="email" component="div" />
                                    <label>Enter your Password</label>
                                    <div class="login-item-inner4">
                                            <Field name="password" type="password" id="txtPassword"/>
                                            <button type="button" onClick={() => {
                                                    var type = document.getElementById('txtPassword').type;
                                                    document.getElementById('txtPassword').type = type === 'password' ? 'text' : 'password';
                                                }
                                            }
                                            class="toggle">
                                            <i id="eyeIcon" class="fa fa-eye"></i>
                                        </button>
                                    </div>
                                    <ErrorMessage name="password" component="div" />
                                    <div class="login-item-inner5">
                                            <a href="/altimate-platform-web/forgottenPassword">Forgot Password</a>
                                        </div>
                                    <button type="submit" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                )}
            </Formik>
	</div>
    )
}

export default connect(null, {loginUser})(Login);