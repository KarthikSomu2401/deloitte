import React, { Component } from "react";
import { FaUserPlus } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Login extends Component {
    state = {
        userName: "",
        password: "",
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let formdata = {
            userName: this.state.userName,
            password: this.state.password,
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
        };
        fetch(`${process.env.REACT_APP_API_URL}/auth/loginuser`, requestOptions)
            .then((response) => response.json())
            .then(function (data) {
                const promise1 = new Promise(function (resolve, reject) {
                    console.log(data);
                    cookies.set("userName", data.userName);
                    setTimeout(function () {
                        resolve();
                    }, 1000);
                });
                promise1.then(function (value) {
                    window.location.href = "#/dashboard";
                });
            });
    }

    myChangeHandler = (event) => {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                name="userName"
                                value={this.state.userName}
                                onChange={this.myChangeHandler}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                name="password"
                                value={this.state.password}
                                onChange={this.myChangeHandler}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">
                            Sign In
            </button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                        <hr />
                        <Button href="/register" className="btn btn-warning btn-block">
                            <FaUserPlus /> Register
            </Button>
                    </form>
                </div>
            </div>
        );
    }
}