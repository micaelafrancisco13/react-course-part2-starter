import './App.css';
import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";
import { TasksProvider } from "./state-management/tasks";
import { AuthProvider } from "./state-management/auth";
// instead of "import TasksProvider from "./state-management/tasks/TasksProvider"
// we can add an index file to the ./state-management/tasks directory

// anytime something in a context changes, all the components that use that context will re-render.
// a context should only hold values that are closely related and tend to change together.

// to minimize unnecessary changes, we should split up a context into smaller and focused ones, each
// having a single responsibility.

function App() {
    // first, lift the local state up to the App component
    // second, create a context object with two properties of data [state, setState]
    // third, wrap the component tree with a Provider component and provide initial value from the useReducer
    // lastly, we can access the shared state using the context hook in our components

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
