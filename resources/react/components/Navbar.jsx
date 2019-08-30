import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Style from './styles/NavbarStyle';
import StyelCombine from '../lib/style';

//redux
import { connect } from 'react-redux'

class Navbar extends Component {    
  

  render() {
    const { profile } = this.props;
    const { name } = profile.data;

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
            {
              !profile.fetching && (
                <span>
                  Howdy { name }
                </span>
              )
            }
            
          </li>
        </ul>
      </div>
    );
  }
  
}


export default connect(
  state => ({ profile: state.profile }),
  dispatch => ({ })
)(Navbar);
