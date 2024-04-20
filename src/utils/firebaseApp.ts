import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBYFMLxboxGyeWQOzRyFVnmTPmQgaAV6SE",
    authDomain: "wether-apps.firebaseapp.com",
    projectId: "wether-apps",
    storageBucket: "wether-apps.appspot.com",
    messagingSenderId: "567327270182",
    appId: "1:567327270182:web:e254fbd0cf1d8e23b80de7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export {auth, googleAuthProvider, signInWithPopup};