import React from "react";

export default class Blog extends React.Component{
  render(){
    console.log("Blog");
    return(
      <div id="blog">
        <section>
          <h1>Fabrices Blog</h1>
          <h3>Stay tuned to read whats on my mind such as travels, whats got me interested in the tech world, where the find the best croissants?</h3>
          <p>Blog Comming soon...</p>
        </section>
      </div>
    );
  }
}
