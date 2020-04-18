import React, { Component } from "react";
import OrderView from "./OrderView";

class Order extends Component {
    render() {
        const orderedBooks = this.props.order.map((order, index) => (
            <OrderView
                key={index}
                book={order}
                removeFromOrder={this.props.removeFromOrder}
            />
        ));
        return (
            <div className="order col-md-6">
                <h2>Twoje zamówienie</h2>
                {orderedBooks}
            </div>
        );
    }
}

export default Order;
