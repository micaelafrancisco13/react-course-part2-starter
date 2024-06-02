import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// install npm i @tanstack/react-query-devtools
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// overrides default setting globally
// the following settings below are set to their default values except the "staleTime" property
// go to useTodos.ts
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            // cacheTime property does not exist, but it has a default value of 300_000 ms or 5 minutes
            // - if a query has no observer, that query is considered as inactive, it will be garbage collected
            //   after 5 minutes

            // staleTime: 10 * 1000, // 10 seconds
            // - number of seconds before a fresh cached data becomes stale
            // - stale data is refreshed (call to BE) under 3 different circumstances:
            //   - when network is reconnected
            //   - when a component is mounted
            //   - when the window is refocused

            // 3 settings for re-fetching data
            refetchOnReconnect: true,
            refetchOnMount: true,
            refetchOnWindowFocus: true,
        }
    }
});

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
// number of observers is the number of components that are using a specific query