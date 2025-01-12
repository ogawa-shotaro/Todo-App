import React from "react";

const DeleteAccountModal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {children}
    </div>
  );
};

export default DeleteAccountModal;
