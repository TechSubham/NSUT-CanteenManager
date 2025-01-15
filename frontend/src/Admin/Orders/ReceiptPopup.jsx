
import React from 'react';

const ReceiptPopup = ({ order, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-green-600">Order Receipt</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>
        <div className="mt-4">
          <p><strong>Customer Name:</strong> {order.customerName}</p>
          <p><strong>Items:</strong></p>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>{item.name} - {item.price}</li>
            ))}
          </ul>
          <p><strong>Total Price:</strong> {order.total}</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPopup;