import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCChf6ZStXGotVVgd1evOAH-BhU2YUMBjI",
    authDomain: "gc-final-project-47109.firebaseapp.com",
    projectId: "gc-final-project-47109",
    storageBucket: "gc-final-project-47109.appspot.com",
    messagingSenderId: "692218625173",
    appId: "1:692218625173:web:817299a43e8044e5fa2f9c",
    measurementId: "G-3X7S33LKT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
    signInWithPopup(auth, authProvider);
    }
    export function signOut(): void {
    auth.signOut();
}