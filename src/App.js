import {StyledContainer} from './components/Styles';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashbord from './pages/Dashboard';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import AuthRoute from './components/AuthRoute';
import BasicRoute from './components/BasicRoute';
import {connect} from 'react-redux'
import ForgottenPassword from './pages/ForgottenPassword';
import EmailSent from './pages/EmailSent';
import PasswordReset from './pages/PasswordReset';
import ConfirmationEmail from './pages/ConfirmationEmail';

function App({ checked }) {
  return (
    <Router basename='/altimate-platform-web'>
      {checked &&
      <StyledContainer>
        <Routes>
          <Route path="/signup" element={<BasicRoute />}>
            <Route path="/signup" element={<Signup />}/>
          </Route>
          <Route path="/login" element={<BasicRoute />}>
            <Route path="/login" element={<Login />}/>
          </Route>
          <Route path="/" element={<BasicRoute />}>
            <Route path="/" element={<Home />}/>
          </Route>
          <Route path="/forgottenPassword" element={<BasicRoute />}>
            <Route path="/forgottenPassword" element={<ForgottenPassword />}/>
          </Route>
          <Route path="/resetPassword" element={<BasicRoute />}>
            <Route path="/resetPassword" element={<PasswordReset />}/>
          </Route>
          <Route path="/emailSent" element={<BasicRoute />}>
            <Route path="/emailSent" element={<EmailSent />}/>
          </Route>
          <Route path="/confirmEmail" element={<BasicRoute />}>
            <Route path="/confirmEmail" element={<ConfirmationEmail />}/>
          </Route>
          <Route path="/dashbord" element={<AuthRoute />}>
            <Route path="/dashbord" element={<Dashbord />}/>
          </Route>
        </Routes>
      </StyledContainer>
      }
    </Router>
  );
}

const mapStateToProps = ({session}) => ({
  checked: session.checked
})

export default connect(mapStateToProps)(App);
