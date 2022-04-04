import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import { StyledButton} from "../components/Styles";
import { logoutUser } from "../auth/actions/userAction";

import { connect } from "react-redux";
import { sessionService } from 'redux-react-session';

const Navbar = ({logoutUser}) => {
  const [sidebar, setSidebar] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      {authenticated && (      
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <StyledButton style={{marginLeft: 'auto'}} to="#" onClick={() => logoutUser(navigate)}>Logout</StyledButton>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      )}
    </>
  );
}
const mapStateToProps = ({session}) => ({
  user : session.user
})

export default connect(mapStateToProps, {logoutUser})(Navbar);