import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// install npm i @tanstack/react-query-devtools
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </React.StrictMode>
);

// react-query-devtools
// # of observers is the # of components that are using a specific query