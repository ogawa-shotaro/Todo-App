"use client";

import { useState } from "react";
import type { ChangeEventHandler, FormEventHandler, FC } from "react";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import type { SigninInput } from "@/features/users/types/authTypes";
import { createSigninAction } from "@/features/users/stores/reducers/signinReducer";
import { InputField } from "@/features/users/components/shared/inputField";
import { SubmitButton } from "@/features/users/components/shared/submitButton";

const SigninForm: FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<SigninInput>({
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
    dispatch(createSigninAction(formData));

    if (authState.error) {
      setFormData((formData) => ({ ...formData, password: "" }));
    }
  };

  if (authState.inProgress) {
    return <p>送信中...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          サインイン
        </h2>
        {authState.error?.message && (
          <p className="text-center text-red-600">
            {Array.isArray(authState.error.message)
              ? authState.error.message.join(" ")
              : authState.error.message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

export default SigninForm;
