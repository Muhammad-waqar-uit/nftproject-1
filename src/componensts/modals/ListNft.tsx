import React, { useState, useEffect } from "react";

interface Props {
  isOpenProp: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListModal: React.FC<Props> = ({ isOpenProp, onClose }) => {
  const [isOpen, setIsOpen] = useState(isOpenProp);
  const [number, setNumber] = useState(0);

  // Update isOpen state when isOpenProp changes
  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setNumber(Math.max(0, value)); // Ensure the number is not negative
    }
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
      id="modal"
    >
      <div className="bg-white rounded-lg p-8 max-w-md relative">
        <button className="absolute top-0 right-0 p-2" onClick={handleClose}>
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Price of NFT</h2>
        <p className="mb-4">Modal content goes here...</p>
        <input
          type="number"
          value={number}
          onChange={handleNumberChange}
          min="0"
          className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
        />
      </div>
    </div>
  );
};

export default ListModal;
