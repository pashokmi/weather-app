import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';
import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ChakraProvider, Flex, Text} from '@chakra-ui/react';
import Login from "./components/Login";
import {auth, User} from "./utils/firebaseApp";

const App = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((nextUser: User | null) => setUser(nextUser));
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        auth.signOut().then(() => {
        }).catch((error) => {
            console.error("Error logging out: ", error);
        });
    };


    return (
        <ChakraProvider>
            <Router>

                {!user ?
                    <Login/>
                    :

                    <Box p={4}>
                        <Flex mb={2} justifyContent={'space-between'} alignItems={'center'}>
                            <Breadcrumb backgroundImage="linear-gradient(to bottom, #007bff, #00bfff)" p={'5px'}
                                        borderRadius={'5px'}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink as={NavLink} to="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                            </Breadcrumb>
                            <Flex>
                                <Text>{user.displayName}</Text>
                            </Flex>
                            <Button onClick={handleLogout}>Log Out</Button>
                        </Flex>

                    </Box>
                }
            </Router>
        </ChakraProvider>
    );
}

export default App;
