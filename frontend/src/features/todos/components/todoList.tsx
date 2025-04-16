import { useState } from "react";

import type { Todo, TodoListProps } from "@/features/todos/types/type";
import { GreenButton, RedButton } from "@/components/shared/buttons/buttons";
import CreateUpdateModal from "@/features/todos/components/createUpdateModal";

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const openModal = (todo: Todo) => {
    setIsModalOpen(true);
    setSelectedTodo(todo);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="space-y-6">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="relative p-6 border rounded-lg shadow-md hover:shadow-lg bg-white transform hover:scale-105 transition duration-300"
        >
          <h2 className="text-xl font-bold text-gray-700">{todo.title}</h2>
          <p className="text-gray-600 mt-2 leading-relaxed">{todo.body}</p>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <GreenButton label="編集" onClick={() => openModal(todo)} />
            <RedButton label="削除" />
          </div>
        </div>
      ))}
      {/* モーダル */}
      {isModalOpen && (
        <CreateUpdateModal
          todoItem={selectedTodo}
          onCreateSuccess={() => {
            closeModal();
          }}
          onCancel={() => closeModal()}
        />
      )}
    </div>
  );
};
export default TodoList;
