import { useRef } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
    const queryClient = useQueryClient();

    const addTodo = useMutation({
        mutationFn: (todo: Todo) =>
            axios.post<Todo>('https://jsonplaceholder.typicode.com/todos ', todo)
                .then(res => res.data),
        onSuccess: (savedTodo, newTodo) => {
            console.log(savedTodo); // data from the server
            console.log(newTodo); // object we sent to the server

            // we have 2 options for updating the list of to-dos:
            // 1. invalidating the cache
            //  - this re-fetches all the data from the BE
            queryClient.invalidateQueries({
                queryKey: ['todos'],
            }).then(response => {
                console.log(response)
            });

            // 2. updating the data in the cache directly
            //  - updates data in an immutable way
            queryClient.setQueryData<Todo[]>(['todos'], (todos) =>
                [savedTodo, ...(todos || [])]);
        },
        // onError: () =>
        // onSettled() gets called whether the request is successful or not
    });
    const ref = useRef<HTMLInputElement>(null);

    return (
        <form className="row mb-3" onSubmit={event => {
            event.preventDefault();
            // mutation hook in react query
            if (ref.current && ref.current.value) {
                const newTodo = {
                    id: 0,
                    title: ref.current.value,
                    completed: false,
                    userId: 1
                };
                addTodo.mutate(newTodo);
            }
        }}>
            <div className="col">
                <input ref={ref} type="text" className="form-control"/>
            </div>
            <div className="col">
                <button className="btn btn-primary">Add</button>
            </div>
        </form>
    );
};

export default TodoForm;
