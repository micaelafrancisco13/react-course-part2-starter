import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const TodoList = () => {
  // queryKey
  // - unique ID for the query that's used internally for caching
  // - the cached data is accessible via this key
  // - it is set to an array with one or more values
  //    first value is often a string that identifies the type of data we want to store here (e.g., 'todos')
  //    second value is either a string or an object (e.g., 'completed', { completed: true }) for storing completed to-dos

  // queryFn
  // - it is a function that is used to fetch data from the backend
  // - it returns a promise that resolves to data, otherwise, it returns an error
  // - the body of this function uses the function that gets the data from the backend (e.g., useData hook or axios.get())

  const fetchTodos = () =>
    axios
        .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.data)
        .catch((error) => console.error(error));

 const query = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos
  });
 const { data: todos } = query;

  // state hooks no longer needed
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [error, setError] = useState('');

  // as well as the effect hook
  // useEffect(() => {
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/todos')
  //     .then((res) => setTodos(res.data))
  //     .catch((error) => setError(error));
  // }, []);

  // if (error) return <p>{error}</p>;

  // benefits earned:
  // - automatic retries
  // - automatic refresh
  // - caching

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
