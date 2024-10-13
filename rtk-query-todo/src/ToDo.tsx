import React, { useCallback, useRef } from "react";
import { todoApi, Todo } from "./store";

function TodoApp() {
	const { data: todos } = todoApi.useGetAllQuery();
	const [deleteTodo] = todoApi.useDeleteTodoMutation();
	const [updateTodo] = todoApi.useUpdateTodoMutation();
	const [addTodo] = todoApi.useAddTodoMutation();

	const titleRef = useRef<HTMLInputElement>(null);
	const onAdd = useCallback(() => {
		addTodo(titleRef.current!.value ?? "");
		titleRef.current!.value = "";
	}, [addTodo]);

	const onToggle = useCallback(
		(todo: Todo) => updateTodo({ ...todo, completed: !todo.completed }),
		[updateTodo]
	);

	const onDelete = useCallback((todo: Todo) => deleteTodo(todo), [deleteTodo]);

	return (
		<div className="App">
			<h1>RTK Query Todo</h1>
			<div>
				<input type="text" ref={titleRef} />
				<button onClick={onAdd}>Add</button>
			</div>
			<ul>
				{todos?.map((todo) => (
					<li key={todo.id}>
						<input type="checkbox" checked={todo.completed} 
							onChange={() => onToggle(todo)}
						/>
						{todo.title}
						<button onClick={() => onDelete(todo)}>Delete</button>
					</li>
				))}
			</ul>
	</div>
	);
}

export default TodoApp;