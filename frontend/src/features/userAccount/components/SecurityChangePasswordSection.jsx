import { useState } from 'react';
import { apiClient } from '../../../services/apiClient.js';
import { ToastNotification } from '../../../components/base/index.js';

function SecurityChangePasswordSection() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', variant: 'info' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (message, variant) => {
    setToast({ isOpen: true, message, variant });
  };

  const closeToast = () => setToast({ ...toast, isOpen: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.patch('/users/me/password', formData);
      if (response.status === 200) {
        showToast('Password updated successfully', 'success');
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        showToast(response.message || 'Failed to update password', 'error');
      }
    } catch (err) {
      showToast('An unexpected error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-8 rounded-xl bg-surface-container-lowest p-8 shadow-[0_4px_60px_-15px_rgba(25,28,29,0.04)]">
      <ToastNotification
        message={toast.message}
        isOpen={toast.isOpen}
        variant={toast.variant}
        onClose={closeToast}
      />
      <h2 className="mb-6 font-headline text-2xl text-on-surface">Change Password</h2>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label
            className="text-xs uppercase tracking-[0.1em] text-on-surface-variant"
            htmlFor="oldPassword"
          >
            Current Password
          </label>
          <input
            className="w-full border-0 border-b border-[#6b7280]/40 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0 px-2"
            id="oldPassword"
            name="oldPassword"
            placeholder="Enter current password"
            type="password"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-xs uppercase tracking-[0.1em] text-on-surface-variant"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            className="w-full border-0 border-b border-[#6b7280]/40 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0 px-2"
            id="newPassword"
            name="newPassword"
            placeholder="Enter new password"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-xs uppercase tracking-[0.1em] text-on-surface-variant"
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
          <input
            className="w-full border-0 border-b border-[#6b7280]/40 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0 px-2"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm new password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="pt-4">
          <button
            className="inline-block w-auto rounded-lg bg-primary px-8 py-3 text-sm uppercase tracking-wider text-on-primary transition-colors duration-300 hover:bg-secondary"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default SecurityChangePasswordSection;
