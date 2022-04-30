import * as Yup from 'yup'

import {Formik, Field, ErrorMessage} from 'formik';

import { connect } from "react-redux";
import { forgottenPassword } from "../auth/actions/userAction";
import { useNavigate } from "react-router-dom";

const ForgottenPassword = ({forgottenPassword}) => {
    const navigate = useNavigate();
    return (
		<div class="login-area">
			<div class="login-item2">
				<a href="/altimate-platform-web/home"><img src="images/logo.png" alt="" /></a>
			</div>
			<Formik
                initialValues={{
                    email: "",
                }}
                        validationSchema={
                            Yup.object({
                                email: Yup.string()
                                    .email("Invalid email address")
                                    .required("Required field")
                            })
                        }
                        onSubmit={(values, {setSubmitting, setFieldError}) => {
                            forgottenPassword(values, navigate, setFieldError, setSubmitting);
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
                                    <h2>Reset Password</h2>
                                    <label>Enter your email address</label>
                                    <Field name="email" type="email"/>
                                    <ErrorMessage name="email" component="div" />
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

export default connect(null, {forgottenPassword})(ForgottenPassword);