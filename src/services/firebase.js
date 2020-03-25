import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDwIDgsslKjm5rBuk5J6LMJguK8JL2zC14",
  authDomain: "elnino-945c4.firebaseapp.com",
  databaseURL: "https://elnino-945c4.firebaseio.com"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();