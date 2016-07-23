import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component{
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    if( $(window).width() < 900){
    $("#js-navigation-menu").slideToggle(function(){
      if($("#js-navigation-menu").is(":hidden")) {
        $("#js-navigation-menu").removeAttr("style");
      }
    });
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }
  }

  render() {
    $(window).resize(function() {
      var more = document.getElementById("js-navigation-more");
      if ($(more).length > 0) {
        var windowWidth = $(window).width();
        var moreLeftSideToPageLeftSide = $(more).offset().left;
        var moreLeftSideToPageRightSide = windowWidth - moreLeftSideToPageLeftSide;

        if (moreLeftSideToPageRightSide < 330) {
          $("#js-navigation-more .submenu .submenu").removeClass("fly-out-right");
          $("#js-navigation-more .submenu .submenu").addClass("fly-out-left");
        }

        if (moreLeftSideToPageRightSide > 330) {
          $("#js-navigation-more .submenu .submenu").removeClass("fly-out-left");
          $("#js-navigation-more .submenu .submenu").addClass("fly-out-right");
        }
      }
    });

    $(document).ready(function() {
      var menuToggle = $("#js-mobile-menu").unbind();
      var pageToggle = menuToggle;
      $("#js-navigation-menu").removeClass("show");

      menuToggle.on("click", function(e) {
        e.preventDefault();
        $("#js-navigation-menu").slideToggle(function(){
          if($("#js-navigation-menu").is(":hidden")) {
            $("#js-navigation-menu").removeAttr("style");
          }
        });
      });
      $(".work a").click(function(){
          $('html, body').animate({
              scrollTop: $("#content").offset().top
          });
      });
      $(".about a").click(function(){
          $('html, body').animate({
              scrollTop: $("#about").offset().top
          });
      });
      $(".contact a").click(function(){
          $('html, body').animate({
              scrollTop: $("#contact").offset().top
          });
      });





    });


    const { location } = this.props;
    const { collapsed } = this.state;
    const homeClass = location.pathname === "/" ? "active" : "";
    const workClass = location.pathname.match(/^\/work/) ? "active" : "";
    const aboutClass = location.pathname.match(/^\/about/) ? "active" : "";
    const blogClass = location.pathname.match(/^\/blog/) ? "active" : "";
    const contactClass = location.pathname.match(/^\/contact/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <header class="navigation" role="banner">
        <div class="navigation-wrapper">
          <a href="/" class="logo">
            <h4>Fabrice Toussaint | </h4>
          </a>
          <a href="javascript:void(0)" class="navigation-menu-button" id="js-mobile-menu">MENU</a>
          <nav role="navigation" class={navClass}>
            <ul id="js-navigation-menu" class="navigation-menu show">
              <li class={homeClass}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
              </li>
              <li className="work">
                <a onClick={this.toggleCollapse.bind(this)}>Work</a>
              </li>
              <li className="about">
                <a onClick={this.toggleCollapse.bind(this)}>About</a>
              </li>
              <li class={blogClass}>
                <Link to="blog" onClick={this.toggleCollapse.bind(this)}>Blog</Link>
              </li>
              <li className="contact">
                <a onClick={this.toggleCollapse.bind(this)}>Contact</a>
              </li>



          <span class="social-nav">
            <li>
              <a href="https://github.com/fabriceTOUSSAINT" target="_blank">
                <i class="fa fa-github" aria-hidden="true"></i></a></li>
            <li><a href="https://twitter.com/fabriceBT" target="_blank">
              <i class="fa fa-twitter" aria-hidden="true"></i></a></li>
            <li><a href="https://instagram.com/croissant__" target="_blank">
              <i class="fa fa-instagram" aria-hidden="true"></i></a></li>
              </span>
        </ul>
            </nav>
        </div>
      </header>







    );
  }
}
