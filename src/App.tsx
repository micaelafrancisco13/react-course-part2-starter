import './App.css';
import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";
import { TasksProvider } from "./state-management/tasks";
import AuthProvider from "./state-management/providers/AuthProvider";
// instead of "import TasksProvider from "./state-management/tasks/TasksProvider"
// we can add an index file to the ./state-management/tasks directory

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
