import React, { Component } from "react";
import { fbase, firebaseApp } from "../firebase";
import LoginForm from "../LoginForm";

class AdminPanel extends Component {
    state = {
        books: [],
        book: {
            name: "",
            author: "",
            description: "",
            onStock: true,
            image: "",
        },
        loggedIn: false,
        email: "",
        password: "",
    };

    handleChange = (event) => {
        if (event.target.name === "onStock") {
            this.setState({
                book: {
                    onStock: event.target.checked,
                },
            });
        }
        this.setState({
            book: {
                ...this.state.book,
                [event.target.name]: event.target.value,
            },
        });
    };

    handleLogIn = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    addNewBook = (event) => {
        event.preventDefault();
        const newBook = { ...this.state.book };

        this.setState({
            books: [...this.state.books, newBook],
            book: {
                name: "",
                author: "",
                description: "",
                onStock: true,
                image: "",
            },
        });
    };

    componentDidMount() {
        this.ref = fbase.syncState("bookstore/books", {
            context: this,
            state: "books",
            asArray: true,
        });
    }

    componentWillUnmount() {
        fbase.removeBinding(this.ref);
    }

    authenticate = (event) => {
        event.preventDefault();
        firebaseApp
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({
                    loggedIn: true,
                });
            })
            .catch(() => {
                console.log("Unable to authenticate");
            });
    };

    render() {
        const { name, author, description, onStock, image } = this.state.book;
        return (
            <div>
                {!this.state.loggedIn && (
                    <LoginForm
                        authenticate={this.authenticate}
                        handleLogIn={this.handleLogIn}
                        email={this.state.email}
                        password={this.state.password}
                    />
                )}
                {this.state.loggedIn && (
                    <div className="adminPanel col-md-4">
                        <form onSubmit={this.addNewBook}>
                            <div className="form-group">
                                <input
                                    value={name}
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Book name"
                                    className="form-control"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    value={author}
                                    type="text"
                                    id="author"
                                    name="author"
                                    placeholder="Book author"
                                    onChange={this.handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    value={description}
                                    id="description"
                                    name="description"
                                    placeholder="Book description"
                                    onChange={this.handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div
                                className="form-group"
                                style={{ paddingLeft: "20px" }}
                            >
                                <input
                                    value={onStock}
                                    type="checkbox"
                                    id="onStock"
                                    name="onStock"
                                    className="form-check-input"
                                    onChange={this.handleChange}
                                />
                                <label
                                    htmlFor="onStock"
                                    className="form-check-label"
                                >
                                    On stock
                                </label>
                            </div>
                            <div className="form-group">
                                <input
                                    value={image}
                                    type="text"
                                    id="image"
                                    name="image"
                                    placeholder="Book image"
                                    onChange={this.handleChange}
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Dodaj
                            </button>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}

export default AdminPanel;
