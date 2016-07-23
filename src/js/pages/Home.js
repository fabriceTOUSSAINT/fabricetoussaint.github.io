import React from "react";
import { Link } from "react-router";

import Works from "../components/layout/Works";
import About from "../components/layout/About";
import Contact from "../components/layout/Contact";

export default class Home extends React.Component{
  render(){


    return(
    <div>
      <div className="hero" data-parallax="scroll" data-image-src="/images/hero-bg.jpg">
         <img  src="images/fab-logo-wht.png" alt="Logo" />
         <div className="info">
             <span>DEVELOPER | PHOTOGRAPHER | EXPLORER</span>
       </div>
     </div>
     <Works/>
     <About/>
     <Contact/>
    </div>

    );
  }
}
