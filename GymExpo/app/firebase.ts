// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQa5gpsEASuLNVfJ3SF4ssb-zsgnBzD1E",
  authDomain: "gym-dekast.firebaseapp.com",
  projectId: "gym-dekast",
  storageBucket: "gym-dekast.firebasestorage.app",
  messagingSenderId: "926608341237",
  appId: "1:926608341237:web:d5819d5bb3823f31302dbc",
  measurementId: "G-NVBC1ERWJ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
