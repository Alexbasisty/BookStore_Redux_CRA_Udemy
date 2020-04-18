import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    state = {
        bookstoreName: "Black Books",
        clicked: true,
        textColor: "white",
        backgroundColor: "black",
    };

    handleClick = () => {
        if (this.state.clicked) {
            this.setState({
                bookstoreName: "White Books",
                textColor: "black",
                backgroundColor: "white",
            });
        } else {
            this.setState({
                bookstoreName: "Black Books",
                textColor: "white",
                backgroundColor: "black",
            });
        }
        this.setState({
            clicked: !this.state.clicked,
        });
    };

    render() {
        const { bookstoreName, textColor, backgroundColor } = this.state;
        const headerCss = {
            color: textColor,
            backgroundColor: backgroundColor,
            height: "100px",
        };
        return (
            <div
                className="row header d-flex justify-content-center align-items-center"
                onClick={this.handleClick}
                style={headerCss}
            >
                <h1>{bookstoreName}</h1>
                <div className="goToAdmin">
                    <Link to="/admin">
                        <button className="btn btn-info">
                            Panel Administrowania
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Header;
