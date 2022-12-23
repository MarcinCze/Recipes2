//@ts-nocheck
import React from "react";
import { NavLink } from 'react-router-dom';
import Loader from "../Loader/Loader";
import './Login.css';

interface IProps {
}

interface IState {
    mail: string,
    password: string,
    error: {} | null,
    isLoaded: boolean,
    authToken: string;
}

class Login extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            mail: "",
            password: "",
            error: null,
            isLoaded: false,
            authToken: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // Problematic part for TS
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event: any) {

        // TODO CALL TO API

        event.preventDefault();
    }

    render() {
        return (
            <>
                <h1 className="display-6">Log in</h1>
                <div style={{ display: "block", height: "3em" }}></div>

                <div className="container text-center">
                    <div className="row align-items-start">
                        <div className="col-3"></div>
                        <div className="col-6">
                            <div id="loginForm">
                                <form style={{ textAlign: "left" }} onSubmit={this.handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Email address</label>
                                        <input
                                            name="mail"
                                            type="email"
                                            value={this.state.mail}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="emailInput"
                                            aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            name="password"
                                            type="password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="passwordInput" />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>


            </>
        );
    }
}
export default Login;