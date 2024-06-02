import axios from 'axios';
import React from 'react';
import { useQuery } from "@tanstack/react-query";

interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
}

const TodoList = () => {
    const fetchTodos = () =>
        axios
            .get<Todo[]>('https://jsonplaceholder.typicode.com/todos ')
            .then((res) => res.data);

    const { data: todos, error, isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos
    });

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>{error.message}</p>;

    return (
        <ul className="list-group">
            {todos?.map((todo) => (
                <li key={todo.id} className="list-group-item">
                    {todo.title}
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
