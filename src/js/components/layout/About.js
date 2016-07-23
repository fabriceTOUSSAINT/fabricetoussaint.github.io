import React from "react";

export default class About extends React.Component{
  render(){
    return(
      <div className="about animated" id="about" data-parallax="scroll" data-image-src="/images/fab.jpg">

        <aside>
          <h2>I'm Fabrice Toussaint</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </aside>

      </div>
    );
  }
}
