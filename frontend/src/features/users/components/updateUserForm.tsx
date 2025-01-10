"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ChangeEventHandler, FormEventHandler, FC } from "react";

import { createUserUpdateAction } from "@/features/users/stores/reducers/updateUserReducer";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import type { SignupInput as UpdateUserInput } from "@/features/users/types/authTypes";
import { InputField } from "@/features/users/components/shared/inputField";
import { SubmitButton } from "@/features/users/components/shared/submitButton";
import { BlueButton, GreenButton } from "@/components/shared/buttons";

const UpdateUserForm: FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<UpdateUserInput>({
    name: "",
    email: "",
    password: "",
  });

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (authState.user) {
      setFormData({
        name: authState.user.name,
        email: authState.user.email,
        password: "",
      });
    }
  }, [authState.user]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormData((formState) => ({
      ...formState,
      [name]: value.trim(),
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const result = await dispatch(createUserUpdateAction(formData));

    "error" in result
      ? setFormData((formData) => ({ ...formData, password: "" }))
      : setIsUpdated(true);
  };

  if (authState.inProgress) {
    return <p>送信中...</p>;
  }

  if (isUpdated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            更新が完了しました!
          </h2>
          <div className="flex justify-center space-x-4">
            <Link href={"/todos"}>
              <BlueButton label="Todoページへ" />
            </Link>
            <GreenButton
              label="編集を続ける"
              onClick={() => setIsUpdated(false)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          アカウント更新
        </h2>
        {authState.error?.message && (
          <p className="text-center text-red-600">
            {Array.isArray(authState.error.message)
              ? authState.error.message.join(" ")
              : authState.error.message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field */}
          <InputField
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="お名前を入力して下さい。"
            label="名前"
            required
          />
          {/* Email field */}
          <InputField
            id="email"
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            placeholder="メールアドレスを入力して下さい。"
            label="メールアドレス"
            required
          />
          {/* Password field */}
          <InputField
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="パスワードを入力して下さい。"
            label="パスワード"
            required
          />
          {/* button */}
          <SubmitButton label="送信" />
        </form>
      </div>
    </div>
  );
};

export default UpdateUserForm;
