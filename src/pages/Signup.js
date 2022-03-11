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

const Signup = () => {
    return (
        <div>
            <StyledFormAread>
                <Avatar image={Logo} widthSize={200} heightSize={50}/>
                <StyledTitle color={colors.dark1} size={30}>
                    Member Signup
                </StyledTitle>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    }}
                    validationSchema={
                        Yup.object({
                            name: Yup.string()
                                .required("Required field"),
                            email: Yup.string()
                                .email("Invalid email address")
                                .required("Required field"),
                            password: Yup.string()
                                .min(8, "Password is too short")
                                .max(30, "password is too long")
                                .required("Required field"),
                            confirmPassword: Yup.string()
                                .required("Required field")
                                .oneOf([Yup.ref("password")], "Passwords must match")
                        })
                    }
                    onSubmit={(values, {setSubmitting}) => {
                        console.log(values)
                        //setSubmitting(false)
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
                                name="confirmPassword"
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
            </StyledFormAread>
            <CopyrightText>
                All rights reserved &copy;2022 by Altimate.ai
            </CopyrightText>
        </div>
    )
}

export default Signup;