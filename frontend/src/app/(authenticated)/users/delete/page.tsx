"use client";

import { useState } from "react";
import Link from "next/link";

import { useAppSelector } from "@/stores/hooks";
import { BlueButton, RedButton } from "@/components/shared/buttons/buttons";
import DeleteAccountModal from "@/features/users/components/deleteAccountModal";

const DeleteUserPage = () => {
  const authState = useAppSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIsModalOpen = () => {
    setIsModalOpen((state) => !state);
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
      {isModalOpen && <DeleteAccountModal />}
    </div>
  );
};

export default DeleteUserPage;
