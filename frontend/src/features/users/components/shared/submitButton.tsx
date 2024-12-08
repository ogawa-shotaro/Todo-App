import type { FC } from "react";

interface SubmitButtonProps {
  label: string;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ label }) => {
  return (
    <button
      type="submit"
      className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
    >
      {label}
    </button>
  );
};
