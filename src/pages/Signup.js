import * as Yup from 'yup'

import {Formik, Field, ErrorMessage} from 'formik'

import { connect } from "react-redux";
import { signupUser } from "../auth/actions/userAction";
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const navigate = useNavigate();
    return (
        <div class="login-area">
			<div class="login-item2">
				<a href="altimate-platform-web/login"><img src="images/logo.png" alt="" /></a>
			</div>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirm_password: ""
                    }}
                    validationSchema={
                        Yup.object({
                            name: Yup.string()
                                .required("Required field"),
                            email: Yup.string()
                                .email("Invalid email address")
                                .required("Required field"),
                            password: Yup.string()
                                .min(3, "Password is too short")
                                .max(30, "password is too long")
                                .required("Required field"),
                            confirm_password: Yup.string()
                                .required("Required field")
                                .oneOf([Yup.ref("password")], "Passwords must match")
                        })
                    }
                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        console.log(values)
                        signupUser(values, navigate, setFieldError, setSubmitting);
                    }}
                >
                    {( {handleSubmit} ) => (
                        <div class="login-item">
                        <div class="login-item-inner">
                            <form onSubmit={handleSubmit}>
                                <div class="login-item-inner2">
                                    <h3>Welcome to <a href="login">Altimate AI</a></h3>
                                    <div>
                                        <p>Have an Account ?<br></br><a href="login">Sign in</a></p>
                                    </div>
                                </div>
                                <h2>Sign up</h2>
                                <label>Enter your email address</label>
                                <Field name="email" type="email"/>
                                <ErrorMessage name="email" component="div" />
                                <label>Enter your name</label>
                                <Field name="name" type="text"/>
                                <ErrorMessage name="name" component="div" />
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
                                <label>Confirm  Password</label>
                                <div class="login-item-inner4">
                                    <Field name="confirm_password" type="password" id="txtConfirmPassword"/>
                                        <button type="button" onClick={() => {
                                                    var type = document.getElementById('txtConfirmPassword').type;
                                                    document.getElementById('txtConfirmPassword').type = type === 'password' ? 'text' : 'password';
                                                }
                                            }
                                               class="toggle">
                                        <i id="eyeIcon" class="fa fa-eye"></i>
                                        </button>
                                </div>
                                <ErrorMessage name="confirm_password" component="div" />
                                <button type="submit">Sign up</button>
                            </form>
                        </div>
                    </div>
                    )}
                </Formik>
            </div>
    )
}

export default connect(null, {signupUser})(Signup);