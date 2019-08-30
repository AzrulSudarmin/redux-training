import React, { Component } from 'react';

//style
import Style from './styles/MainStyle';

//components
import Loader from '../components/Loader';

class AboutPage extends Component {
  render() {
    return (
      <div style={Style.wrapper}>
        <span>
          This is homepage about you, <b>Name</b>
        </span>
      </div>
    );
  }
}


export default AboutPage