import type { TodoListProps } from "@/features/todos/types/todoTypes";

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="space-y-6">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="p-6 border rounded-lg shadow-md hover:shadow-lg bg-white transform hover:scale-105 transition duration-300"
        >
          <h2 className="text-xl font-bold text-gray-700">{todo.title}</h2>
          <p className="text-gray-600 mt-2 leading-relaxed">{todo.body}</p>
        </div>
      ))}
    </div>
  );
};
export default TodoList;
