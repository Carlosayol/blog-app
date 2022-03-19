import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBpyKOZNaOIL4FjyaPfuIIkHo-fYptWqtA',
  authDomain: 'blog-app-2bce5.firebaseapp.com',
  projectId: 'blog-app-2bce5',
  storageBucket: 'blog-app-2bce5.appspot.com',
  messagingSenderId: '212013731304',
  appId: '1:212013731304:web:212a1fd603e385b36b685d',
  measurementId: 'G-5W4YXRRZ3Y',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// in this file we export and work all about firebase

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
