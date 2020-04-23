import React, { Component } from "react";

class OrderView extends Component {
    render() {
        const { name, price } = this.props.book;
        return (
            <div className="row orderView">
                <div className="col-md-4">
                    <b>{name}</b>
                </div>
                <div className="col-md-4">
                    <b>{price}</b>
                </div>
                <div className="col-md-4">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.props.removeFromOrder(name)}
                    >
                        Usuń
                    </button>
                </div>
            </div>
        );
    }
}

export default OrderView;
