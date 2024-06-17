import './App.css';
import {useReducer} from "react";
import tasksReducer from "./state-management/reducers/tasksReducer";
import TasksContext from "./state-management/context/tasksContext";
import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";
import AuthProvider from "./state-management/AuthProvider";

function App() {
    // lift the local state up
    const [tasks, taskDispatch] = useReducer(tasksReducer, []);

    // first, lift the local state up to the App component
    // second, create a context object with two properties of data [state, setState]
    // third, wrap the component tree with a Provider component and provide initial value from the useReducer
    // lastly, we can access the shared state using the context hook in our components

    // wrap the component tree with Provider component
    return (
        <AuthProvider>
            <TasksContext.Provider value={{tasks, dispatch: taskDispatch}}>
                <NavBar/>
                <HomePage/>
            </TasksContext.Provider>
        </AuthProvider>
    );
}

export default App;
