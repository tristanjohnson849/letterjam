// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBFWRetOfybUvifSzAJRMRDeS_dzIKsvA",
  authDomain: "letterjam-b3af6.firebaseapp.com",
  projectId: "letterjam-b3af6",
  storageBucket: "letterjam-b3af6.appspot.com",
  messagingSenderId: "372840164818",
  appId: "1:372840164818:web:3e461be7763d04eee5ec0b",
  measurementId: "G-V1T5Q4CHXW"
};

// Initialize Firebase
export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
