import {Outlet, Navigate} from 'react-router-dom'
import {connect} from 'react-redux'

const BasicRoute = ({ children, authenticated, ...rest }) => {
    return !authenticated ? <Outlet /> : <Navigate to="/dashbord" />;
    /*return (
        <Route 
            {...rest}
            render={({location}) => 
            !authenticated ? (
                children
                ): (
                    <Navigate 
                        to={{
                            pathname: "/dashbord",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )*/
}

const mapStateToProps = ({session}) => ({
    authenticated: session.authenticated
})

export default connect(mapStateToProps)(BasicRoute)