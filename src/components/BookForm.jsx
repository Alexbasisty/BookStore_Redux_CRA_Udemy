import React, { Component } from "react";
import { fbase, firebaseApp } from "../firebase";
import { connect } from "react-redux";
import { updateBookAction } from "../store/actions";
import { Link } from "react-router-dom";

class BookForm extends Component {
    handleChange = (event) => {
        let newBook;
        if (event.target.name === "onStock") {
            newBook = {
                ...this.props.book,
                [event.target.name]: event.target.checked,
            };
        } else {
            newBook = {
                ...this.props.book,
                [event.target.name]: event.target.value,
            };
        }
        this.props.updateBook(newBook);
    };

    addNewBook = (event) => {
        event.preventDefault();

        if (!this.props.editMode) {
            const newBook = { ...this.props.book };

            this.props.addNewBook(newBook);

            this.props.updateBook({
                name: "",
                author: "",
                description: "",
                onStock: true,
                image: "",
                genre: "",
            });
        } else {
            const newBook = { ...this.props.book };

            this.props.editBook(this.props.titleOfBookForRemoval, newBook);

            this.props.updateBook({
                name: "",
                author: "",
                description: "",
                onStock: true,
                image: "",
                genre: "",
            });
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
        if (localStorage.getItem("loggedIn")) {
            localStorage.removeItem("loggedIn");
        }
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
        const {
            name,
            author,
            description,
            onStock,
            genre,
            image,
            price,
        } = this.props.book;

        return (
            <>
                <div className="admin-buttons">
                    <Link to="/">
                        <button className="btn btn-primary">
                            Wróć do sklepu
                        </button>
                    </Link>
                    <button
                        className="btn btn-danger ml-md-2"
                        onClick={this.logOut}
                    >
                        Wyloguj
                    </button>
                </div>
                <div className="adminPanel col-md-4">
                    <form onSubmit={this.addNewBook}>
                        <div className="form-group">
                            <label>
                                Gatunek:
                                <select
                                    name="genre"
                                    value={genre}
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
                                value={name}
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
                                value={author}
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
                                value={description}
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
                                value={onStock}
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
                                value={image}
                                type="text"
                                id="image"
                                name="image"
                                placeholder="Book image"
                                onChange={this.handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                value={price}
                                type="text"
                                id="price"
                                name="price"
                                placeholder="Cena"
                                onChange={this.handleChange}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {label}
                        </button>
                    </form>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBook: (book) => dispatch(updateBookAction(book)),
    };
};

const mapStateToProps = (state) => {
    return {
        book: state.book,
        editMode: state.editMode,
        titleOfBookForRemoval: state.titleOfBookForRemoval,
    };
};

const AddBookForm = connect(mapStateToProps, mapDispatchToProps)(BookForm);

export default AddBookForm;
