import './App.css';
import {useReducer} from "react";
import tasksReducer from "./state-management/reducers/tasksReducer";
import TasksContext from "./state-management/context/tasksContext";
import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";
import AuthProvider from "./state-management/AuthProvider";

function App() {
    const [tasks, taskDispatch] = useReducer(tasksReducer, []);

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
