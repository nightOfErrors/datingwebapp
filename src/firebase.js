import firebase from 'firebase';

const app = firebase.initializeApp({
    apiKey: "AIzaSyC4eB-SAx4ZysbBYh9pLH6S23DsJKPJ-GM",
    authDomain: "dating-app-1b5c9.firebaseapp.com",
    projectId: "dating-app-1b5c9",
    storageBucket: "dating-app-1b5c9.appspot.com",
    messagingSenderId: "947892256461",
    appId: "1:947892256461:web:ffa6451566b4cc1a1ef384",
    measurementId: "G-5C0S4LX7XS"    
});

export const provider = new firebase.auth.GoogleAuthProvider();

export default app;

