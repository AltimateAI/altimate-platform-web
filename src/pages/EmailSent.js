import { useLocation } from "react-router-dom";
import { Avatar, ButtonGroup, colors, ExtraText, StyledButton, StyledFormAread, StyledTitle } from "../components/Styles";
import Logo from "./../assets/logo.png";

const EmailSent = () => {
    const {state} = useLocation();
    const {user_email, reset} = state;
    console.log(user_email)
    console.log(reset)
    return (
        <div>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "transparent",
                    width: "100%",
                    padding: "15px",
                    display: "flex",
                    justifyContent: "flex-start"
                }}
            >
                <Avatar image={Logo} />
            </div>
            {reset && user_email && (
                <StyledFormAread bg={colors.dark2}>
                <StyledTitle size={65}>
                    Reset Password
                </StyledTitle>
                <ExtraText color={colors.light1}>
                    An email with a reset password link has been sent to your email:
                    <b style={{ color: colors.primary}}>{user_email}</b>
                </ExtraText>
                </StyledFormAread>
            )}
            {!reset && !user_email && (
                <StyledFormAread bg={colors.dark2}>
                <StyledTitle size={65}>
                    Reset Password
                </StyledTitle>
                <ExtraText color={colors.light1}>
                    Your password has been reset succefully
                </ExtraText>
                <ExtraText color={colors.light1}>
                    Your may login
                </ExtraText>
                <ButtonGroup>
                    <StyledButton to={'/login'}>
                        go to Login
                    </StyledButton>
                </ButtonGroup>
                </StyledFormAread>
            )}
            
        </div>
    )
}

export default EmailSent;