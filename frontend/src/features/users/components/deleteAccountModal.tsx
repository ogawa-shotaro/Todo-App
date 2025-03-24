import { type FC, MouseEventHandler, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import type { AuthContextType } from "@/features/auths/types/type";
import { useAppDispatch } from "@/stores/hooks";
import { BlueButton, RedButton } from "@/components/shared/buttons/buttons";
import { showToast } from "@/stores/toastSlice";
import Modal from "@/components/shared/modal";
import { AuthContext } from "@/app/layout";
import { useUserHandler } from "./shared/fooks/useUserHandler";
import { error } from "console";

const DeleteAccountModal: FC = () => {
  const { handleUserDelete } = useUserHandler();
  const { user, error } = useContext<AuthContextType>(AuthContext);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDeleteAccount: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    handleUserDelete();

    if (error?.message) {
      dispatch(
        showToast({
          text: "アカウントの削除に失敗しました。",
          type: "error",
        })
      );
    } else {
      dispatch(
        showToast({
          text: "アカウントが削除されました。ご利用ありがとうございました。",
          type: "success",
        })
      );
      router.push("/");
    }
  };

  return (
    <Modal>
      <div className="p-6 bg-white rounded-md shadow-md">
        <h2 className="text-lg font-bold text-center text-gray-700">
          本当にアカウントを削除しますか？
        </h2>
        <p className="mt-2 text-sm text-center text-gray-500">
          この操作は元に戻すことはできません。
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <RedButton label="削除する" onClick={handleDeleteAccount} />
          <Link href={"/todos"}>
            <BlueButton label="キャンセル" />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
