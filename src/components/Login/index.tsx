import React from 'react';
import {auth, googleAuthProvider, signInWithPopup} from '../../utils/firebaseApp';
import {Box, Button, Container} from '@chakra-ui/react';

const Login = () => {
    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
        } catch (error) {
            console.error("Authentication error:");
        }
    };

    return (
        <Container centerContent padding="4">
            <Box>
                <Button colorScheme='teal' size='sm'
                        onClick={handleGoogleSignIn}>Sign in with Google
                </Button>

            </Box>

        </Container>
    );
}

export default Login;

