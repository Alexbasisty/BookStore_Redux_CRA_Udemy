import React, { Component } from "react";

class BookForm extends Component {
    render() {
        const {
            name,
            author,
            image,
            description,
            onStock,
            addNewBook,
            handleChange,
        } = this.props;
        return (
            <div className="adminPanel col-md-4">
                <form onSubmit={addNewBook}>
                    <div className="form-group">
                        <input
                            value={name}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Book name"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            value={author}
                            type="text"
                            id="author"
                            name="author"
                            placeholder="Book author"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            value={description}
                            id="description"
                            name="description"
                            placeholder="Book description"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group" style={{ paddingLeft: "20px" }}>
                        <input
                            value={onStock}
                            type="checkbox"
                            id="onStock"
                            name="onStock"
                            className="form-check-input"
                            onChange={handleChange}
                        />
                        <label htmlFor="onStock" className="form-check-label">
                            On stock
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            value={image}
                            type="text"
                            id="image"
                            name="image"
                            placeholder="Book image"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Dodaj
                    </button>
                </form>
            </div>
        );
    }
}

export default BookForm;
