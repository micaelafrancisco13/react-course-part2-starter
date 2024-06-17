import './App.css';
import {useReducer} from "react";
import tasksReducer from "./state-management/reducers/tasksReducer";
import TasksContext from "./state-management/context/tasksContext";
import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";
import authReducer from "./state-management/reducers/authReducer";
import AuthContext from "./state-management/context/authContext";

function App() {
    // lift the local state up
    const [tasks, taskDispatch] = useReducer(tasksReducer, []);
    const [user, authDispatch] = useReducer(authReducer, '');

    // first, lift the local state up to the App component
    // second, create a context object with two properties of data [state, setState]
    // third, wrap the component tree with a Provider component and provide initial value from the useReducer
    // lastly, we can access the shared state using the context hook in our components

    // wrap the component tree with Provider component
    return (
        <AuthContext.Provider value={{user, dispatch: authDispatch}}>
            <TasksContext.Provider value={{tasks, dispatch: taskDispatch}}>
                <NavBar/>
                <HomePage/>
            </TasksContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
