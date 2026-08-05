// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY-xnDfI_Joh2Zk3sufRPjKJl97ljslLI",
  authDomain: "portifolio-tamy.firebaseapp.com",
  projectId: "portifolio-tamy",
  storageBucket: "portifolio-tamy.firebasestorage.app",
  messagingSenderId: "812166935994",
  appId: "1:812166935994:web:5e1853b6348c2cae2a9983",
  measurementId: "G-RWEDP8PNS7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
