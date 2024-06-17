import React, { ReactNode, useReducer } from 'react';
import TasksContext from "./tasksContext";

// tasksReducer
export interface Task {
    id: number;
    title: string;
}

// 2 separate interfaces for adding and deleting a task
interface AddTask {
    type: 'ADD';
    task: Task;
}

interface DeleteTask {
    type: 'DELETE';
    taskId: number;
}

export type TaskAction = AddTask | DeleteTask;

const tasksReducer = (tasks: Task[], action: TaskAction): Task[] => {
    switch (action.type) {
        case 'ADD':
            return [action.task, ...tasks];
        case 'DELETE':
            return tasks.filter(t => t.id !== action.taskId);
        default:
            return tasks;
    }
}

// -----

interface Props {
    children: ReactNode;
}

const TasksProvider = ({ children }: Props) => {
    const [tasks, dispatch] = useReducer(tasksReducer, []);

    return (
        <TasksContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;