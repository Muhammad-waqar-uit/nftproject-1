import React, { useState } from "react";

interface Props {
  isOpenProp: boolean;
}

const ListModal: React.FC<Props> = ({ isOpenProp }) => {
  const [isOpen, setIsOpen] = useState(isOpenProp);
  const [number, setNumber] = useState(0);

  const closeModal = () => setIsOpen(false);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setNumber(Math.max(0, value)); // Ensure the number is not negative
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Number Input</h2>
            <input
              type="number"
              value={number}
              onChange={handleNumberChange}
              min="0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListModal;
