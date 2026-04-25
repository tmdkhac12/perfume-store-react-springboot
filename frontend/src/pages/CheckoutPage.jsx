import { useState } from 'react';
import { Link } from 'react-router-dom';

const summaryItems = [
  {
    name: 'Bergamot & Oud',
    detail: 'Extrait de Parfum • 50ml',
    dataAlt: 'minimalist glass perfume bottle with dark amber liquid on white marble surface with sharp dramatic shadows',
    price: '$245.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRiHUQIC_yq4XSmH36X0WLFNzTfMX4fCFHDBOzgyHMZ0pls2jM1xD_vtY3fyhAbwJ87ySkuWdpR6mV109BSb0EKNF4nhLeNO4a3kFtIN1GfALHX8iNftTOb-Ru8P5io9r1flSSZ529Nq0HjPBUiA0CsfAlxwOYZQ18_Nx7YWZEzeohdKeAOHxCe5E1m6ZrIixU9BppKXCSRzkPzux26ZdNH-xwmonlrsJ4tP8PH27rGvWeEC26j5y6kU3_ZvJnuJ3B04l3QTgmsPs'
  },
  {
    name: 'White Vetiver',
    detail: 'Eau de Parfum • 100ml',
    dataAlt: 'elegant frosted white glass perfume bottle against soft grey background with delicate botanical shadows',
    price: '$185.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4S99AkVVT606oZGllieYdUli8nxn-0NbFVwsm8-lQSVv6cuWC1Q7wgICdr9-rvOhl9_NLrAL8zLXEkUmJCAXMccFh7KuJbjPj4RFPW4ggKGmZAIcVYbWR7IHAPRcmuOHH6Uozj5AIorv2qn16fyCWFJ2gv3JLQPoMqGXzeyHkYQOk0w-9rguZHmlUNW5nrJfzq_kKLzQeXOGRX80_HQSKiDHfrCANiIMSrhgfG_hGBGGYIhPCqbgJRs2E7urijj-NSFzZQtq3QIc'
  }
];

