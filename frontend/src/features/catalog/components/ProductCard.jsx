import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to="/product-details/sample-id" className="group flex flex-col bg-surface-container-lowest pb-6 rounded-[2rem] overflow-hidden">
      <div className="relative w-full aspect-square bg-surface-container-low overflow-hidden rounded-[2rem]">
        <img alt={product.alt} className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out rounded-[2rem]" data-alt={product.dataAlt} src={product.image} />
      </div>
      <div className="pt-6 px-2 flex flex-col">
        <span className="inline-block bg-secondary-container text-on-secondary-container font-label text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 mb-4 self-start rounded-full">{product.family}</span>
        <h2 className="font-headline text-2xl text-primary mb-2"><span>{product.displayTitle}</span></h2>
        <p className="font-body text-sm text-on-surface-variant mb-4 flex-grow">{product.notes}</p>
        <p className="font-body text-base text-primary">{product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
