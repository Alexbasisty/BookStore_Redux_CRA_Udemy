import React, { Component } from "react";

import AdminBookView from "./AdminBookView";

class AdminBookListing extends Component {
    state = {
        books: [],
    };
    render() {
        return this.props.books ? (
            <ol>
                {this.props.books.map((book, index) => (
                    <AdminBookView
                        book={book}
                        key={index}
                        removeFromInventory={this.props.removeFromInventory}
                        sendBookToEdit={this.props.sendBookToEdit}
                    />
                ))}
            </ol>
        ) : (
            <div>No books in state</div>
        );
    }
}

export default AdminBookListing;
