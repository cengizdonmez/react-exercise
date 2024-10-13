import { ApiProvider } from "@reduxjs/toolkit/query/react";

import { todoApi } from "./store";
import TodoApp from "./ToDo";



function App() {
  return (
    <ApiProvider api={todoApi}>
      <TodoApp />
    </ApiProvider>
  );
}

export default App;