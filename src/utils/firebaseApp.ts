import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


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
    displayName: string | null;
}
const db = getFirestore(app);


export {auth, googleAuthProvider, signInWithPopup,db};