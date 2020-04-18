import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAVlDKt7XzfZx14MuT9gtSm4Pe5gNWvl9g",
    authDomain: "book-store-6462d.firebaseapp.com",
    databaseURL: "https://book-store-6462d.firebaseio.com",
    projectId: "book-store-6462d",
    storageBucket: "book-store-6462d.appspot.com",
    messagingSenderId: "448406680684",
    appId: "1:448406680684:web:f35f384242e105e7299449",
    measurementId: "G-D6R8N29XXW",
});

const fbase = Rebase.createClass(firebase.database());

export { fbase, firebaseApp };
