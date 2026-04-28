import React from 'react';

function CartItem({ item }) {
  return (
    <div className="flex flex-col sm:flex-row gap-8 items-start relative group">
      <div className="w-full sm:w-48 aspect-square bg-surface-container-lowest p-4 relative overflow-hidden flex-shrink-0 rounded-[2rem]">
        <img
          alt={item.name}
          className="w-full h-full object-cover rounded-[1.5rem]"
          data-alt={item.dataAlt}
          src={item.image}
        />
      </div>
      <div className="flex flex-col flex-grow w-full">
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="font-headline text-2xl text-on-background mb-2">{item.name}</h3>
            <p className="font-body text-sm text-on-surface-variant max-w-sm mb-4">{item.description}</p>
            <span className="inline-block bg-secondary-container text-on-secondary-container font-label uppercase text-[9px] tracking-[0.1em] px-3 py-1 mb-6 rounded-full">
              {item.volume}
            </span>
          </div>
          <button className="text-on-surface-variant hover:text-error transition-colors rounded-full" type="button">
            <span className="material-symbols-outlined text-sm" data-icon="close">close</span>
          </button>
        </div>
        <div className="flex justify-between items-end mt-auto pt-4">
          <div className="flex items-center border-b border-outline-variant/30 pb-1">
            <button className="text-on-surface-variant hover:text-on-background px-2 text-lg leading-none rounded-full" type="button">-</button>
            <input
              aria-label={`${item.name} quantity`}
              className="w-12 text-center bg-transparent border-none p-0 text-sm font-label focus:ring-0 focus:outline-none"
              min="1"
              readOnly
              type="number"
              value={item.quantity}
            />
            <button className="text-on-surface-variant hover:text-on-background px-2 text-lg leading-none rounded-full" type="button">+</button>
          </div>
          <span className="font-body text-lg text-on-background">{item.price}</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
