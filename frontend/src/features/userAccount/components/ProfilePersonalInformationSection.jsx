import { useEffect, useState } from 'react';
import { ToastNotification } from '../../../components/base';
import { apiClient } from '../../../services';

/**
 * @typedef {Object} ProfileFormValues
 * @property {string} fullName
 * @property {string} email
 */

/** @description: Personal information form for the account profile. */
function ProfilePersonalInformationSection() {
  const [status, setStatus] = useState('loading');
  const [statusMessage, setStatusMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState('idle');
  const [saveMessage, setSaveMessage] = useState('');
  const [formValues, setFormValues] = useState({ fullName: '', email: '' });

  /**
   * @description: Loads the current user profile and maps it into the form state.
   * @flow: GET /users/me -> Map response -> Update form values and status.
   */
  const loadProfile = async () => {
    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await apiClient.get('/users/me');
      const isErrorResponse = !response || response.error || response.status >= 400;

      if (isErrorResponse) {
        throw new Error(response?.message || 'Unable to load profile.');
      }

      const profile = response?.data;

      if (!profile) {
        setStatus('empty');
        setStatusMessage('Profile data is unavailable.');
        return;
      }

      setFormValues({
        fullName: profile.name || '',
        email: profile.email || ''
      });
      setStatus('ready');
    } catch (error) {
      setStatus('error');
      setStatusMessage(error?.message || 'Unable to load profile.');
    }
  };

  useEffect(() => {
    void loadProfile();
  }, []);

  /**
   * @description: Updates form fields based on user input to keep profile data in sync.
   * @param {keyof ProfileFormValues} field - Example: "fullName"
   * @param {string} value - Example: "Jane Doe"
   * @returns {void} - formValues with field and value updated
   */
  const handleFieldChange = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  /**
   * @description: Submits profile updates to the backend and syncs the UI with the response.
   * @flow: PATCH /users/me/profile -> Update profile -> Refresh local form state.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaveStatus('saving');
    setSaveMessage('');

    try {
      const payload = {
        name: formValues.fullName.trim(),
        email: formValues.email.trim()
      };

      const response = await apiClient.patch('/users/me/profile', payload);
      const isErrorResponse = !response || response.error || response.status >= 400;

      if (isErrorResponse) {
        throw new Error(response?.message || 'Unable to update profile.');
      }

      const updatedProfile = response?.data;

      if (!updatedProfile) {
        throw new Error('Profile update did not return data.');
      }

      setFormValues({
        fullName: updatedProfile.name || payload.name,
        email: updatedProfile.email || payload.email
      });
      setSaveStatus('success');
      setSaveMessage(response?.message || 'Profile updated successfully.');
    } catch (error) {
      setSaveStatus('error');
      setSaveMessage(error?.message || 'Unable to update profile.');
      return;
    }
  };

  /**
   * @description: Clears the toast state after the notification is dismissed.
   * @returns {void} - saveMessage cleared and saveStatus reset
   */
  const handleToastClose = () => {
    setSaveMessage('');
    setSaveStatus('idle');
  };

  const isLoading = status === 'loading';
  const isReady = status === 'ready';
  const isSaving = saveStatus === 'saving';
  const isFormDisabled = !isReady || isSaving;
  const toastVariant = saveStatus === 'error' ? 'error' : 'success';

  return (
    <div className="col-span-1 rounded-xl bg-surface-container-lowest p-8 md:col-span-2">
      <h2 className="mb-6 font-headline text-2xl text-on-surface">Personal Information</h2>
      {statusMessage ? (
        <p
          className={`mb-4 text-sm ${status === 'error' ? 'text-secondary' : 'text-on-surface-variant'}`}
        >
          {statusMessage}
        </p>
      ) : null}
      <form className="max-w-2xl space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <label
              className="mb-2 text-xs uppercase tracking-[0.1em] text-on-surface-variant"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="w-full border-0 border-b border-outline-variant/50 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0"
              id="fullName"
              name="fullName"
              placeholder="Jane Doe"
              type="text"
              value={formValues.fullName}
              disabled={isFormDisabled}
              onChange={(event) => handleFieldChange('fullName', event.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label
            className="mb-2 text-xs uppercase tracking-[0.1em] text-on-surface-variant"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="w-full border-0 border-b border-outline-variant/50 bg-transparent py-2 text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-0"
            id="email"
            name="email"
            placeholder="jane@example.com"
            type="email"
            value={formValues.email}
            disabled={isFormDisabled}
            onChange={(event) => handleFieldChange('email', event.target.value)}
          />
        </div>

        <div className="pt-4">
          <button
            className="rounded bg-primary px-8 py-3 text-xs uppercase tracking-[0.1em] text-on-primary transition-colors duration-500 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isFormDisabled}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
      <ToastNotification
        autoHideDuration={4000}
        isOpen={Boolean(saveMessage)}
        message={saveMessage}
        onClose={handleToastClose}
        variant={toastVariant}
      />
    </div>
  );
}

export default ProfilePersonalInformationSection;
