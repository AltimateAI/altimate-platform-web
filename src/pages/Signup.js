import { StyledFormButton, StyledFormArea, 
    StyledTextInput, StyledLabel, 
    StyledTitle, Avatar, colors,
    ButtonGroup,
    StyledButton,
    ExtraText,
    TextLink,
    CopyrightText
} from "../components/Styles";
import Logo from "./../assets/logo.png";
import * as Yup from 'yup'

import {Formik, Form} from 'formik'
import { TextInput } from "../components/FormLib";
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';

import { connect } from "react-redux";
import { signupUser } from "../auth/actions/userAction";
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const navigate = useNavigate();
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} widthSize={200} heightSize={50}/>
                <StyledTitle color={colors.dark1} size={30}>
                    User Signup
                </StyledTitle>
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
                    {( {isSubmitting} ) => (
                        <Form>
                            <TextInput
                                name="name"
                                type="text"
                                label="Full Name"
                                placeholder="Raouf Ghrissi"
                                icon={<FiUser/>}
                            />
                            <TextInput
                                name="email"
                                type="text"
                                label="Email Address"
                                placeholder="member@altimate.ai"
                                icon={<FiMail/>}
                            />
                            <TextInput
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="***********"
                                icon={<FiLock/>}
                            />
                            <TextInput
                                name="confirm_password"
                                type="password"
                                label="Confirm Password"
                                placeholder="***********"
                                icon={<FiLock/>}
                            />
                            <ButtonGroup>
                                {!isSubmitting && (
                                        <StyledFormButton type="submit">
                                            Signup
                                        </StyledFormButton>
                                    ) 
                                 }

                                {isSubmitting && (
                                        <ThreeDots
                                            color={colors.dark2}
                                            height={49}
                                            width={100}
                                        />
                                    )
                                }
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <ExtraText>
                    Already have an account ? <TextLink to="/login">Login</TextLink>
                </ExtraText>
            </StyledFormArea>
            <CopyrightText>
                All rights reserved &copy;2022 by Altimate.ai
            </CopyrightText>
        </div>
    )
}

export default connect(null, {signupUser})(Signup);