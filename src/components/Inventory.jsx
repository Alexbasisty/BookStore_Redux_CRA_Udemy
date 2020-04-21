import React, { Component } from "react";
import { fbase } from "../firebase";

import BookView from "./BookView";

class Inventory extends Component {
    state = {};
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

    render() {
        let bookListing = <h4>No books on stock, sorry</h4>;
        if (Array.isArray(this.state.books)) {
            bookListing = this.state.books.map((book) => (
                <BookView
                    key={book.name}
                    book={book}
                    addToOrder={this.props.addToOrder}
                />
            ));
        }

        return (
            <div className="inventory col-md-6">
                <h2>Inwentarz księgarni:</h2>
                {bookListing}
            </div>
        );
    }
}

export default Inventory;
