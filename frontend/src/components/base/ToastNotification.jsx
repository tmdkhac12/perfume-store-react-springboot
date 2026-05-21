import { useEffect, useState } from 'react';

const variantConfig = {
  success: {
    title: 'Success',
    icon: 'check',
    accentColor: 'bg-[#4CAF50]',
    iconBg: 'bg-[#4CAF50]'
  },
  error: {
    title: 'Error',
    icon: 'close',
    accentColor: 'bg-[#F44336]',
    iconBg: 'bg-[#F44336]'
  },
  info: {
    title: 'Info',
    icon: 'info',
    accentColor: 'bg-[#2196F3]',
    iconBg: 'bg-[#2196F3]'
  }
};

/** @description: Reusable toast notification for transient status messages. */
function ToastNotification({
  message,
  isOpen,
  variant = 'info',
  onClose,
  autoHideDuration = 4000
}) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animationClass, setAnimationClass] = useState('');

  // Handle Mount/Unmount with animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setAnimationClass('animate-fadein');
    } else if (shouldRender) {
      setAnimationClass('animate-fadeout');
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 400); // Wait for fade-out animation
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  // Handle Auto-hide
  useEffect(() => {
    if (!isOpen || !message || !onClose || autoHideDuration === 0) {
      return undefined;
    }

    const timer = setTimeout(() => {
      onClose();
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [autoHideDuration, isOpen, message, onClose]);

  if (!shouldRender || !message) {
    return null;
  }

  const config = variantConfig[variant] || variantConfig.info;

  return (
    <>
      <style>{`
        @keyframes toast-fadein {
          from { top: 4rem; opacity: 0; }
          to { top: 7rem; opacity: 1; }
        }
        @keyframes toast-fadeout {
          from { top: 7rem; opacity: 1; }
          to { top: 4rem; opacity: 0; }
        }
        .animate-fadein {
          animation: toast-fadein 0.4s ease-out forwards;
        }
        .animate-fadeout {
          animation: toast-fadeout 0.4s ease-in forwards;
        }
      `}</style>
      <div
        className={`fixed right-6 z-[9999] max-w-sm w-full sm:w-80 px-4 sm:px-0 ${animationClass}`}
      >
        <div
          className="flex items-stretch bg-white rounded-lg shadow-2xl border border-black/[0.05] overflow-hidden"
          role="status"
          aria-live="polite"
        >
          {/* Left accent border */}
          <div className={`w-1.5 flex-shrink-0 ${config.accentColor}`} />

          <div className="flex flex-1 items-start gap-3.5 p-4">
            {/* Icon in circle */}
            <div
              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${config.iconBg} mt-0.5 shadow-sm`}
            >
              <span className="material-symbols-outlined text-[15px] text-white font-bold leading-none">
                {config.icon}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 pr-1">
              <h3 className="font-bold text-gray-900 text-[14px] leading-tight">{config.title}</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed mt-1.5">{message}</p>
            </div>

            {/* Close button */}
            {onClose && (
              <button
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
                type="button"
                aria-label="Dismiss notification"
                onClick={onClose}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ToastNotification;
