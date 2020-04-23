import React, { Component } from "react";

class BookView extends Component {
    render() {
        const {
            name,
            author,
            image,
            description,
            genre,
            price,
        } = this.props.book;
        return (
            <div key={name} className="bookView row">
                <div className="col-md-4">
                    <img src={image} width="75" height="100" alt={name} />
                    <p style={{ paddingTop: "10px" }}>{genre}</p>
                </div>
                <div className="col-md-4">
                    <b>{name}</b>
                    <br />
                    <i>{author}</i>
                    <br />
                    <span>{description}</span>
                </div>
                <div className="col-md-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => this.props.addToOrder(this.props.book)}
                    >
                        Zamów
                    </button>
                    <p>
                        <b>Cena </b>
                        <span>{price}</span>
                    </p>
                </div>
            </div>
        );
    }
}

export default BookView;
