import React from "react";
import { Link } from "react-router";

require('../../scss/style.scss');

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";

export default class Layout extends React.Component{

  render(){
    const { location } = this.props;

  return (
    <div>
        <Nav location={location} />
        <div class="main">
          {this.props.children}
        </div>
        <Footer/>
      </div>
  );

  }
}
