// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyyKMNmXMqRIV0eFjNP75KHQnGmLpxGYU",
  authDomain: "kayumbaj88-e0a77.firebaseapp.com",
  projectId: "kayumbaj88-e0a77",
  storageBucket: "kayumbaj88-e0a77.appspot.com",
  messagingSenderId: "759750053178",
  appId: "1:759750053178:web:4c5bfe7e78088349ecd403",
  measurementId: "G-M94NQ48PDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}
// const analytics = getAnalytics(app);