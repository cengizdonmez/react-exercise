import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://670bbd787e5a228ec1ce7499.mockapi.io/' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getAll: builder.query<Todo[], void>({
            query: () => `todos`,
            providesTags: [{ type: 'Todos', id: 'LIST' }],
        }),
        addTodo: builder.mutation<string, string>({
            query(title) {
              return {
                url: `todos`,
                method: "POST",
                body: {
                    title,
                    completed: false,
                },
              };
            },
            invalidatesTags: [{ type: "Todos", id: "LIST" }],
        }),
        updateTodo: builder.mutation<Todo, Todo>({
            query(todo) {
              return {
                url: `todos/${todo.id}`,
                method: "PUT",
                body: todo,
              };
            },
            invalidatesTags: [{ type: "Todos", id: "LIST" }],
        }),
        deleteTodo: builder.mutation<Todo, Todo>({
            query(todo) {
              return {
                url: `todos/${todo.id}`,
                method: "DELETE",
                body: todo,
              };
            },
            invalidatesTags: [{ type: "Todos", id: "LIST" }],
        }),
    }),
    
});