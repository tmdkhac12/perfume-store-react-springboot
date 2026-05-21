import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { apiClient, writeCartItems } from '../services';

/** @description: Page to handle and display the result of a VNPay payment transaction. */
function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('Verifying your payment...');
  const [resultData, setResultData] = useState(null);

  /**
   * @description: Verifies the payment result with the backend using URL parameters.
   * @flow: Get params -> API Call -> Update UI -> Clear cart if success.
   * @returns {Promise<void>} - status and message updated
   */
  const verifyPayment = async () => {
    const params = Object.fromEntries(searchParams.entries());

    if (Object.keys(params).length === 0) {
      setStatus('error');
      setMessage('Invalid payment result parameters.');
      return;
    }

    try {
      const response = await apiClient.get('/payment/vnpay-return', { query: params });
      const isErrorResponse = !response || response.error || response.status >= 400;

      if (isErrorResponse) {
        throw new Error(response?.message || 'Payment verification failed.');
      }

      const responseCode = response?.data?.responseCode;

      if (responseCode === '00') {
        setStatus('success');
        setMessage(response?.message || 'Payment Successful');
        setResultData(response.data);
        // Clear cart on successful payment
        writeCartItems([]);
      } else {
        setStatus('error');
        setMessage(response?.message || 'Payment was not completed successfully.');
        setResultData(response.data);
      }
    } catch (error) {
      setStatus('error');
      setMessage(error?.message || 'An error occurred while verifying your payment.');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [searchParams]);

  return (
    <div className="pt-20 pb-24 px-4 sm:px-8 max-w-3xl mx-auto w-full flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-[40px] p-8 md:p-12 w-full shadow-sm">
        {status === 'loading' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>
            <h1 className="font-headline text-3xl text-on-background">Verifying Payment</h1>
            <p className="font-body text-on-surface-variant">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center text-success">
                <span
                  className="material-symbols-outlined text-5xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="font-headline text-4xl text-on-background">Thank You!</h1>
              <p className="font-headline text-xl text-success uppercase tracking-widest">
                {message}
              </p>
              <p className="font-body text-on-surface-variant">
                Your order{' '}
                <span className="font-bold text-on-background">#{resultData?.invoiceId}</span> has
                been processed successfully.
              </p>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/orders"
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-label text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-colors duration-300 inline-flex items-center justify-center"
              >
                View My Orders
              </Link>
              <Link
                to="/"
                className="border border-outline-variant/40 text-on-surface px-8 py-4 rounded-full font-label text-xs uppercase tracking-[0.2em] hover:border-primary transition-colors duration-300 inline-flex items-center justify-center"
              >
                Back to Gallery
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-error/10 flex items-center justify-center text-error">
                <span
                  className="material-symbols-outlined text-5xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  error
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="font-headline text-4xl text-on-background">Payment Failed</h1>
              <p className="font-body text-on-surface-variant">{message}</p>
              {resultData?.invoiceId && (
                <p className="text-sm text-on-surface-variant/70 italic">
                  Invoice ID: {resultData.invoiceId}
                </p>
              )}
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/checkout"
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-label text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-colors duration-300 inline-flex items-center justify-center"
              >
                Try Again
              </Link>
              <Link
                to="/"
                className="border border-outline-variant/40 text-on-surface px-8 py-4 rounded-full font-label text-xs uppercase tracking-[0.2em] hover:border-primary transition-colors duration-300 inline-flex items-center justify-center"
              >
                Back to Gallery
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentResultPage;
