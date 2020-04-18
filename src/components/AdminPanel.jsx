import React, { Component } from "react";
import { fbase, firebaseApp } from "../firebase";
import LoginForm from "./LoginForm";
import BookForm from "./BookForm";

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
                    <BookForm
                        name={name}
                        author={author}
                        description={description}
                        onStock={onStock}
                        image={image}
                        handleChange={this.handleChange}
                        addNewBook={this.addNewBook}
                    />
                )}
            </div>
        );
    }
}

export default AdminPanel;
