import React, { Component } from "react";
import { FaBars } from "react-icons/fa";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class NavHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        };
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    componentDidMount() {
        this.setState({ userName: cookies.get("userName") });
    }

    logoutHandler = function (event) {
        event.preventDefault();
        cookies.remove("userName");
        window.location.href = "/";
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <div>
                <nav className="mb-1 navbar navbar-expand-lg navbar-light bg-light navcolor-light">
                    <a className="navbar-brand nav-title" href="/dashboard">
                        Hi, {this.capitalize(this.state.userName)}
                    </a>
                    <span
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent-555"
                        aria-controls="navbarSupportedContent-555"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <FaBars />
                    </span>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent-555"
                    >
                        {/* <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link nav-title" href="/dashboard">
                                    Home
                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-title" href="/add-article">
                                    Add Article
                </a>
                            </li>
                        </ul> */}
                        <ul className="navbar-nav ml-auto nav-flex-icons">
                            {/* <li className="nav-item">
                                <a className="nav-link nav-title" href="/add-article">
                                    {this.state.userName}
                                </a>
                            </li> */}
                            <li className="nav-item">
                                <a className="nav-link nav-title" href="javascript:void(0)" onClick={this.logoutHandler}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default () => (
    <div>
        <NavHeader />
    </div>
);