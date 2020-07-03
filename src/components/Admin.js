import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AddLinks from "./AddLinks";
import Settings from "./Settings";
import "../assets/animate.css";
import "../assets/admin.css";

class Admin extends Component {
  state = { toastShown: false, toastType: "", toastMessage: "" };

  componentWillReceiveProps(newProps) {
    if (newProps.success) {
      this.setState({ toastShown: true, toastType: "success", toastMessage: newProps.message });
      setTimeout(() => this.setState({ toastShown: false }), 3000);
    }
    if (newProps.error) {
      this.setState({ toastShown: true, toastType: "error", toastMessage: newProps.message });
      setTimeout(() => this.setState({ toastShown: false }), 3000);
    }
  }

  render() {
    if (!this.props.logedin) return <Redirect to="/" />;
    if (this.props.user === null) return <Redirect to="/" />;
    if (this.props.user.username === "") return <Redirect to="/signin" />;
    return (
      <main className="admin">
        <div className="admin-nav">
          <Link to="/" className="logo">
            <img src="/icon_512.png" alt="logo" />
          </Link>
          <div className="admin-links">
            <div className="admin-nav-bio-link mobile">
              <h3>My Bio Link: </h3>
              <div>
                <a href={window.location.origin + "/" + this.props.user.username}>
                  {window.location.origin + "/" + this.props.user.username}
                </a>
              </div>
            </div>
            <div className="nav">
              <Link className={this.props.page === "links" ? "admin-nav-link active" : "admin-nav-link"} to="/admin">
                <span className="admin-nav-link-text">My Links</span>
                <span className="admin-nav-link-line" />
              </Link>
              {/* <Link
                className={
                  this.props.page === 'analytics' ? 'admin-nav-link active' : 'admin-nav-link'
                }
                to="/admin/analytics"
              >
                <span className="admin-nav-link-text">Analytics</span>
                <span className="admin-nav-link-line" />
              </Link> */}
              <Link className={this.props.page === "settings" ? "admin-nav-link active" : "admin-nav-link"} to="/admin/settings">
                <span className="admin-nav-link-text">Settings</span>
                <span className="admin-nav-link-line" />
              </Link>
            </div>
          </div>
          <div className="admin-nav-divider" />
          <div className="admin-nav-bio-link">
            <div>
              <h3>My Bio Link: </h3>
              <a href={window.location.origin + "/" + this.props.user.username}>
                {window.location.origin + "/" + this.props.user.username}
              </a>
            </div>
          </div>
        </div>

        {this.props.page === "links" ? <AddLinks /> : null}
        {this.props.page === "settings" ? <Settings /> : null}

        <div className={"toast " + this.state.toastType + " " + (this.state.toastShown ? "shown" : "")}>
          <div className={"icon " + this.state.toastType} />
          <div className="text">{this.state.toastMessage}</div>
        </div>
      </main>
    );
  }
}

export default connect(({ logedin, user, success, error, message }) => ({
  logedin,
  user,
  success,
  error,
  message,
}))(Admin);
