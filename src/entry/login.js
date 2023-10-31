import { getFirebaseApp, getFirebaseAuth } from "../initFirebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, reload } from "firebase/auth";

const app = getFirebaseApp();
const auth = getFirebaseAuth(app);

window.onpageshow = () => {
    if (auth.currentUser)
    {
        console.log("Already Logged In; Redirecting to Menu")
        document.location.href = '..'
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logged In; Redirecting to Menu")
      document.location.href = '..'
    } else {
      console.log("Not Logged In")
    }
});

const username = $('#username_in');
const password = $('#password_in');

$('#signIn_form').on('submit', (e) => {
    console.log("Signing in...");
    signInWithEmailAndPassword(auth, username.val().concat('@fakedomain.com'), password.val())
        .then((userCredential) => {
            console.log("Signed In Successfully!")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Sign In Failed: ", errorMessage);
        })
    e.preventDefault()
})

$('#signUp_btn').on('click', () => {
    console.log("Signing Up...");
    createUserWithEmailAndPassword(auth, username.val().concat('@fakedomain.com'), password.val())
        .then((userCredential) => {
            console.log("Signed Up Successfully!")
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log("Sign Up Failed: ", errorMessage);
        })
});