"use client";
import { ChangeEventHandler, FormEventHandler, useState, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import type { SignupInput } from "../types";
import { signup } from "../authSlice";

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
  if (signupState.error) {
    const errorMessages = Array.isArray(signupState.error.message)
      ? signupState.error.message
      : [signupState.error.message];

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center text-red-600">
            登録に失敗しました
          </h2>
          <p className="text-center text-gray-600">
            以下のエラーを修正して、再度お試しください。
          </p>
          <div className="flex justify-center">
            <ul className="text-sm text-red-600 space-y-2">
              {errorMessages.map((text: string, index: number) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
          >
            再試行する
          </button>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
              placeholder="Enter your name"
              required
            />
          </div>
          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
