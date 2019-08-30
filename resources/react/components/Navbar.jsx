import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Style from './styles/NavbarStyle';

class Navbar extends Component {    
  
  render() {
    const { profile } = this.props;

    return (
      <div style={Style.navbar}>
        <ul style={Style.ul}>
          <li style={Style.li}> 
            <Link style={Style.anchor} to="/"> Home </Link> 
          </li>
          <li style={Style.li}> 
            <Link style={Style.anchor} to="/aboutus"> About </Link> 
          </li>
          <li style={Style.li}>
            <span>
              Hi, nama. This is navbar with auth
            </span>
          </li>
        </ul>
      </div>
    );
  }
  
}


export default Navbar;
