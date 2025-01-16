import type { FC, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAppDispatch } from "@/stores/hooks";
import { BlueButton, RedButton } from "@/components/shared/buttons";
import { createUserDeleteAction } from "@/features/users/stores/reducers/deleteUserReducer";
import { showToast } from "@/stores/toastSlice";
import Modal from "@/components/shared/modal";

const DeleteAccountModal: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDeleteAccount: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    const result = await dispatch(createUserDeleteAction());

    if ("error" in result) {
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
