import React, { Component } from "react";
import LoginForm from "./LoginForm";
import BookForm from "./BookForm";

class AdminPanel extends Component {
    state = {
        loggedIn: false,
    };

    changeLoggedIn = (newValue) => this.setState({ loggedIn: newValue });

    render() {
        return (
            <div>
                {!this.state.loggedIn && (
                    <LoginForm changeLoggedIn={this.changeLoggedIn} />
                )}
                {this.state.loggedIn && <BookForm />}
            </div>
        );
    }
}

export default AdminPanel;
