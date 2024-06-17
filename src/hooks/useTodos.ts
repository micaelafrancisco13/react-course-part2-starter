import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../react-query/constants";

export interface Todo {
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
        queryKey: CACHE_KEY_TODOS,
        queryFn: fetchTodos,
        staleTime: 10 * 1000 // 10 seconds
    });
};

export default useTodos;
