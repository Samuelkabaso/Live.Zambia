import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
// Replace this with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCA6oxno4zHhbBgOB7Y5EpmR3fMl9Y8SX4",
  authDomain: "live-281b2.firebaseapp.com",
  databaseURL: "https://live-281b2-default-rtdb.firebaseio.com",
  projectId: "live-281b2",
  storageBucket: "live-281b2.firebasestorage.app",
  messagingSenderId: "138809616254",
  appId: "1:138809616254:web:bc91cd4b22df745b86352f",
  measurementId: "G-QCV0T1PGGM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = auth();
//Landlord sign up//


function signUp(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Signup successful:", userCredential.user);
    })
    .catch((error) => {
      console.error("Signup error:", error.message);
    });
}


function login(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Login successful:", userCredential.user);
    })
    .catch((error) => {
      console.error("Login error:", error.message);
    });
}


function logout() {
  auth.signOut()
    .then(() => {
      console.log("User signed out.");
    })
    .catch((error) => {
      console.error("Logout error:", error.message);
    });
}


auth.onAuthStateChanged(user => {
  if (user) {
    console.log("User is signed in:", user.email);
  } else {
    console.log("No user is signed in.");
  }
});

