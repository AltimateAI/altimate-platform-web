import { Avatar, ButtonGroup, colors, ExtraText, StyledButton, StyledFormArea, StyledTitle } from "../components/Styles";
import Logo from "./../assets/logo.png";
import { confirmEmail } from "../auth/actions/userAction";
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react";

const ConfirmationEmail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const confirmation_code = searchParams.get("confirmation_code");

    useEffect(() => {
        confirmEmail(confirmation_code);
    }, [confirmEmail, confirmation_code]);
    
    return (
        <div class="login-area">
			<div class="login-item2">
				<a href="home"><img src="images/logo.png" alt="" /></a>
			</div>
        <div>
                <StyledFormArea bg={colors.dark2}>
                <StyledTitle size={50}>
                    Your email is validated
                </StyledTitle>
                <ButtonGroup>
                    <StyledButton to="/login">
                        Proceed
                    </StyledButton>
                </ButtonGroup>
                </StyledFormArea>      
        </div>
        </div>
    )
}

export default ConfirmationEmail;