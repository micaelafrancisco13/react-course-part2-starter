import './App.css';
import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";
import AuthProvider from "./state-management/providers/AuthProvider";
import TasksProvider from "./state-management/providers/TasksProvider";

function App() {
    return (
        <AuthProvider>
            <TasksProvider>
                <NavBar/>
                <HomePage/>
            </TasksProvider>
        </AuthProvider>
    );
}

export default App;
