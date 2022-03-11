import { StyledTitle, StyledSubTitle, Avatar, 
    StyledButton, ButtonGroup, colors, CopyrightText 
} from "../components/Styles";
import Logo from "./../assets/logo.png";

const Dashbord = () => {
    return ( 
        <div>
            <div>
                <StyledTitle size={50} color={colors.light1}>
                    Welcome to Altimate ai
                </StyledTitle>
                <StyledSubTitle size={28}>
                    Feel free to explore our library
                </StyledSubTitle>
                <ButtonGroup>
                    <StyledButton to="#">Logout</StyledButton>
                </ButtonGroup>
            </div>
            <div style={{"margin-bottom": "0px"}}>
                <CopyrightText>
                    All rights reserved &copy;2022 by Altimate.ai
                </CopyrightText>
            </div>
        </div>
    )
}

export default Dashbord;