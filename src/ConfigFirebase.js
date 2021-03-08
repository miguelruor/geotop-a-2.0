import firebase from 'firebase';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA34TX5fb4n89vm1Hg1dLLctsQqQLq5Uu4",
    authDomain: "seminargeotop-a.firebaseapp.com",
    projectId: "seminargeotop-a",
    storageBucket: "seminargeotop-a.appspot.com",
    messagingSenderId: "54330667678",
    appId: "1:54330667678:web:95964ec46fba267529c18f",
    measurementId: "G-MHNJR7WZZW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export{
    firebaseApp,
    db,
    firebase
}