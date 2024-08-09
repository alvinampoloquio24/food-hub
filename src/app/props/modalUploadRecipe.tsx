import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 bg-white rounded-lg md:p-6 p-4 md:px-12 lg:w-3/5 md:w-11/12 w-screen h-90p max-w-6xl overflow-auto  ">
        {children}
      </div>
    </div>
  );
};

export default Modal;
