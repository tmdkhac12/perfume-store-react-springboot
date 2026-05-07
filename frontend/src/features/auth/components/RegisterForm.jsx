import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../../../services';

/** @description: Standalone registration form component for the Auth feature. */
function RegisterForm() {
  const navigate = useNavigate();

  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  /**
   * @description: Updates form fields based on user input to maintain the current registration state.
   * @param {keyof RegisterRequest | 'fullName'} field - Example: "email"
   * @param {string} value - Example: "jane@gmail.com"
   * @returns {void} - formValues with field and value updated 
   */
  const handleFieldChange = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  /**
   * @description: Submits the registration form to the backend. Routes the user to the login page upon success.
   * @flow: Validate input -> Post /auth/register -> Handle response/error -> Navigate/Set state.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      /** @type {import('../types').RegisterRequest} */
      const payload = {
        name: formValues.fullName.trim(),
        username: formValues.username.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
        confirmPassword: formValues.confirmPassword
      };

      const response = await apiClient.post('/auth/register', payload);
      const isSuccess = response?.data === true;

      if (!isSuccess) {
        throw new Error(response?.message || 'Register failed.');
      }

      navigate('/login');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error?.message || 'Unable to register.');
      return;
    }

    setStatus('idle');
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant" htmlFor="fullName">
          Full Name
        </label>
        <input
          className="w-full rounded-full border border-outline-variant/30 bg-transparent px-4 py-3 text-sm text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
          id="fullName"
          name="fullName"
          placeholder="Jane Doe"
          type="text"
          value={formValues.fullName}
          onChange={(event) => handleFieldChange('fullName', event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant" htmlFor="username">
          Username
        </label>
        <input
          className="w-full rounded-full border border-outline-variant/30 bg-transparent px-4 py-3 text-sm text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
          id="username"
          name="username"
          placeholder="janedoe123"
          type="text"
          value={formValues.username}
          onChange={(event) => handleFieldChange('username', event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant" htmlFor="email">
          Email Address
        </label>
        <input
          className="w-full rounded-full border border-outline-variant/30 bg-transparent px-4 py-3 text-sm text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
          id="email"
          name="email"
          placeholder="jane@example.com"
          type="email"
          value={formValues.email}
          onChange={(event) => handleFieldChange('email', event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant" htmlFor="password">
          Password
        </label>
        <input
          className="w-full rounded-full border border-outline-variant/30 bg-transparent px-4 py-3 text-sm text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
          id="password"
          name="password"
          placeholder="••••••••"
          type="password"
          value={formValues.password}
          onChange={(event) => handleFieldChange('password', event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="w-full rounded-full border border-outline-variant/30 bg-transparent px-4 py-3 text-sm text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="••••••••"
          type="password"
          value={formValues.confirmPassword}
          onChange={(event) => handleFieldChange('confirmPassword', event.target.value)}
        />
      </div>

      <div className="space-y-4 pt-4">
        {errorMessage ? (
          <p className="text-sm text-secondary">{errorMessage}</p>
        ) : null}
        <button
          className="w-full rounded-full bg-primary py-4 text-xs uppercase tracking-[0.15em] text-on-primary transition-colors duration-300 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Creating...' : 'Create Account'}
        </button>

        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/30" />
          </div>
          <span className="relative bg-surface-container-lowest px-4 text-xs uppercase tracking-[0.1em] text-on-surface-variant">
            Or
          </span>
        </div>

        <button
          className="flex w-full items-center justify-center gap-3 rounded-full border border-outline-variant/20 bg-transparent py-4 text-xs uppercase tracking-[0.15em] text-on-surface transition-colors duration-300 hover:bg-surface-container-low"
          type="button"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign up with Google
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
