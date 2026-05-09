import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoginForm } from '../features/auth';
import { ToastNotification } from '../components/base';

/** @description: Login page component with integrated toast notification for authentication errors. */
function LoginPage() {
  const location = useLocation();
  const [toast, setToast] = useState({ isOpen: false, message: '', variant: 'error' });

  useEffect(() => {
    if (location.state?.message) {
      setToast({
        isOpen: true,
        message: location.state.message,
        variant: 'error'
      });
      
      // Clear location state to prevent toast from reappearing on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const closeToast = () => setToast(prev => ({ ...prev, isOpen: false }));

  return (
    <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-surface-variant/50 bg-surface-container-lowest shadow-[0_10px_60px_-15px_rgba(0,0,0,0.05)]">
      <ToastNotification 
        isOpen={toast.isOpen}
        message={toast.message}
        variant={toast.variant}
        onClose={closeToast}
      />
      <div className="flex flex-col md:flex-row">
        <div className="relative hidden w-1/2 bg-surface-container md:block">
          <img
            alt="Minimalist perfume bottle"
            className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-multiply"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNYV0ZIBcFXHL7LvkM5JoO_OmmPTXDcs-9WpS7HxHFXK9t5ivUpLopRcLbYYUyRryZfWi1rHgIsvh0TchInZiLk9hzsIK1b9FBRzOhhxBDDeLb4SEjsa0T1Ey2iKDP-ID0-AIar401X6H6h6S4XzUipeKJyrSWg55simZJ3XAKXbiXT89VajvXTGM4wKO42fJBBZ8mlZks6YHHYJByJJIGsSBVTKI-DKBIys9L9HYXqSZL8fxFhLM5-P9zCKmSvgFy8QLmfOu0_zI"
          />
        </div>

        <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-16">
          <div className="mb-10 text-center md:text-left">
            <h1 className="mb-4 font-headline text-4xl leading-tight text-primary md:text-5xl">Welcome Back</h1>
            <p className="text-base text-on-surface-variant md:text-lg">
              Sign in to your account to continue your olfactory journey.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
