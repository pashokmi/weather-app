import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./store";
import {ChakraProvider} from "@chakra-ui/react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider>
                <App/>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>
);