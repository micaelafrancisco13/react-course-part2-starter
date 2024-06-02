import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useTodos = () => {
    const fetchTodos = () =>
        axios
            .get<Todo[]>('https://jsonplaceholder.typicode.com/todos ')
            .then((res) => res.data);

    // stale time is dependent on queries
    // some pieces of data get updated less frequently, so we should give them a higher stale time
    //
    return useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        staleTime: 10 * 1000 // 10 seconds
    });
};

export default useTodos;

interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
}