import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// in this file we export and work all about firebase

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const fromMillis = firebase.firestore.Timestamp.fromMillis;

/// Helper Functions

/**
 * Gets a user/{uid} document with username
 * @param {string} username
 * 
 * */

export const getUserWithUsername = async (username: string) => {
  const usersRef = firestore.collection('users')
  const query = usersRef.where('username','==',username).limit(1)
  const userDoc = (await query.get()).docs[0]
  return userDoc
}

/**
 * Converts firestore document to JSON
 * @param {DocumentSnapshot} doc
 * 
 * */

export const postToJson = (doc) => {
  const data = doc.data()
  return { 
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  }
}