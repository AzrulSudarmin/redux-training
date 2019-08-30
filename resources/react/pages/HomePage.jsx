import React, { Component } from 'react';

//style
import Style from './styles/MainStyle';

//components
import Loader from '../components/Loader'

class HomePage extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div style={Style.wrapper}>
        <span>
          Hi, <b>Nama</b>
        </span>
      </div>
    );
  }
}


export default HomePage
