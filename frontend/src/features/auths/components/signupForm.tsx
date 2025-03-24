"use client";

import type { ChangeEventHandler, FormEventHandler, FC } from "react";
import { useState, useContext } from "react";
import Link from "next/link";

import type { SignupInput, AuthContextType } from "@/features/auths/types/type";
import { InputField } from "@/components/shared/form-elements/inputField";
import { SubmitButton } from "@/components/shared/buttons/submitButton";
import { AuthContext } from "@/app/layout";
import { useAuthHandler } from "@/features/auths/components/shared/fooks/useAuthHandler";

const SignupForm: FC = () => {
  const { handleSignup } = useAuthHandler();
  const { error, loading } = useContext<AuthContextType>(AuthContext);

  const [formData, setFormData] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormData((formState) => ({
      ...formState,
      [name]: value.trim(),
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    handleSignup(formData);
  };

  {
    loading && <p>送信中...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          サインアップ
        </h2>
        <p className="text-center text-red-600">
          {Array.isArray(error?.message)
            ? error?.message.join(" ")
            : error?.message}
        </p>
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
        {/* 導線 */}
        <div className="text-center space-y-2">
          <p className="text-gray-600">
            既にアカウントをお持ちの方→{" "}
            <Link href="/signin" className="text-blue-500 hover:underline">
              {" "}
              <strong>
                <u>サインイン</u>
              </strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
