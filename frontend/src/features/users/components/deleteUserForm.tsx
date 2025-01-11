"use client";

import Link from "next/link";
import type { FC, MouseEventHandler } from "react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { BlueButton, RedButton } from "@/components/shared/buttons";
import { createUserDeleteAction } from "@/features/users/stores/reducers/deleteUserReducer";

const DeleteUserForm: FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    await dispatch(createUserDeleteAction());
  };

  if (authState.inProgress) {
    return <p>送信中...</p>;
  }

  if (!authState.user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            アカウントが削除されました!
          </h2>
          <p className="text-center text-gray-700">
            ご利用頂きありがとうございました。
            <br />
            またのご縁をお待ちしております。
          </p>
          <Link href={"/"} className="flex items-center justify-center ">
            <BlueButton label="ホームページに戻る" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          アカウントを削除しますか？
        </h2>
        {authState.error?.message && (
          <p className="text-center text-red-600">
            {Array.isArray(authState.error.message)
              ? authState.error.message.join(" ")
              : authState.error.message}
          </p>
        )}
        <div className="flex justify-center space-x-4">
          <Link href={"/todos"}>
            <BlueButton label="Todoページに戻る" />
          </Link>
          <RedButton label="アカウントを削除" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default DeleteUserForm;
