import { getFirebaseApp, getFirebaseAuth } from "../initFirebase";
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';
import { onAuthStateChanged, signOut } from "firebase/auth";

const app = getFirebaseApp();
const auth = getFirebaseAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Logged In")
    } else {
        console.log("Not Logged In; Redirecting to login")
        document.location.href = '/login'
    }
});

$('#signOut_btn').on('click', () => {
    signOut(auth);
    location.reload();
})