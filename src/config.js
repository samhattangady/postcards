import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBOwu3rpWLBcXBp0f-Bd_VK0nwiCiIm3ks",
  authDomain: "postcards-77979.firebaseapp.com",
  databaseURL: "https://postcards-77979.firebaseio.com",
  projectId: "postcards-77979",
  storageBucket: "postcards-77979.appspot.com",
  messagingSenderId: "12236556675"
};

firebase.initializeApp(config);
console.log('initialized firebase');

