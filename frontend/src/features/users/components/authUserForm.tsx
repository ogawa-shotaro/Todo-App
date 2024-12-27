"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEventHandler, FormEventHandler, FC } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import type { SigninInput as AuthUserInput } from "@/features/users/types/authTypes";
import { InputField } from "@/features/users/components/shared/inputField";
import { SubmitButton } from "@/features/users/components/shared/submitButton";
import { createUserAuthorizationAction } from "@/features/users/stores/reducers/authUserReducer";

const AuthUserForm: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authState.isUserUpdateAuthorized) {
      router.push("/updateUser");
    }
  }, [authState.isUserUpdateAuthorized]);

  const [formData, setFormData] = useState<AuthUserInput>({
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
    dispatch(createUserAuthorizationAction(formData));

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
          Auth User
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
          <SubmitButton label="Auth User" />
        </form>
      </div>
    </div>
  );
};

export default AuthUserForm;
