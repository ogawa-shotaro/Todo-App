"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import type { ChangeEventHandler, FormEventHandler, FC } from "react";

import { type AuthContextType, AuthContext } from "@/app/layout";
// import type { AuthContextType } from "@/app/layout";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import type { SignupInput } from "@/features/users/types/authTypes";
import { createSignupAction } from "@/features/users/stores/reducers/signupReducer";
import { InputField } from "@/components/shared/form-elements/inputField";
import { SubmitButton } from "@/components/shared/buttons/submitButton";

const SignupForm: FC = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const { setIsLoggedIn, setHasInitialized } =
    useContext<AuthContextType>(AuthContext);

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
    dispatch(createSignupAction(formData));

    if (authState.error) {
      setFormData((formData) => ({ ...formData, password: "" }));
    }

    setHasInitialized(true);
    setIsLoggedIn(true);
  };

  if (authState.inProgress) {
    return <p>送信中...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          サインアップ
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
