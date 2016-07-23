import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Layout from "./pages/Layout";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="work" name="work" component={Work}></Route>
      <Route path="about" name="about" component={About}></Route>
      <Route path="blog" name="blog" component={Blog}></Route>
      <Route path="contact" name="contact" component={Contact}></Route>
    </Route>
  </Router>,
app);
