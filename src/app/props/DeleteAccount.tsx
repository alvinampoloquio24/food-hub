import React, { useState } from "react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void | undefined;
  name: string | undefined;
  _id: string | undefined;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  name,
  _id,
}) => {
  const [confirmName, setConfirmName] = useState("");

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmName(e.target.value);
  };

  const isConfirmDisabled = confirmName !== name;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg h-[50vh] md:text-lg   text-sm max-w-lg lg:w-full w-4/5 flex flex-col justify-around">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion </h2>
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete <strong>{name}</strong>? This action
          is <span className="text-red-600">Irreversible</span>.
        </p>
        <p className="text-gray-700 mb-6">
          Please enter the name <strong>{name}</strong> to confirm.
        </p>
        <input
          type="text"
          className="border border-gray-300 rounded-md w-full px-3 py-2 mb-4"
          placeholder="Enter name to confirm"
          value={confirmName}
          onChange={handleInputChange}
        />
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${
              isConfirmDisabled
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            } text-white px-4 py-2 rounded-md`}
            onClick={() => _id && onConfirm(_id)}
            disabled={isConfirmDisabled}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
