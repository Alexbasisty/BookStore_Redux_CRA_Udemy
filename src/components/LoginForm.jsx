import React, { Component } from "react";
import { firebaseApp } from "../firebase";

class LoginForm extends Component {
    state = {
        email: "",
        password: "",
    };
    authenticate = (event) => {
        event.preventDefault();
        firebaseApp
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.changeLoggedIn(true);
            })
            .catch(() => {
                console.log("Unable to authenticate");
            });
    };

    handleLogIn = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        const { email, password } = this.state;

        return (
            <div className=" col-md-4 mx-auto mt-5">
                <form onSubmit={this.authenticate}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="E-mail"
                            id="email"
                            name="email"
                            className="form-control"
                            onChange={this.handleLogIn}
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={this.handleLogIn}
                            className="form-control"
                            value={password}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Zaloguj
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
