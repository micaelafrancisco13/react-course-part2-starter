import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useTodos = () => {
    const fetchTodos = () =>
        axios
            .get<Todo[]>('https://jsonplaceholder.typicode.com/todos ')
            .then((res) => res.data);

    return useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos
    });
};

export default useTodos;

interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
}