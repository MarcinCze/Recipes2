//@ts-nocheck
import React from "react";
import { NavLink } from 'react-router-dom';
import Loader from "../Loader/Loader";
import './Login.css';
import PageTitle from "../PageTitle/PageTitle";

interface IProps {
}

interface IState {
    mail: string,
    password: string,
    error: {} | null,
    isLoading: boolean,
    authToken: string;
}

class Login extends React.Component<IProps, IState> {

    apiUrl: string = `https://authenticatefunc.azurewebsites.net/api/AuthenticateFunc?code=${process.env.REACT_APP_API_KEY_AuthenticateFunc}`;

    constructor(props: IProps) {
        super(props);

        this.state = {
            mail: "",
            password: "",
            error: null,
            isLoading: false,
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

        this.setState({
            isLoading: true
        });

        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: this.state.mail,
                password: this.state.password
            })
        };
        fetch(this.apiUrl, requestOptions)
            .then(res => res.text())
            .then(
                (result) => {
                    this.setState({
                        isLoading: false,
                        authToken: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoading: false,
                        error
                    });
                }
            );
    }

    render() {

        const { error, isLoading }: { error: {}, isLoading: boolean } = this.state;

        if (error) {
            return (
                <>
                    <div className="alert alert-danger" role="alert">
                        <strong>Error:</strong> {error.message}
                    </div>
                </>
            );
        }
        else if (isLoading) {
            return <Loader></Loader>;
        }
        else {
            return (
                <>
                    <PageTitle pageName="Log in"></PageTitle>
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
}
export default Login;