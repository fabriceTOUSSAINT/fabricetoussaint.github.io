import React from "react";

export default class Contact extends React.Component{
  render(){
    console.log("Contact");
    return(

      <section>
            <h1>Contact yo</h1>
        <aside>
          <p>Highlighted information</p>
        </aside>
        <article>
          <p>This is the content of the article</p>
        </article>
      </section>
    );
  }
}
