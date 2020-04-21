import React, { Component } from "react";
import { fbase, firebaseApp } from "../firebase";

class BookForm extends Component {
    state = {
        book: {},
    };
    handleChange = (event) => {
        if (event.target.name === "onStock") {
            this.setState({
                book: {
                    onStock: event.target.checked,
                },
            });
        }
        this.setState({
            book: {
                ...this.state.book,
                [event.target.name]: event.target.value,
            },
        });
    };

    addNewBook = (event) => {
        event.preventDefault();

        if (!this.props.editMode) {
            const newBook = { ...this.state.book };
            this.props.addNewBook(newBook);
            this.setState({ book: {} });
        } else {
            const newBook = {
                ...this.props.book,
                ...this.state.book,
            };
            this.props.editBook(this.props.book.name, newBook);
            this.setState({ book: {} });
        }

        event.target.reset();
    };

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

    logOut = () => {
        firebaseApp
            .auth()
            .signOut()
            .then(() => {
                this.props.changeLoggedIn(false);
            });
    };

    genres = ["Fantastyka", "Horror", "Kryminał"];

    render() {
        const label = this.props.editMode ? "Edytuj" : "Dodaj";
        return (
            <>
                <div className="adminPanel col-md-4">
                    <form onSubmit={this.addNewBook}>
                        <div className="form-group">
                            <label>
                                Gatunek:
                                <select
                                    name="genre"
                                    value={
                                        this.state.genre ||
                                        this.props.book.genre
                                    }
                                    onChange={this.handleChange}
                                    className="browser-default custom-select"
                                >
                                    <option>dowolny</option>
                                    {this.genres.map((genre, index) => (
                                        <option key={index} value={genre}>
                                            {genre}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                value={this.state.name || this.props.book.name}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Book name"
                                className="form-control"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                value={
                                    this.state.author || this.props.book.author
                                }
                                type="text"
                                id="author"
                                name="author"
                                placeholder="Book author"
                                onChange={this.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                value={
                                    this.state.description ||
                                    this.props.book.description
                                }
                                id="description"
                                name="description"
                                placeholder="Book description"
                                onChange={this.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div
                            className="form-group"
                            style={{ paddingLeft: "20px" }}
                        >
                            <input
                                value={
                                    this.state.onStock ||
                                    this.props.book.onStock
                                }
                                type="checkbox"
                                id="onStock"
                                name="onStock"
                                className="form-check-input"
                                onChange={this.handleChange}
                            />
                            <label
                                htmlFor="onStock"
                                className="form-check-label"
                            >
                                On stock
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                value={
                                    this.state.image || this.props.book.image
                                }
                                type="text"
                                id="image"
                                name="image"
                                placeholder="Book image"
                                onChange={this.handleChange}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {label}
                        </button>
                    </form>
                </div>
                <button className="btn btn-info" onClick={this.logOut}>
                    Wyloguj
                </button>
            </>
        );
    }
}

export default BookForm;
