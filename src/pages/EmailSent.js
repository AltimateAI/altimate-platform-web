import { useLocation } from "react-router-dom";
import { Avatar, ButtonGroup, colors, ExtraText, StyledButton, StyledFormArea, StyledTitle } from "../components/Styles";
import Logo from "./../assets/logo.png";

const EmailSent = () => {
    const {state} = useLocation();
    const {user_email, reset} = state;
    return (
        <div class="login-area">
			<div class="login-item2">
				<a href="home"><img src="images/logo.png" alt="" /></a>
			</div>
            <div>
                <Avatar image={Logo} />
            </div>
            {!reset && user_email && (
                <StyledFormArea bg={colors.dark2}>
                <StyledTitle size={65}>
                    Account Confirmation
                </StyledTitle>
                <ExtraText color={colors.light1}>
                    An email with your account confirmation link has been sent to your email:
                    <b style={{ color: colors.primary}}>{user_email}</b>
                </ExtraText>
                <ExtraText color={colors.light1}>
                    Check your email and come back to proceed
                </ExtraText>
                <ButtonGroup>
                    <StyledButton to="/login">
                        Proceed
                    </StyledButton>
                </ButtonGroup>
                </StyledFormArea>
            )}
            {reset && user_email && (
                <StyledFormArea bg={colors.dark2}>
                <StyledTitle size={65}>
                    Reset Password
                </StyledTitle>
                <ExtraText color={colors.light1}>
                    An email with a reset password link has been sent to your email:
                    <b style={{ color: colors.primary}}>{user_email}</b>
                </ExtraText>
                </StyledFormArea>
            )}
            {!reset && !user_email && (
                <StyledFormArea bg={colors.dark2}>
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
                </StyledFormArea>
            )}
            
        </div>
    )
}

export default EmailSent;