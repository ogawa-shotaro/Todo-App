import type { FC } from "react";

interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const RedButton: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      type="submit"
      className="px-4 py-2 text-white  bg-red-500 rounded hover:bg-red-600"
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

export const BlueButtonWithBorder: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      type="submit"
      className="px-4 py-2 text-white text-lg bg-blue-500 border-2 border-white rounded hover:bg-blue-600"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const CloseButton: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      type="submit"
      className="absolute top-2 right-2 px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded hover:bg-gray-200 hover:text-gray-600 transition focus:outline-none"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const GrayButton: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      type="submit"
      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
