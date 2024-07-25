"use client";
import React, { useState } from 'react';
import OrderSummary from './OrderSummary';
import OrderSummaryModal from './OrderSumaryModal';

const ClientWrapper: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="md:hidden">
        <button
          className="fixed bottom-4 right-4 bg-amber-500 text-white rounded-full p-3 shadow-lg"
          onClick={openModal}
        >
          Ver Resumen
        </button>
        <OrderSummaryModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <div className="hidden md:block">
        <OrderSummary onClose={() => {}} />
      </div>
    </>
  );
};

export default ClientWrapper;
