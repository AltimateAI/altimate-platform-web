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
import { FiMail, FiLock } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';

import { connect } from "react-redux";
import { loginUser } from "../auth/actions/userAction";
import { useNavigate } from "react-router-dom"

const Login = ({loginUser}) => {
    const navigate = useNavigate();
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} widthSize={200} heightSize={50}/>
                <StyledTitle color={colors.dark1} size={30}>
                    User Login
                </StyledTitle>
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
                    {( {isSubmitting} ) => (
                        <Form>
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
                            <ButtonGroup>
                                {!isSubmitting && (
                                        <StyledFormButton type="submit">
                                            Login
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
                    Forgotten password ? <TextLink to="/forgottenPassword">Reset it</TextLink>
                </ExtraText>
                <ExtraText>
                    New here ? <TextLink to="/signup">Signup</TextLink>
                </ExtraText>
            </StyledFormArea>
            <CopyrightText>
                All rights reserved &copy;2022 by Altimate.ai
            </CopyrightText>
        </div>
    )
}

export default connect(null, {loginUser})(Login);