import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
}

const useTodos = () => {
    const fetchTodos = () =>
        axios
            .get<Todo[]>('https://jsonplaceholder.typicode.com/todos ')
            .then((res) => res.data);

    return useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        staleTime: 10 * 1000 // 10 seconds
    });
};

export default useTodos;
