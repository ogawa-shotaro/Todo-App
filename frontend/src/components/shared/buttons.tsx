import type { FC } from "react";

interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const RedButton: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      type="submit"
      className="px-4 py-2 text-white bg-red-500 hover:bg-red-600"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const GreenButton: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      type="submit"
      className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const BlueButton: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      type="submit"
      className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
