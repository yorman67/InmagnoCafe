"use client";
import React, { useState } from 'react';
import OrderSidebar from './OrderSidebar';
import { Category } from '@prisma/client';

interface OrderSidebarClientProps {
  categories: Category[];
}

const OrderSidebarClient: React.FC<OrderSidebarClientProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 bg-amber-500 text-white rounded-full p-3 shadow-lg z-50"
        onClick={toggleMenu}
      >
        {isOpen ? '✖' : '☰'}
      </button>
      <div
        className={`fixed inset-0 z-40 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleMenu}
        ></div>
        <div className="relative z-50 w-64 bg-white h-full shadow-lg">
          <OrderSidebar categories={categories} onClose={closeMenu} />
        </div>
      </div>
      <div className="hidden md:block">
        <OrderSidebar categories={categories} />
      </div>
    </>
  );
};

export default OrderSidebarClient;
