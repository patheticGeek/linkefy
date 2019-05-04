import React, { Component } from 'react';
import '../assets/home.css';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
  componentDidMount() {
    document.body.classList.toggle('home');
  }
  componentWillUnmount() {
    document.body.classList.toggle('home');
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="home">
          <header>
            <div className="squares square1" />
            <div className="squares square2" />
            <div className="squares square3" />
            <div className="squares square4" />
            <div className="squares square5" />
            <div className="squares square6" />
            <div className="squares square7" />
            <div className="container">
              <h1>Linkefy</h1>
              <h3>The only link you'll ever need to remember</h3>
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
          <header>sd</header>
        </main>
      </React.Fragment>
    );
  }
}

export default connect(({ logedin }) => ({
  logedin
}))(Home);
