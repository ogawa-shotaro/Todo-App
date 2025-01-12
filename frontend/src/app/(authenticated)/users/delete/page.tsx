"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import type { MouseEventHandler } from "react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { BlueButton, RedButton } from "@/components/shared/buttons";
import { createUserDeleteAction } from "@/features/users/stores/reducers/deleteUserReducer";
import DeleteAccountModal from "@/features/users/components/deleteAccountModal";

const DeleteUserPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIsModalOpen = () => {
    setIsModalOpen((state) => !state);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const result = await dispatch(createUserDeleteAction());

    "error" in result
      ? toast.error("アカウントの削除に失敗しました。")
      : router.push(
          "/?toastMessage=アカウントが削除されました! ご利用ありがとうございました。"
        );
  };

  if (authState.inProgress) {
    return <p>送信中...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          アカウントを削除しますか？
        </h2>
        <div className="flex justify-center space-x-4">
          <Link href={"/todos"}>
            <BlueButton label="Todoページに戻る" />
          </Link>
          <RedButton label="アカウントを削除" onClick={handleIsModalOpen} />
        </div>
      </div>
      {isModalOpen && (
        <DeleteAccountModal>
          <div className="p-6 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-bold text-center text-gray-700">
              本当にアカウントを削除しますか？
            </h2>
            <p className="mt-2 text-sm text-center text-gray-500">
              この操作は元に戻すことはできません。
            </p>
            <div className="flex justify-center mt-4 space-x-4">
              <RedButton label="削除する" onClick={handleSubmit} />
              <Link href={"/todos"}>
                <BlueButton label="キャンセル" />
              </Link>
            </div>
          </div>
        </DeleteAccountModal>
      )}
      {/* トースト */}
      <ToastContainer
        position="top-center"
        className="custom-toast-container"
        autoClose={2000}
      />
    </div>
  );
};

export default DeleteUserPage;
