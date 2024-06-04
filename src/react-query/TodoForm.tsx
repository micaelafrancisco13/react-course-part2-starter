import { useRef } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../hooks/useTodos";
import axios from "axios";

interface AddTodoContext {
    previousTodos: Todo[];
}

const TodoForm = () => {
    const queryClient = useQueryClient();

    // when creating the mutation, we should provide a generic type argument
    // for our context object <AddTodoContext>
    const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
        mutationFn: (todo: Todo) =>
            axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
                .then(res => res.data),
        // onMutate is called before the mutation is executed
        // variables in React Query refer to the data we sent to the backend
        onMutate: (newTodo: Todo) => {
            // we should create a context and return it from this callback, so we can access it on
            // onError() callback
            const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];

            // optimistic adding of todo
            queryClient.setQueryData<Todo[]>(['todos'], (todos) =>
                [newTodo, ...(todos || [])]);

            if (ref.current)
                ref.current.value = '';

            return { previousTodos };
        },
        onSuccess: (savedTodo, newTodo) => {
            // update cached todo with the ID from the backend
            queryClient.setQueryData<Todo[]>(['todos'], (todos) =>
                todos?.map(todo => todo === newTodo ? savedTodo : todo));
        },
        // - the context parameter is the object we create to pass data in-between our callbacks
        // - here, we need a context object that includes todos before we updated the cache (go to onMutate)
        onError: (error, newTodo, context) => {
            if (!context) return;

            // rollback the UI from its previous state
            queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos);
        }
    });
    const ref = useRef<HTMLInputElement>(null);

    return (
        <>
            {addTodo.error && (
                <div className="alert alert-danger">{addTodo.error.message}</div>
            )}
            <form className="row mb-3" onSubmit={event => {
                event.preventDefault();
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
                    <button className="btn btn-primary"
                            disabled={addTodo.isPending}>{addTodo.isPending ? 'Adding...' : 'Add'}</button>
                </div>
            </form>
        </>
    );
};

export default TodoForm;
