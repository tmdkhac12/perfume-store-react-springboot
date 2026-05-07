import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../../../services';
import { clearAuthToken, setAuthToken } from '../../../services/authStorage';
import { decodeTokenPayload, resolveRoles, resolvePostLoginPath } from '../utils';

/** @description: Login form component for handling user authentication. */
function LoginForm() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({ username: '', password: '' });

  /**
   * @description: Updates form fields based on user input to maintain the current login state.
   * @param {keyof import('../types').LoginRequest} field - Example: "username"
   * @param {string} value - Example: "janedoe123"
   * @returns {void}
   */
  const handleFieldChange = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  /**
   * @description: Submits login credentials to the backend, handles token storage, and routes based on user role.
   * @flow: Post /auth/login -> Store token -> Decode payload -> Resolve roles -> Navigate to dashboard/profile.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await apiClient.post('/auth/login', {
        username: formValues.username.trim(),
        password: formValues.password
      });

      const token = response?.data;
      const isToken = typeof token === 'string' && token.length > 0;

      if (!isToken) {
        throw new Error(response?.message || 'Login failed.');
      }

      setAuthToken(token);
      const payload = decodeTokenPayload(token);
      const roles = resolveRoles(payload);
      navigate(resolvePostLoginPath(roles));
    } catch (error) {
      clearAuthToken();
      setStatus('error');
      setErrorMessage(error?.message || 'Unable to sign in.');
      return;
    }

    setStatus('idle');
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 ml-1 block text-sm uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="username">
          Username or Email
        </label>
        <input
          className="w-full rounded-full border border-outline-variant bg-transparent px-5 py-3 text-on-surface placeholder:text-outline transition-colors duration-300 focus:border-primary focus:ring-0"
          id="username"
          name="username"
          placeholder="Enter your username or email"
          type="text"
          value={formValues.username}
          onChange={(event) => handleFieldChange('username', event.target.value)}
        />
      </div>

      <div className="pt-2">
        <div className="mx-1 mb-2 flex items-baseline justify-between">
          <label className="block text-sm uppercase tracking-[0.1em] text-on-surface-variant" htmlFor="password">
            Password
          </label>
          <Link
            className="text-sm text-secondary underline decoration-1 underline-offset-4 transition-colors hover:text-primary"
            to="/register"
          >
            Forgot Password?
          </Link>
        </div>
        <input
          className="w-full rounded-full border border-outline-variant bg-transparent px-5 py-3 text-on-surface placeholder:text-outline transition-colors duration-300 focus:border-primary focus:ring-0"
          id="password"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={formValues.password}
          onChange={(event) => handleFieldChange('password', event.target.value)}
        />
      </div>

      <div className="space-y-4 pt-6">
        {errorMessage ? (
          <p className="text-sm text-secondary">{errorMessage}</p>
        ) : null}
        <button
          className="block w-full rounded-full bg-primary px-6 py-4 text-center text-sm uppercase tracking-widest text-on-primary transition-colors duration-300 hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Signing In...' : 'Sign In'}
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-outline-variant/30" />
          <span className="mx-4 flex-shrink-0 text-sm text-on-surface-variant">or</span>
          <div className="flex-grow border-t border-outline-variant/30" />
        </div>

        <a
          href="/oauth2/authorization/google"
          className="flex w-full items-center justify-center gap-3 rounded-full border border-outline-variant bg-white px-6 py-4 text-sm text-primary transition-colors duration-300 hover:bg-surface-container-low"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
          Sign in with Google
        </a>

        <Link
          className="mt-4 block w-full rounded-full border border-outline-variant/30 bg-transparent px-6 py-4 text-center text-sm uppercase tracking-widest text-on-surface transition-colors duration-300 hover:border-primary hover:bg-surface-container-low"
          to="/register"
        >
          Create an Account
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
