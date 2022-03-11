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

function App() {
  return (
    <Router>
      <StyledContainer>
        <Routes>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/dashbord" element={<Dashbord />}/>
        </Routes>
      </StyledContainer>
    </Router>
  );
}

export default App;
