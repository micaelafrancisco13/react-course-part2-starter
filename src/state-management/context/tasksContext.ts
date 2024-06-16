import {Task, TaskAction} from "../reducers/tasksReducer";
import {createContext, Dispatch} from "react";

// represents the return value of useState [state, function]
interface TasksContextType {
    tasks: Task[];
    dispatch: Dispatch<TaskAction>;
}

// now, create the context
const TasksContext = createContext<TasksContextType>({} as TasksContextType);

export default TasksContext;