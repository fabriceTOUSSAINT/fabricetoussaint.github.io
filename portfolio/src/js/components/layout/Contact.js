import React from "react";

export default class Contact extends React.Component{
  render(){
    return(
      <div className="contact" id="contact">
        <h3>Lets Create</h3>

    {/*      <form action="" method="post">
      <fieldset>
          <div>
              <label for="name">Name:</label>
              <input id="name" name="name" value="" required  pattern="[A-Za-z-0-9]+\s[A-Za-z-'0-9]+" aria-required="true" aria-describedby="name-format"></input>
          </div>
          <div>
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" value="" required aria-required="true"></input>
          </div>
          <div>
              <label for="subject">Subject:</label>
              <input type="subject" id="subject" name="subject" value=""></input>
          </div>
          <div>
              <label for="numTickets"><abbr title="Number">No.</abbr> of Tickets:</label>
              <input type="number" id="numTickets" name="numTickets" value="" required aria-required="true" min="1" max="4"></input>

          </div>
          <div class="submit">
              <input type="submit" value="Submit"></input>
          </div>
      </fieldset>
  </form>
  */}
  <div id="email" class="animated">
  <h2>Say Hello,</h2>
  <a href="mailto:fabtoussaint@gmail.com">Fabtoussaint@gmail.com</a>
  </div>
  <aside>
    <img src="images/fab-logo-trans.png" class="animated" id="logo"></img>
  </aside>
      </div>
    );
  }
}
