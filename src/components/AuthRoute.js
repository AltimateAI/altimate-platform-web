import {Outlet, Navigate} from 'react-router-dom'
import {connect} from 'react-redux'

const AuthRoute = ({children, authenticated, ...rest}) => {
    return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

const mapStateToProps = ({session}) => ({
    authenticated: session.authenticated
})

export default connect(mapStateToProps)(AuthRoute)