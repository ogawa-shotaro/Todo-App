import { useState, type ChangeEventHandler, FormEventHandler } from "react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";

import { InputField } from "@/components/shared/form-elements/inputField";
import { SubmitButton } from "@/components/shared/buttons/submitButton";
import Modal from "@/components/shared/modal";
import { TextField } from "@/components/shared/form-elements/textField";
import { CloseButton } from "@/components/shared/buttons/buttons";
import { createTodoInitializeAction } from "@/features/todos/stores/reducers/createTodoReducer";

import type { TodoInput, ModalProps } from "@/features/todos/types/todoTypes";

const CreateTodoModal: React.FC<ModalProps> = ({ setIsModalOpen }) => {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todo);

  const [formData, setFormData] = useState<TodoInput>({
    title: "",
    body: "",
  });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const { name, value } = event.target;

    setFormData((formState) => ({
      ...formState,
      [name]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const res = await dispatch(createTodoInitializeAction(formData));
    res.payload && closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (todoState.inProgress) {
    return <p>送信中...</p>;
  }

  return (
    <Modal>
      <div className="relative w-full max-w-3xl p-8 space-y-6 bg-white shadow-md rounded-md">
        {/* クローズボタン */}
        <CloseButton label="閉じる" onClick={closeModal} />
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Todo追加
        </h2>
        {/* エラー表示 */}
        {todoState.error?.message && (
          <p className="text-center text-red-600">
            {Array.isArray(todoState.error.message)
              ? todoState.error.message.join(" ")
              : todoState.error.message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* タイトル */}
          <InputField
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="タイトルを入力して下さい。"
            label="タイトル"
            required
          />
          {/* ボディ */}
          <TextField
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Todoの詳細を入力して下さい。"
            label="詳細"
            required
          />
          {/* 送信ボタン */}
          <SubmitButton label="送信" />
        </form>
      </div>
    </Modal>
  );
};

export default CreateTodoModal;
