import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Style from './styles/NavbarStyle';
import StyelCombine from '../lib/style';

class Navbar extends Component {    
  
  render() {
    return (
      <div style={Style.navbar}>
        <ul style={Style.ul}>
          <li style={Style.li}> 
            <Link style={Style.anchor} to="/"> Home </Link> 
          </li>
          <li style={Style.li}> 
            <Link style={Style.anchor} to="/aboutus"> About </Link> 
          </li>
          <li style={StyelCombine([Style.li, Style.stickyName])}>
            <span>
              Howdy Nama
            </span>
          </li>
        </ul>
      </div>
    );
  }
  
}


export default Navbar;
