import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyDOfCpdKavJz3FXU50UEJ300JL9SFl11Ok",
    authDomain: "dnd-sheet-web.firebaseapp.com",
    projectId: "dnd-sheet-web",
    storageBucket: "dnd-sheet-web.appspot.com",
    messagingSenderId: "889144798933",
    appId: "1:889144798933:web:26c1ff2d0e5963334d7c5c",
    measurementId: "G-KLP1MHGMHY"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

console.log("Hello, world! :D");

$('#pressme_btn').on('click', function(){
    console.log('this was so much easier than I expected!');
})