import { StyledTitle, StyledSubTitle, Avatar, 
    StyledButton, ButtonGroup, colors, CopyrightText 
} from "../components/Styles";
import Logo from "./../assets/logo.png";

const Home = () => {
    return ( 
        <div>
            <StyledTitle size={50} color={colors.light1}>
                Welcome to Altimate ai
            </StyledTitle>
            <StyledSubTitle size={28}>
                Feel free to explore our library
            </StyledSubTitle>
            <ButtonGroup>
                <StyledButton to="/login">Login</StyledButton>
                <StyledButton to="/signup">Signup</StyledButton>
            </ButtonGroup>
            <CopyrightText>
                All rights reserved &copy;2022 by Altimate.ai
            </CopyrightText>
        </div>  
    )
}

export default Home;