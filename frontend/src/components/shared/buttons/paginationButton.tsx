import type { FC } from "react";

interface ButtonProps {
  label: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  page: number;
  currentPage: number;
}

export const PaginationButton: FC<ButtonProps> = ({
  label,
  onClick,
  page,
  currentPage,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded ${page === currentPage ? "bg-indigo-900 text-white" : "bg-gray-300 text-black hover:bg-gray-400"}`}
    >
      {label}
    </button>
  );
};
