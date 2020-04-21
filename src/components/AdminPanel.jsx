import React, { Component } from "react";
import { fbase } from "../firebase";

import LoginForm from "./LoginForm";
import BookForm from "./BookForm";
import AdminBookListing from "./AdminBookListing";

class AdminPanel extends Component {
    state = {
        loggedIn: false,
        editMode: false,
        emptyBook: {},
        bookToEdit: {
            name: "",
            author: "",
            description: "",
            onStock: true,
            image: "",
            genre: "",
        },
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

    addNewBook = (book) => {
        if (Array.isArray(this.state.books)) {
            this.setState({ books: [...this.state.books, book] });
        } else {
            this.setState({
                books: [book],
            });
        }
        this.setState({
            editMode: false,
            bookToEdit: {
                name: "",
                author: "",
                description: "",
                onStock: true,
                image: "",
                genre: "",
            },
        });
    };

    removeFromInventory = (title) => {
        this.setState({
            books: this.state.books.filter((book) => title !== book.name),
        });
    };

    sendBookToEdit = (bookToEdit) => {
        this.setState({
            editMode: true,
            bookToEdit: bookToEdit,
        });
    };

    editBook = (oldBookTitle, bookAfterEdit) => {
        const newBooks = this.state.books.filter(
            (book) => oldBookTitle !== book.name
        );

        this.setState({
            books: [...newBooks, bookAfterEdit],
            editMode: false,
            bookToEdit: {
                name: "",
                author: "",
                description: "",
                onStock: true,
                image: "",
                genre: "",
            },
        });
    };

    render() {
        return (
            <div>
                {!this.state.loggedIn && (
                    <LoginForm changeLoggedIn={this.changeLoggedIn} />
                )}
                {this.state.loggedIn && (
                    <>
                        <BookForm
                            addNewBook={this.addNewBook}
                            editMode={this.state.editMode}
                            book={this.state.bookToEdit}
                            editBook={this.editBook}
                        />
                        <AdminBookListing
                            books={this.state.books}
                            removeFromInventory={this.removeFromInventory}
                            sendBookToEdit={this.sendBookToEdit}
                        />
                    </>
                )}
            </div>
        );
    }
}

export default AdminPanel;
