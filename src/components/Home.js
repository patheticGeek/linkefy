import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../assets/home.css";

class Home extends Component {
  componentDidMount() {
    document.body.classList.toggle("home");
  }
  componentWillUnmount() {
    document.body.classList.toggle("home");
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="home">
          <header className="page-header">
            <div className="squares square1" />
            <div className="squares square2" />
            <div className="squares square3" />
            <div className="squares square4" />
            <div className="squares square5" />
            <div className="squares square6" />
            <div className="squares square7" />
            <div className="squares square8" />
            <div className="container">
              <img src="./icon_512.png" alt="logo" />
              <h1>Linkefy</h1>
              <h3>One place for your linking needs</h3>
              {this.props.logedin ? (
                <Link to="/admin" className="button primary">
                  Go to my profile
                </Link>
              ) : (
                <>
                  <Link to="/signin" className="button primary">
                    Sign up
                  </Link>
                  <Link to="/signin" className="button">
                    Login
                  </Link>
                </>
              )}
            </div>
          </header>
        </main>
      </React.Fragment>
    );
  }
}

export default connect(({ logedin }) => ({
  logedin,
}))(Home);
