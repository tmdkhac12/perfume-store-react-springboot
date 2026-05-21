# Payment Concepts & VNPAY Integration

## 1. Key Concepts to Understand

- **VietQR**: This is a standard for QR code images issued by Napas. It specifies: "If you scan this code, the banking app will know the account number, the bank, and the amount." VietQR itself does not process money; it is simply a "template" that apps can read.
- **MoMo/VNPAY**: These are Payment Gateways/E-wallets. They have their own QR standards (e.g., MoMo QR) and also integrate VietQR. They are licensed by the State Bank of Vietnam to directly hold and circulate cash flows.
- **PayOS / Casso**: These services act as technical "bridges" that:
    - Connect to your bank account.
    - Generate QR codes compliant with VietQR standards.
    - Monitor balance fluctuations and notify your Backend via Webhooks.

VietQR is primarily for bank accounts or e-wallets with pre-existing funds. However, online customers have much more diverse needs:
- **Credit Cards (Visa/Mastercard/JCB)**: Customers want to buy now and pay later (Ecommerce). VietQR cannot do this. Gateways like VNPAY, OnePay, and MoMo connect with international card organizations to handle these transactions.
- **Domestic ATM Cards**: Payment via card number or Napas gateway account.
- **Internal E-wallets**: Customers use MoMo or ZaloPay to receive promotions or use loyalty points to pay directly.

### The "Trust" Factor in E-commerce
Imagine a purchase flow: A customer orders an iPhone worth 30 million VND.
- **Using VietQR/PayOS**: The customer's money goes straight to the shop owner's bank account immediately. If the shop owner is a scammer, they could take the money and shut down the site. The customer loses everything, and banks usually don't resolve these disputes.
- **Using VNPAY/MoMo**: When the customer pays 30 million VND, the money doesn't go to the shop owner immediately. It is held in a "Guarantee Account" by VNPAY/MoMo.
    - They will wait for a few days, or until the order status is updated to "Delivered Successfully."
    - If the customer complains (damaged goods, fake goods), VNPAY/MoMo has the right to refund the money to the customer.
    - If everything is fine, they then transfer the money to the shop owner.

**Significance**: They exist to create **Trust** for the digital economy. Without them, few would dare to buy high-value items from strangers online.

Many merchants still accept VNPAY and MoMo despite the ~2.5% fee and the holding period (usually 1 to 3 business days) because:
- **Conversion Rate**: Accepting credit cards significantly increases the chances of closing a sale for mid-to-high-value products (e.g., over 1 million VND). It's better to lose 2.5% in fees but make the sale than to keep 0% fees but have the customer leave.
- **Marketing**: MoMo and VNPAY frequently burn cash on marketing, offering users discount codes (e.g., "Enter VNPAY50 for 50k off"), which drives traffic to the shop.

---

## 2. VNPAY Operational Flow (Step-by-step)

1. **Initialization**: The customer selects "Payment via VNPAY" and clicks "Place Order."
2. **Create Payment URL (At Backend)**: The Spring Boot Backend receives the request and gathers configuration parameters (Order ID, Amount, IP, Description...).
    - Sorts these parameters alphabetically (A-Z).
    - Uses the secret `vnp_HashSecret` to hash the entire parameter string using the **HMAC-SHA512** algorithm to create a digital signature (`vnp_SecureHash`).
    - Appends this signature to the end of the VNPAY URL to create a complete payment link.
3. **Redirect**: The Backend returns this URL to the Frontend. The Frontend redirects the user to the VNPAY payment gateway interface.
4. **Payment**: The user scans the VietQR code (displayed on the VNPAY page) or enters ATM/Credit card information to pay.
5. **Confirmation via IPN (Webhook)**: As soon as the transaction is successful, VNPAY's system sends a background HTTP POST/GET request (called IPN) to your Spring Boot Backend API to report the transaction status.
6. **Update DB**: Your Backend verifies the signature from VNPAY, checks the amount, and if everything matches, updates the order status to `PAID` and responds to VNPAY in the required format.
7. **Display Result**: VNPAY redirects the user back to the result interface (`vnp_ReturnUrl`) on your website to notify the customer.
