import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const config = {
    apiKey: "AIzaSyDOfCpdKavJz3FXU50UEJ300JL9SFl11Ok",
    authDomain: "dnd-sheet-web.firebaseapp.com",
    projectId: "dnd-sheet-web",
    storageBucket: "dnd-sheet-web.appspot.com",
    messagingSenderId: "889144798933",
    appId: "1:889144798933:web:26c1ff2d0e5963334d7c5c",
    measurementId: "G-KLP1MHGMHY"
}

export function getFirebaseApp(){
    try {
        return getApp();
    } catch {
        return initializeApp(config);
    }
}

export function getFirebaseAuth(app){
    return getAuth(app);
}