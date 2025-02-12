"use client";

import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { BlueButton } from "@/components/shared/buttons/buttons";
import CreateTodoModal from "@/features/todos/components/createTodoModal";
import { getTodosAction } from "@/features/todos/stores/reducers/getTodosReducer";
import TodoList from "@/features/todos/components/todoList";
import { CreatePagination } from "@/features/todos/components/createPagination";

const PAGE_SIZE = 10;

const TodosPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.todo);

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = state.todoPage.items;
  const totalCount = state.todoPage.totalCount;

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
        <TodoList todos={items} />
      </div>
      {/* モーダル */}
      {isModalOpen && (
        <CreateTodoModal
          onCreateSuccess={() => {
            closeModal();
            dispatch(getTodosAction({ page }));
          }}
          onCancel={() => closeModal()}
        />
      )}
      {/* ページネーション */}
      {totalCount > 0 && (
        <CreatePagination
          {...{ totalCount, PAGE_SIZE, page }}
          onNextPage={() => setNextPage()}
          onPrevPage={() => setPrevPage()}
          onChangePage={(ChangePage) => setPage(ChangePage)}
        />
      )}
    </div>
  );
};
export default TodosPage;
