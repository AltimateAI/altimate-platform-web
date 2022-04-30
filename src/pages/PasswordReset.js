import * as Yup from 'yup'

import {Formik, Field, ErrorMessage} from 'formik'
import { connect } from "react-redux";
import { resetPassword } from "../auth/actions/userAction";
import { useSearchParams, useNavigate } from "react-router-dom"

const PasswordReset = ({forgottenPassword}) => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const reset_password_code = searchParams.get("reset_password_code");
    return (
		<div class="login-area">
			<div class="login-item2">
				<a href="/altimate-platform-web/home"><img src="images/logo.png" alt="" /></a>
			</div>
			<Formik
                initialValues={{
                    new_password: "",
                    confirm_new_password: "",
                    reset_password_code
                }}
                validationSchema={
                    Yup.object({
                        new_password: Yup.string()
                            .min(3, "Password is too short")
                            .max(30, "password is too long")
                            .required("Required field"),
                        confirm_new_password: Yup.string()
                            .required("Required field")
                            .oneOf([Yup.ref("new_password")], "Passwords must match")
                    })
                }
                onSubmit={(values, {setSubmitting, setFieldError}) => {
                    console.log(values)
                    resetPassword(values, navigate, setFieldError, setSubmitting);
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
                                    <label>Enter your Password</label>
                                <div class="login-item-inner4">
                                    <Field name="new_password" type="password" id="txtPassword"/>
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
                                <Field name="confirm_new_password" type="password" id="txtConfirmPassword"/>
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

export default connect(null, {resetPassword})(PasswordReset);