export const BASE_URL = "https://670bbd787e5a228ec1ce7499.mockapi.io/todos";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const getTodos = async (): Promise<Todo[]> =>
  fetch(BASE_URL).then((res) => res.json());

export const getTodo = async (id: number): Promise<Todo> =>
  fetch(`${BASE_URL}/${id}`).then((res) => res.json());

export const createTodo = async (title: string): Promise<Todo> =>
  fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      completed: false,
    }),
  }).then((res) => res.json());

export const updateTodo = async (todo: Todo): Promise<Todo> =>
  fetch(`${BASE_URL}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json());

export const deleteTodo = async (todo: Todo): Promise<Todo> =>
  fetch(`${BASE_URL}/${todo.id}`, {
    method: "DELETE",
  }).then(() => todo);