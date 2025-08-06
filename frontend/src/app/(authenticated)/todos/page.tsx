"use client";

import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { IndigoButton } from "@/components/shared/buttons/buttons";
import CreateTodoModal from "@/features/todos/components/createTodoModal";
import { getTodosAction } from "@/features/todos/stores/reducers/getTodosReducer";
import TodoList from "@/features/todos/components/todoList";
import { CreatePagination } from "@/features/todos/components/createPagination";
import { useAuthUserContext } from "@/contexts/authUserContext";

const PAGE_SIZE = 10;

const TodosPage = () => {
  const { user } = useAuthUserContext();

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.todo);

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = state.todoPage.items;
  const totalCount = state.todoPage.totalCount;

  useEffect(() => {
    dispatch(getTodosAction({ page }));
  }, [user, page]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-indigo-900 text-center mb-8">
          📝 Todo 一覧
        </h1>
        <div className="flex justify-end mb-6 text-lg font-medium ">
          <IndigoButton label="新規Todo" onClick={openModal} />
        </div>
        {/* Todoリスト */}
        <TodoList
          todos={items}
          onDeleteSuccess={async () => {
            await dispatch(getTodosAction({ page }));
          }}
        />
      </div>
      {/* モーダル */}
      {isModalOpen && (
        <CreateTodoModal
          onCreateSuccess={async () => {
            closeModal();
            await dispatch(getTodosAction({ page }));
          }}
          onCancel={() => closeModal()}
        />
      )}
      {/* ページネーション */}
      {totalCount > 0 && (
        <CreatePagination
          {...{ totalCount, PAGE_SIZE, page }}
          onChangePage={(ChangePage) => setPage(ChangePage)}
        />
      )}
    </div>
  );
};
export default TodosPage;
