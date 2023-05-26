import { getFirebaseApp, getFirebaseAuth } from "../initFirebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, reload } from "firebase/auth";

const app = getFirebaseApp();
const auth = getFirebaseAuth(app);

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

$('#signIn_btn').on('click', () => {
    console.log("Signing In");
    signInWithEmailAndPassword(auth, username.val().concat('@fakedomain.com'), password.val())
        .then((userCredential) => {
            const user = userCredential;
            console.log("Signed Up Successfully!")
            document.location.href = '..'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Sign Up Failed: ", errorMessage);
        })
});

$('#signUp_btn').on('click', () => {
    console.log("Signing Up");
    createUserWithEmailAndPassword(auth, username.val().concat('@fakedomain.com'), password.val())
        .then((userCredential) => {
            const user = userCredential;
            console.log("Signed Up Successfully!")
            document.location.href = '..'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Sign Up Failed: ", errorMessage);
        })
});