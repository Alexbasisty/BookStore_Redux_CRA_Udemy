import React, { Component } from "react";

class AdminBookView extends Component {
    render() {
        const { name, author } = this.props.book;
        return (
            <div className="row orderView">
                <div className="col-md-8">
                    <b>
                        {name} {author}
                    </b>
                </div>
                <div className="col-md-2">
                    <button
                        className="btn btn-danger"
                        onClick={() =>
                            this.props.sendBookToEdit(this.props.book)
                        }
                    >
                        Edytuj
                    </button>
                </div>
                <div className="col-md-2">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.props.removeFromInventory(name)}
                    >
                        Usuń
                    </button>
                </div>
            </div>
        );
    }
}

export default AdminBookView;
