import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Login from "./components/Login";
import {auth, User} from "./utils/firebaseApp";
import Home from "./components/Home";
import {addUser} from "./store/userDataSlice";
import {useAppDispatch} from "./store";

const App = () => {
    const [user, setUser] = useState<User | null>(null);
    const dispatch = useAppDispatch();
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