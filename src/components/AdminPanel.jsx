import React, { Component } from "react";
import { fbase } from "../firebase";

import LoginForm from "./LoginForm";
import BookForm from "./BookForm";
import AdminBookListing from "./AdminBookListing";

class AdminPanel extends Component {
    state = {
        loggedIn: false,
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

    addNewBook = (book) =>
        this.setState({
            books: [...this.state.books, book],
        });

    removeFromInventory = (title) => {
        this.setState({
            books: this.state.books.filter((book) => title !== book.name),
        });
    };

    editBook = (oldBookTitle, bookAfterEdit) => {
        const newBooks = this.state.books.filter(
            (book) => oldBookTitle !== book.name
        );

        this.setState({
            books: [...newBooks, bookAfterEdit],
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
                            editBook={this.editBook}
                        />
                        <AdminBookListing
                            books={this.state.books}
                            removeFromInventory={this.removeFromInventory}
                        />
                    </>
                )}
            </div>
        );
    }
}

export default AdminPanel;
