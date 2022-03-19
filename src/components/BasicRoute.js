import {Outlet, Navigate} from 'react-router-dom'
import {connect} from 'react-redux'

const BasicRoute = ({ children, authenticated, ...rest }) => {
    return !authenticated ? <Outlet /> : <Navigate to="/projects" />;
}

const mapStateToProps = ({session}) => ({
    authenticated: session.authenticated
})

export default connect(mapStateToProps)(BasicRoute)