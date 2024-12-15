"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEventHandler, FormEventHandler, FC } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import type { SigninInput } from "@/features/users/types/authTypes";
import { createSigninAction } from "@/features/users/stores/reducers/signinReducer";
import { InputField } from "@/features/users/components/shared/inputField";
import { SubmitButton } from "@/features/users/components/shared/submitButton";

const SigninForm: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const signinState = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (signinState.isSucceeded) {
      router.push("/");
    }
  }, [signinState.isSucceeded]);

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

    if (signinState.error) {
      setFormData((formData) => ({ ...formData, password: "" }));
    }
  };

  if (signinState.inProgress) {
    return <p>送信中...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign In
        </h2>
        {signinState.error?.message && (
          <p className="text-center text-red-600">
            {Array.isArray(signinState.error.message)
              ? signinState.error.message.join(" ")
              : signinState.error.message}
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
          <SubmitButton label="Sign In" />
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
