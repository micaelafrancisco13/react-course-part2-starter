import { createContext, Dispatch } from "react";
import { Task, TaskAction } from "./TasksProvider";

// represents the return value of useState [state, function]
interface TasksContextType {
    tasks: Task[];
    dispatch: Dispatch<TaskAction>;
}

// now, create the context
const TasksContext = createContext<TasksContextType>({} as TasksContextType);

export default TasksContext;