import React, { Component } from 'react';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navClass: ''
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.changeColor);
    console.log()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.changeColor);
  }
  changeColor = () => {
    if (document.documentElement.scrollTop > 150 || document.body.scrollTop > 150) {
      this.setState({
        navClass: 'collapsed'
      });
    } else if (document.documentElement.scrollTop < 151 || document.body.scrollTop < 151) {
      this.setState({
        navClass: ''
      });
    }
  };

  render() {
    return (
      <nav className={this.state.navClass}>
        <div className="nav-content">
          <div className="brand-logo">
            <span>Linkefy</span>
          </div>
          <div className="nav-links">
            <a href="#home" className="nav-link">
              <span>Home</span>
            </a>
            <a href="#features" className="nav-link">
              <span>Features</span>
            </a>
            <a href="#blog" className="nav-link">
              <span>Blog</span>
            </a>
            <a href="#contact" className="nav-link">
              <span>Contact</span>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
