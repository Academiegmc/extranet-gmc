import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <footer className="">
        <nav class="navbar fixed-bottom navbar-light bg-light text-white">
          <h6 className="py-3 px-md-5" style={{ color: "#c2c2c2" }}>
            © COPYRIGHT 2018. L'ACADÉMIE GUINOT - MARY COHR
          </h6>
        </nav>
      </footer>
    );
  }
}

export default Footer;
