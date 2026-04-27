import { useModal } from '../hooks/index.js';
import {
  AccountPageHeader,
  OrderDetailsModal,
  OrderHistoryList
} from '../features/userAccount/components/index.js';

const orderCards = [
  {
    code: 'LE-8492',
    status: 'Delivered',
    statusClassName: 'bg-surface-container-high text-on-surface',
    date: 'Placed on October 12, 2023',
    total: '$345.00',
    previews: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBM91OUusxpEi7OZfc5_kg8RR1Z7i8UZbVAZLaskzE1quxKthHNRacpWw065TN-kcsDLHNCjdvvXweQHrG4gdzJZP_65pT2fc-NavlFHB0YKYQGJtm1SG_e5cbB4Uo02hsyj0Ph069jsOwXyMyUT9CsTakcZ7-dnt2RIefh_SkE0FOD5ISq7V2u_N4KisVeOQybk4lzlh2zwcba7wsFyDjFSdeoDqluHHjiQTCiEKGwYnqgWmxkMppFwNrUy46Z2nLl8doVDqxUOvY',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn-PoT_zh-tnXPrGeWX8UcwXQxUlzVLbJmTpSu4I-KvEhr_pM-mRnvuWbwsl6ZyZYkcrHjrUdL9fhNW-nGXI-VZGANs8FX7M8olh0JoxEXM0x2R8HnrTafyN9k1SioLWvU3tmzPoBM6Jv3DV1VwkIuKRv1VcnyLKEeHZDqSjYtiOJR3FpCHPN0q6HltjCVYm47CmCRfbX4cgC5dP523rwHX8VXf2MiQmjuSeVDH6u0_eUSWLvYMYvmncjuMCNuX6jqvwIezyx6rtY'
    ],
    extraItems: null
  },
  {
    code: 'LE-7104',
    status: 'Processing',
    statusClassName: 'bg-secondary-container text-on-secondary-container',
    date: 'Placed on November 02, 2023',
    total: '$180.00',
    previews: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBM91OUusxpEi7OZfc5_kg8RR1Z7i8UZbVAZLaskzE1quxKthHNRacpWw065TN-kcsDLHNCjdvvXweQHrG4gdzJZP_65pT2fc-NavlFHB0YKYQGJtm1SG_e5cbB4Uo02hsyj0Ph069jsOwXyMyUT9CsTakcZ7-dnt2RIefh_SkE0FOD5ISq7V2u_N4KisVeOQybk4lzlh2zwcba7wsFyDjFSdeoDqluHHjiQTCiEKGwYnqgWmxkMppFwNrUy46Z2nLl8doVDqxUOvY'
    ],
    extraItems: '+2 items'
  },
  {
    code: 'LE-6522',
    status: 'Delivered',
    statusClassName: 'bg-surface-container-high text-on-surface',
    date: 'Placed on August 15, 2023',
    total: '$520.00',
    previews: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn-PoT_zh-tnXPrGeWX8UcwXQxUlzVLbJmTpSu4I-KvEhr_pM-mRnvuWbwsl6ZyZYkcrHjrUdL9fhNW-nGXI-VZGANs8FX7M8olh0JoxEXM0x2R8HnrTafyN9k1SioLWvU3tmzPoBM6Jv3DV1VwkIuKRv1VcnyLKEeHZDqSjYtiOJR3FpCHPN0q6HltjCVYm47CmCRfbX4cgC5dP523rwHX8VXf2MiQmjuSeVDH6u0_eUSWLvYMYvmncjuMCNuX6jqvwIezyx6rtY',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBM91OUusxpEi7OZfc5_kg8RR1Z7i8UZbVAZLaskzE1quxKthHNRacpWw065TN-kcsDLHNCjdvvXweQHrG4gdzJZP_65pT2fc-NavlFHB0YKYQGJtm1SG_e5cbB4Uo02hsyj0Ph069jsOwXyMyUT9CsTakcZ7-dnt2RIefh_SkE0FOD5ISq7V2u_N4KisVeOQybk4lzlh2zwcba7wsFyDjFSdeoDqluHHjiQTCiEKGwYnqgWmxkMppFwNrUy46Z2nLl8doVDqxUOvY',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn-PoT_zh-tnXPrGeWX8UcwXQxUlzVLbJmTpSu4I-KvEhr_pM-mRnvuWbwsl6ZyZYkcrHjrUdL9fhNW-nGXI-VZGANs8FX7M8olh0JoxEXM0x2R8HnrTafyN9k1SioLWvU3tmzPoBM6Jv3DV1VwkIuKRv1VcnyLKEeHZDqSjYtiOJR3FpCHPN0q6HltjCVYm47CmCRfbX4cgC5dP523rwHX8VXf2MiQmjuSeVDH6u0_eUSWLvYMYvmncjuMCNuX6jqvwIezyx6rtY'
    ],
    extraItems: null
  }
];

function AccountOrdersPage() {
  const orderDetailsModal = useModal();

  return (
    <>
      <AccountPageHeader
        description="View and manage your past purchases."
        title="Order History"
      />

      <OrderHistoryList onViewDetails={orderDetailsModal.open} orders={orderCards} />

      <OrderDetailsModal isOpen={orderDetailsModal.isOpen} onClose={orderDetailsModal.close} />
    </>
  );
}

export default AccountOrdersPage;