function CheckoutPage() {
  const [showAddressModal, setShowAddressModal] = useState(false);

  return (
    <div className="pt-20 pb-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h1 className="font-headline text-4xl text-on-background">Checkout</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-7 space-y-16">
          <section>
            <h2 className="font-headline text-2xl text-on-background mb-8 pb-4 border-b border-outline-variant/30">Shipping Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3">Select Saved Address</label>
                <div className="relative group cursor-pointer">
                  <div className="w-full bg-surface-container-lowest border-2 border-outline-variant/50 py-4 px-6 rounded-[40px] text-on-surface font-body hover:border-accent transition-all duration-300 flex justify-between items-center min-h-[80px]">
                    <div className="flex flex-col gap-1">
                      <span className="font-headline font-semibold text-base text-on-background">Home</span>
                      <span className="font-body text-sm text-on-surface-variant">John Doe • +1 (555) 000-0000</span>
                      <span className="font-body text-sm text-on-surface-variant">123 Perfume Lane, Apt 4B, Manhattan, New York</span>
                    </div>
                    <div className="text-on-surface-variant flex items-center">
                      <span className="material-symbols-outlined transition-transform group-hover:rotate-180" style={{ fontVariationSettings: "'FILL' 0" }}>
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4">
                <div className="flex-grow border-t border-outline-variant/30"></div>
                <span className="font-label text-xs uppercase tracking-[0.1em] text-on-surface-variant">OR</span>
                <div className="flex-grow border-t border-outline-variant/30"></div>
              </div>
              <button className="w-full bg-accent text-on-primary font-label text-sm uppercase tracking-[0.1em] py-4 rounded-[40px] hover:bg-black transition-colors duration-300 flex items-center justify-center gap-2" onClick={() => setShowAddressModal(true)} type="button">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>
                  add
                </span>
                Add New Address
              </button>
            </div>
          </section>
          <section>
            <h2 className="font-headline text-2xl text-on-background mb-8 pb-4 border-b border-outline-variant/30">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="relative cursor-pointer">
                <input checked className="peer sr-only" name="payment_method" readOnly type="radio" />
                <div className="bg-surface-container-lowest rounded-[40px] p-6 ghost-border border-2 peer-checked:border-accent transition-colors duration-300 flex flex-col items-center justify-center text-center gap-4 h-full">
                  <span className="material-symbols-outlined text-4xl text-on-surface" style={{ fontVariationSettings: "'FILL' 0" }}>
                    payments
                  </span>
                  <span className="font-label text-sm uppercase tracking-[0.1em] text-on-background">Cash on Delivery</span>
                </div>
                <div className="absolute top-4 right-4 text-accent opacity-0 peer-checked:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
              </label>
              <label className="relative cursor-pointer">
                <input className="peer sr-only" name="payment_method" type="radio" />
                <div className="bg-surface-container-lowest rounded-[40px] p-6 ghost-border border-2 peer-checked:border-accent transition-colors duration-300 flex flex-col items-center justify-center text-center gap-4 h-full">
                  <span className="material-symbols-outlined text-4xl text-on-surface" style={{ fontVariationSettings: "'FILL' 0" }}>
                    account_balance
                  </span>
                  <span className="font-label text-sm uppercase tracking-[0.1em] text-on-background">Bank Transfer</span>
                </div>
                <div className="absolute top-4 right-4 text-accent opacity-0 peer-checked:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
              </label>
            </div>
          </section>
        </div>
        <div className="lg:col-span-5">
          <div className="bg-surface-container-low rounded-[40px] p-8 sticky top-32">
            <h2 className="font-headline text-2xl text-on-background mb-8">Order Summary</h2>
            <div className="space-y-6 mb-8">
              {summaryItems.map((item) => (
                <div key={item.name} className="flex gap-4">
                  <div className="w-20 h-24 bg-surface-container-lowest rounded-xl overflow-hidden flex-shrink-0">
                    <img alt={item.name} className="w-full h-full object-cover" data-alt={item.dataAlt} src={item.image} />
                  </div>
                  <div className="flex-grow flex flex-col justify-center">
                    <h3 className="font-headline text-lg text-on-background">{item.name}</h3>
                    <p className="font-body text-sm text-on-surface-variant mt-1">{item.detail}</p>
                    <p className="font-body font-medium text-on-background mt-2">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 font-body text-sm border-t border-outline-variant/30 pt-6 mb-8">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span>$430.00</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Shipping</span>
                <span>$15.00</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Tax</span>
                <span>$36.55</span>
              </div>
            </div>
            <div className="flex justify-between items-center font-headline text-xl text-on-background mb-8 pt-6 border-t border-outline-variant/30">
              <span>Total</span>
              <span>$481.55</span>
            </div>
            <Link className="w-full bg-accent text-on-primary font-label text-sm uppercase tracking-[0.1em] py-5 rounded-[40px] hover:bg-black transition-colors duration-300 inline-flex items-center justify-center" to="/account/orders">
              Confirm Order
            </Link>
            <p className="text-center font-body text-xs text-on-surface-variant mt-4">By confirming, you agree to our Terms of Service.</p>
          </div>
        </div>
      </div>

      {showAddressModal ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b border-outline-variant/30 flex justify-between items-center sticky top-0 bg-surface-container-lowest z-10">
              <h3 className="font-headline text-2xl text-on-background">Add New Address</h3>
              <button className="text-on-surface-variant hover:text-on-background transition-colors" onClick={() => setShowAddressModal(false)} type="button">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-8 overflow-y-auto">
              <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                <div>
                  <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_receiver">
                    Receiver Name
                  </label>
                  <input className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300" id="new_receiver" placeholder="John Doe" type="text" />
                </div>
                <div>
                  <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_phone">
                    Phone Number
                  </label>
                  <input className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300" id="new_phone" placeholder="+1 (555) 000-0000" type="tel" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_city">
                      City
                    </label>
                    <input className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300" id="new_city" placeholder="New York" type="text" />
                  </div>
                  <div>
                    <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_ward">
                      Ward/District
                    </label>
                    <input className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300" id="new_ward" placeholder="Manhattan" type="text" />
                  </div>
                </div>
                <div>
                  <label className="block font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant mb-3" htmlFor="new_address">
                    Delivery Address
                  </label>
                  <input className="w-full bg-surface-container border border-outline-variant/30 py-4 px-6 rounded-[40px] text-on-surface font-body focus:ring-0 focus:border-accent transition-colors duration-300" id="new_address" placeholder="123 Perfume Lane, Apt 4B" type="text" />
                </div>
              </form>
            </div>
            <div className="px-8 py-6 border-t border-outline-variant/30 bg-surface-container-lowest sticky bottom-0 z-10 flex justify-end gap-4">
              <button className="px-8 py-4 rounded-[40px] font-label text-sm uppercase tracking-[0.1em] text-on-surface-variant hover:bg-surface-container transition-colors" onClick={() => setShowAddressModal(false)} type="button">
                Cancel
              </button>
              <button className="bg-accent text-on-primary px-8 py-4 rounded-[40px] font-label text-sm uppercase tracking-[0.1em] hover:bg-black transition-colors" onClick={() => setShowAddressModal(false)} type="button">
                Save Address
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CheckoutPage;