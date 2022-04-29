import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

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
import Projects from './pages/Projects';
import Settings from './pages/Settings';
import Templates from './pages/Templates';
import { useEffect } from 'react';
import { get_long_url } from './auth/actions/userAction';
import HtmlContent from './pages/HtmlContent';
import Reports from './pages/Reports';
function App({ checked }) {
    
    useEffect(() => {
      let url = window.location.href;
      if (url != null && url != undefined)
      {
          let url_table = url.split('/');
          if (url_table.length === 5)
          {
              let shortCode = url_table[4];
              console.log(shortCode);
              get_long_url(shortCode);
          }
      }
    }, []);
  return (
    <Router basename='/altimate-platform-web'>
      {checked &&
        <Routes>
          <Route path="/signup" element={<BasicRoute />}>
            <Route path="/signup" element={<Signup />}/>
          </Route>
          <Route path="/login" element={<BasicRoute />}>
            <Route path="/login" element={<Login />}/>
          </Route>
          <Route path="/" element={<BasicRoute />}>
            <Route path="/" element={<Login />}/>
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
          <Route path="/projects" element={<AuthRoute />}>
            <Route path="/projects" element={<Projects />}/>
          </Route>
          <Route path="/reports" element={<AuthRoute />}>
            <Route path="/reports" element={<Reports />}/>
          </Route>
          <Route path="/html_table" element={<AuthRoute />}>
            <Route path="/html_table" element={<HtmlContent />}/>
          </Route>
          <Route path="/settings" element={<AuthRoute />}>
            <Route path="/settings" element={<Settings />}/>
          </Route>
          <Route path="/templates" element={<AuthRoute />}>
            <Route path="/templates" element={<Templates />}/>
          </Route>
        </Routes>
      }
    </Router>
  );
}

const mapStateToProps = ({session}) => ({
  checked: session.checked
})

export default connect(mapStateToProps)(App);
