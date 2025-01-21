"use client";

import { useState } from "react";

import { BlueButton } from "@/components/shared/buttons/buttons";
import CreateTodoModal from "@/features/todos/components/createTodoModal";

// ダミーデータ
const todos = [
  { id: 1, title: "issueを作成", body: "Todo機能のCRUD処理に関する事。" },
  { id: 2, title: "JS、CSSの勉強", body: "サイトを作成する。" },
  {
    id: 3,
    title: "プログラミング学習",
    body: "Reactの公式ドキュメントを読む",
  },
];

const TodosPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen((state) => !state);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-700 text-center mb-8">
          📝 Todo 一覧
        </h1>
        <div className="flex justify-end mb-6 text-lg font-medium ">
          <BlueButton label="新規Todo" onClick={openModal} />
        </div>
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
      </div>
      {/* モーダル */}
      {isModalOpen && <CreateTodoModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};
export default TodosPage;
