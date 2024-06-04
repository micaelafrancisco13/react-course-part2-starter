import { useRef } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
    const queryClient = useQueryClient();

    // if unknown type is encountered, deal with it using generics
    // useMutation<DataTypeReceived, ErrorType, DataTypeSent>
    const addTodo = useMutation<Todo, Error, Todo>({
        mutationFn: (todo: Todo) =>
            axios.post<Todo>('https://jsonplaceholder.typicode.com/todosx', todo)
                .then(res => res.data),
        onSuccess: (savedTodo, newTodo) => {
            console.log(savedTodo);
            console.log(newTodo);

            queryClient.invalidateQueries({
                queryKey: ['todos'],
            }).then(response => {
                console.log(response)
            });

            queryClient.setQueryData<Todo[]>(['todos'], (todos) =>
                [savedTodo, ...(todos || [])]);
        },
        // onError: () =>
    });
    const ref = useRef<HTMLInputElement>(null);

    return (
        <>
            {addTodo.error && (
                <div className="alert alert-danger">{addTodo.error.message}</div>
            )}
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
        </>
    );
};

export default TodoForm;
