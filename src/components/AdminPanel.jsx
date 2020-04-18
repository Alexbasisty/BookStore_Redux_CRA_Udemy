import React, { Component } from "react";
import { fbase } from "../firebase";
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

    changeLoggedIn = (newValue) => this.setState({ loggedIn: newValue });

    render() {
        const { name, author, description, onStock, image } = this.state.book;
        return (
            <div>
                {!this.state.loggedIn && (
                    <LoginForm changeLoggedIn={this.changeLoggedIn} />
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
