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

import {Formik, Form} from 'formik';
import { TextInput } from "../components/FormLib";
import { FiMail, FiLock } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';

import { connect } from "react-redux";
import { forgottenPassword } from "../auth/actions/userAction";
import { useNavigate } from "react-router-dom";

const ForgottenPassword = ({forgottenPassword}) => {
    const navigate = useNavigate();
    return (
        <div>
            <StyledFormAread>
                <Avatar image={Logo} widthSize={200} heightSize={50}/>
                <StyledTitle color={colors.dark1} size={30}>
                    Reset Password
                </StyledTitle>
                <Formik
                    initialValues={{
                        email: ""
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
                    {( {isSubmitting} ) => (
                        <Form>
                            <TextInput
                                name="email"
                                type="text"
                                label="Your Email Address"
                                placeholder="member@altimate.ai"
                                icon={<FiMail/>}
                            />
                            <ButtonGroup>
                                {!isSubmitting && (
                                        <StyledFormButton type="submit">
                                            Send Email
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
            </StyledFormAread>
            <CopyrightText>
                All rights reserved &copy;2022 by Altimate.ai
            </CopyrightText>
        </div>
    )
}

export default connect(null, {forgottenPassword})(ForgottenPassword);