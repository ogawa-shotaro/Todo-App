import React from "react";

const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-xl p-4">{children}</div>
    </div>
  );
};

export default Modal;
