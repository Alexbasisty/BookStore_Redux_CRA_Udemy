import React, { Component } from "react";

import AdminBookView from "./AdminBookView";

class AdminBookListing extends Component {
    render() {
        return this.props.books && Array.isArray(this.props.books) ? (
            <ol>
                {this.props.books.map((book, index) => (
                    <AdminBookView
                        book={book}
                        key={index}
                        removeFromInventory={this.props.removeFromInventory}
                    />
                ))}
            </ol>
        ) : (
            <div>No books in state</div>
        );
    }
}

export default AdminBookListing;
