"use client";

import { useState } from "react";
import type { ChangeEventHandler, FormEventHandler, FC } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import type { SignupInput } from "../types/signupTypes";
import { signup } from "@/features/users/stores/signupSlice";
import { InputField } from "./shared/inputField";
import { SubmitButton } from "./shared/submitButton";

const SignupForm: FC = () => {
  const dispatch = useAppDispatch();
  const signupState = useAppSelector((state) => state.auth.signup);

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
    dispatch(signup(formData));

    if (signupState.error) {
      setFormData((formData) => ({ ...formData, password: "" }));
    }
  };

  if (signupState.inProgress) {
    return <p>送信中...</p>;
  }

  if (signupState.isSucceeded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            登録が完了しました!
          </h2>
          <p className="text-center text-gray-600">
            ご登録ありがとうございます！サービスを利用する準備ができました。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign Up
        </h2>
        {signupState.error?.message && (
          <p className="text-center text-red-600">
            {Array.isArray(signupState.error.message)
              ? signupState.error.message.join(" ")
              : signupState.error.message}
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
            placeholder="Enter your name"
            label="Name"
            required
          />
          {/* Email field */}
          <InputField
            id="email"
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            label="Email"
            required
          />
          {/* Password field */}
          <InputField
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            label="Password"
            required
          />
          {/* button */}
          <SubmitButton label="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
