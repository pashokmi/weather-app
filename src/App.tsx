import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Login from "./components/Login";
import {auth, User} from "./utils/firebaseApp";
import Home from "./components/Home";
import {useDispatch} from 'react-redux';
import {addUser} from "./store/userDataSlice";

const App = () => {
    const [user, setUser] = useState<User | null>(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((nextUser: User | null) => setUser(nextUser));
        return () => unsubscribe();
    }, []);


    useEffect(() => {

        if (user) {
            let userData: User = {
                uid: user.uid,
                displayName: user.displayName
            }
            dispatch(addUser(userData));
        }
        console.log('треба знати як часто юзер стрибає ')
    }, [dispatch, user])


    const handleLogout = () => {
        auth.signOut().then(() => {
        }).catch((error) => {
            console.error("Error logging out: ", error);
        });
    };


    return (
        <Router>
            {!user ?
                <Login/>
                :
                <Home user={user} handleLogout={handleLogout}/>
            }
        </Router>

    );
}

export default App;