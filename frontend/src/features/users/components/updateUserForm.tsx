"use client";

import type { ChangeEventHandler, FormEventHandler, FC } from "react";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import type { AuthContextType } from "@/features/auths/types/type";
import type { UpdateInput } from "@/features/users/types/type";
import { InputField } from "@/components/shared/form-elements/inputField";
import { SubmitButton } from "@/components/shared/buttons/submitButton";
import { BlueButton, GreenButton } from "@/components/shared/buttons/buttons";
import { AuthContext } from "@/app/layout";
import { useUserHandler } from "./shared/fooks/useUserHandler";

const UpdateUserForm: FC = () => {
  const { handleUserUpdate, isUpdated, setIsUpdated } = useUserHandler();
  const { user, error, loading, setError } =
    useContext<AuthContextType>(AuthContext);

  const [formData, setFormData] = useState<UpdateInput>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormData((formState) => ({
      ...formState,
      [name]: value.trim(),
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setError(null);
    handleUserUpdate(formData);

    error && setFormData((formData) => ({ ...formData, password: "" }));
  };

  if (loading) {
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
        {error?.message && (
          <p className="text-center text-red-600">
            {Array.isArray(error.message)
              ? error.message.join(" ")
              : error.message}
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
