import { StyledTitle, StyledSubTitle, Avatar, 
    StyledButton, ButtonGroup, colors, CopyrightText 
} from "../components/Styles";

import { connect } from "react-redux";
import { logoutUser } from "../auth/actions/userAction";
import { useNavigate } from "react-router-dom"

const Dashbord = ({logoutUser, user}) => {
    const navigate = useNavigate();
    return (
        <div>
                <StyledTitle size={50} color={colors.light1}>
                    Welcome {user.user_name}
                </StyledTitle>
                <StyledSubTitle size={28}>
                    Feel free to explore our library
                </StyledSubTitle>
                <ButtonGroup>
                    <StyledButton to="#" onClick={() => logoutUser(navigate)}>Logout</StyledButton>
                </ButtonGroup>
                <CopyrightText>
                    All rights reserved &copy;2022 by Altimate.ai
                </CopyrightText>
        </div>
    )
}

const mapStateToProps = ({session}) => ({
    user : session.user
})

export default connect(mapStateToProps, {logoutUser})(Dashbord);