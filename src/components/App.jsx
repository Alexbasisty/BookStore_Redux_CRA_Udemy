import React, { Component } from "react";

import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";

import "../index.css";

class App extends Component {
    state = {
        order: [],
    };

    addToOrder = (book) => {
        this.setState({
            order: [...this.state.order, book],
        });
    };

    removeFromOrder = (title) => {
        this.setState({
            order: this.state.order.filter((book) => title !== book.name),
        });
    };

    render() {
        return (
            <div className="app fluid-container">
                <Header />
                <div className="row">
                    <Order
                        order={this.state.order}
                        removeFromOrder={this.removeFromOrder}
                    />
                    <Inventory
                        books={this.state.books}
                        addToOrder={this.addToOrder}
                        removeFromOrder={this.removeFromOrder}
                    />
                </div>
            </div>
        );
    }
}

export default App;
