// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbL1UTVRXW-u9mFazIwtHP1iedNmNOf8M",
  authDomain: "mdia-week9.firebaseapp.com",
  projectId: "mdia-week9",
  storageBucket: "mdia-week9.appspot.com",
  messagingSenderId: "628865134395",
  appId: "1:628865134395:web:3adfb946c8d988b40a911e",
  measurementId: "G-CL9L6G2FGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;