import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MIN_QUANTITY = 1;

function PurchaseControls() {
  const [quantity, setQuantity] = useState(MIN_QUANTITY);

  const handleDecrease = () => {
    setQuantity((current) => Math.max(MIN_QUANTITY, current - 1));
  };

  const handleIncrease = () => {
    setQuantity((current) => current + 1);
  };

  return (
    <div className="flex flex-col gap-4 mt-auto">
      <div className="flex gap-4">
        <div className="flex items-center justify-between border border-outline-variant rounded-full px-6 w-36">
          <button className="text-on-surface hover:text-primary transition-colors flex items-center justify-center" type="button" onClick={handleDecrease}><span className="material-symbols-outlined text-base">remove</span></button>
          <span className="font-label text-sm">{quantity}</span>
          <button className="text-on-surface hover:text-primary transition-colors flex items-center justify-center" type="button" onClick={handleIncrease}><span className="material-symbols-outlined text-base">add</span></button>
        </div>
        <button className="flex-1 bg-gradient-to-b from-primary to-primary-container text-on-primary py-5 font-label text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-colors duration-300 rounded-full" type="button">Add to Cart</button>
      </div>
      <Link to="/shop" className="w-full border border-outline-variant/30 text-on-surface py-5 font-label text-xs uppercase tracking-[0.2em] hover:border-primary transition-colors duration-300 rounded-full inline-flex items-center justify-center">Find in Boutique</Link>
    </div>
  );
}

export default PurchaseControls;
