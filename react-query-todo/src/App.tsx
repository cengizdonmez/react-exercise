import React, { useRef } from "react";
import {
  useQuery,
  useMutation,
  QueryClientProvider,
  QueryClient,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import axios from "axios"; 

import { getTodos, Todo, updateTodo, deleteTodo, createTodo } from "./lib/api";

// export const axiosClient = axios.create({
//   baseURL: "https://670bbd787e5a228ec1ce7499.mockapi.io/",
// });

const queryClient = new QueryClient();

function ReactQueryTodo() {
  
  /* Todos */
  const { data: todos } = useQuery<Todo[]>("todos", getTodos, {
    initialData: [],
  });
  /* const { data: todos } = useQuery<Todo[]>(
    "todos",
    async () => (await axiosClient.get<Todo[]>("/todos")).data,
    {
      initialData: [],
    }
  ); */

  /* Update */
  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });
  /* const updateMutation = useMutation<Response, unknown, Todo>(
    (todo) => axiosClient.put(`/todos/${todo.id}`, todo),
    {
      onSettled: () => queryClient.invalidateQueries("todos"),
    }
  ); */

  /* Delete */
  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });
  /* const deleteMutation = useMutation<Response, unknown, Todo>(
    ({ id }) => axiosClient.delete(`/todos/${id}`),
    {
      onSettled: () => queryClient.invalidateQueries("todos"),
    }
  ); */

  /* Create */
  const createMutation = useMutation(createTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  });
  /* const createMutation = useMutation<Response, unknown, { title: string }>(
    (data) => axiosClient.post("/todos", data),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
        titleRef.current!.value = "";
      },
    }
  ); */

  const titleRef = useRef<HTMLInputElement>(null);  



  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>React Query Todo</h1>
        <div>
          <input type="text" ref={titleRef} />
          <button 
            onClick={()=>{
              createMutation.mutate(titleRef.current?.value || "");
            }}
          >
            Add
          </button>
        </div>
        <ul>
          {todos?.map((todo) => (
            <li key={todo.id}>
              <input 
                type="checkbox" 
                checked={todo.completed}  
                onChange={() => {
                  updateMutation.mutate({ ...todo, completed: !todo.completed });
                }}
              />
              {todo.title}
              <button onClick={() => deleteMutation.mutate(todo)}>Delete</button>
            </li>
          ))}
        </ul>
        
      </div>
    </QueryClientProvider>
  )
}



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryTodo />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;