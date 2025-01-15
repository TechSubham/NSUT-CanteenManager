import React from 'react';
import { Minus, Plus, Edit2 } from 'lucide-react';

const InventoryCard = ({ item, isLowStock, updateQuantity, startEditing, handleEdit, editingId, editValue, setEditValue }) => {
  const isEditing = editingId === item.id;

  return (
    <div className={`${isLowStock ? 'bg-white border border-red-200' : 'bg-gray-50'} p-4 rounded-lg shadow`}>
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <span className="text-sm text-gray-500">{item.category}</span>
        </div>
        <span className={`font-bold ${isLowStock ? 'text-red-600' : 'text-emerald-600'}`}>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-20 px-2 py-1 border rounded"
                min="0"
              />
              <button
                onClick={() => handleEdit(item.id)}
                className="text-sm bg-emerald-100 px-2 py-1 rounded hover:bg-emerald-200"
              >
                Save
              </button>
            </div>
          ) : (
            `${item.quantity} ${item.unit}`
          )}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">₹{item.price}/{item.unit}</span>
        <div className="flex gap-2">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className={`p-1 rounded ${isLowStock ? 'bg-red-100 hover:bg-red-200' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
          >
            <Minus size={16} className={isLowStock ? 'text-red-600' : ''} />
          </button>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="p-1 rounded bg-emerald-100 hover:bg-emerald-200 transition-colors"
          >
            <Plus size={16} className="text-emerald-600" />
          </button>
          {!isEditing && (
            <button
              onClick={() => startEditing(item.id, item.quantity)}
              className="p-1 rounded bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <Edit2 size={16} className="text-blue-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
