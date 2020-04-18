import React, { Component } from "react";

class LoginForm extends Component {
    render() {
        const { handleLogIn, authenticate, email, password } = this.props;

        return (
            <div className=" col-md-4 mx-auto mt-5">
                <form onSubmit={authenticate}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="E-mail"
                            id="email"
                            name="email"
                            className="form-control"
                            onChange={handleLogIn}
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleLogIn}
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
