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
    )
}

export default ConfirmationEmail;