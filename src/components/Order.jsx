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
        const priceArray = this.props.order.map((order) =>
            parseInt(order.price)
        );
        const totalPrice =
            priceArray.length > 0 &&
            priceArray.reduce((prev, curr) => prev + curr);

        return (
            <div className="order col-md-6">
                <h2>Twoje zamówienie</h2>
                {orderedBooks}
                {totalPrice > 0 && (
                    <div>
                        <h4>Cena całkowita</h4>
                        <p>{totalPrice} PLN</p>
                    </div>
                )}
            </div>
        );
    }
}

export default Order;
