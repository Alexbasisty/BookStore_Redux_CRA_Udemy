import React, { Component } from "react";

class AdminBookListing extends Component {
    state = {
        books: [],
    };
    render() {
        return this.props.books ? (
            <ol>
                {this.props.books.map((book, index) => (
                    <li key={index}>
                        {book.name} {book.author}
                    </li>
                ))}
            </ol>
        ) : (
            <div>No books in state</div>
        );
    }
}

export default AdminBookListing;
