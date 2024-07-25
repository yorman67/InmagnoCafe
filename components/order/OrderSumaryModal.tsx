"use client";
import React from 'react';
import OrderSummary from './OrderSummary';

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-full mx-4 overflow-auto">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <OrderSummary onClose={onClose} />
      </div>
    </div>
  );
};

export default OrderSummaryModal;
