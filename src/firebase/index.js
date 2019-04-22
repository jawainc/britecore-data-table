import {initializeApp} from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyBeeujm6Qe6PKknKxVOOPwT7TWegYHuNyI",
    authDomain: "britecoredatatable-ea7a8.firebaseapp.com",
    databaseURL: "https://britecoredatatable-ea7a8.firebaseio.com",
    projectId: "britecoredatatable-ea7a8",
    storageBucket: "britecoredatatable-ea7a8.appspot.com",
    messagingSenderId: "923205569170"
});

export const db = app.database().ref();

