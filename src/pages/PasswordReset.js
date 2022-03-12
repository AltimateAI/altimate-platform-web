import { StyledFormButton, StyledFormAread, 
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
import { resetPassword } from "../auth/actions/userAction";
import { useSearchParams, useNavigate } from "react-router-dom"

const PasswordReset = ({ resetPassword }) => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const reset_password_code = searchParams.get("reset_password_code");
    console.log(reset_password_code);
    return (
        <div>
            <StyledFormAread>
                <Avatar image={Logo} widthSize={200} heightSize={50}/>
                <StyledTitle color={colors.dark1} size={30}>
                    Reset Password
                </StyledTitle>
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
                    {( {isSubmitting} ) => (
                        <Form>
                            <TextInput
                                name="new_password"
                                type="password"
                                label="Password"
                                placeholder="***********"
                                icon={<FiLock/>}
                            />
                            <TextInput
                                name="confirm_new_password"
                                type="password"
                                label="Confirm Password"
                                placeholder="***********"
                                icon={<FiLock/>}
                            />
                            <ButtonGroup>
                                {!isSubmitting && (
                                        <StyledFormButton type="submit">
                                            Submit
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
            </StyledFormAread>
            <CopyrightText>
                All rights reserved &copy;2022 by Altimate.ai
            </CopyrightText>
        </div>
    )
}

export default connect(null, {resetPassword})(PasswordReset);