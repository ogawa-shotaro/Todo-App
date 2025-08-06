import type { FC } from "react";

interface SubmitButtonProps {
  label: string;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ label }) => {
  return (
    <button
      type="submit"
      className="w-full px-4 py-2 font-semibold text-white bg-indigo-900 rounded-md hover:bg-indigo-800 "
    >
      {label}
    </button>
  );
};
