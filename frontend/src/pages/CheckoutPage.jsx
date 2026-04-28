import { Link } from 'react-router-dom';
import { ShippingSelection, PaymentMethods, OrderSummary, AddressModal } from '../features/checkout/components';
import { useModal } from '../hooks';

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
  const addressModal = useModal();

  return (
    <div className="pt-20 pb-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <h1 className="font-headline text-4xl text-on-background">Checkout</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-7 space-y-16">
          <ShippingSelection onAddNew={addressModal.open} />
          <PaymentMethods />
        </div>
        <div className="lg:col-span-5">
          <OrderSummary items={summaryItems} />
        </div>
      </div>

      <AddressModal isOpen={addressModal.isOpen} onClose={addressModal.close} />
    </div>
  );
}

export default CheckoutPage;