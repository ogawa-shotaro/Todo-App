"use client";

import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { BlueButton, GrayButton } from "@/components/shared/buttons/buttons";
import CreateTodoModal from "@/features/todos/components/createTodoModal";
import { getTodosAction } from "@/features/todos/stores/reducers/getTodosReducer";
import TodoList from "@/features/todos/components/todoList";

const TodosPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.todo);

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const take = 10;
  const skip = (page - 1) * take;
  const todos = state.todos.slice(skip, skip + take);

  useEffect(() => {
    dispatch(getTodosAction({ page }));
  }, [page]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const setNextPage = () => setPage((page) => page + 1);
  const setPrevPage = () => setPage((page) => page - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-700 text-center mb-8">
          📝 Todo 一覧
        </h1>
        <div className="flex justify-end mb-6 text-lg font-medium ">
          <BlueButton label="新規Todo" onClick={openModal} />
        </div>
        {/* Todoリスト */}
        <TodoList todos={todos} />
      </div>
      {/* モーダル */}
      {isModalOpen && (
        <CreateTodoModal
          onCreateSuccess={() => closeModal()}
          onCancel={() => closeModal()}
        />
      )}
      {/* ページ選択 */}
      <div className="flex items-center justify-center mt-6">
        {page > 1 && (
          <>
            <GrayButton label="前のページ" onClick={setPrevPage} />
            <span className="text-lg font-medium text-gray-600 mx-4">
              ページ: {page}
            </span>
          </>
        )}
        {todos.length === take && (
          <GrayButton label="次のページ" onClick={setNextPage} />
        )}
      </div>
    </div>
  );
};
export default TodosPage;
