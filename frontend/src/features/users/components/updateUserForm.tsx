"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { ChangeEventHandler, FormEventHandler, FC } from "react";

import { createUserUpdateAction } from "@/features/users/stores/reducers/updateUserReducer";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import type { SignupInput as UpdateUserInput } from "@/features/users/types/authTypes";
import { InputField } from "@/features/users/components/shared/inputField";
import { SubmitButton } from "@/features/users/components/shared/submitButton";

const UpdateUserForm: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<UpdateUserInput>({
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
    const result = await dispatch(createUserUpdateAction(formData));

    "error" in result
      ? setFormData((formData) => ({ ...formData, password: "" }))
      : toast.success("アカウントの更新が完了しました!");
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  if (authState.inProgress) {
    return <p>送信中...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Account Update
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
          <SubmitButton label="Account Update" />
        </form>
      </div>
      {/* Toast */}
      <ToastContainer
        position="top-center"
        className="custom-toast-container"
      />
    </div>
  );
};

export default UpdateUserForm;
