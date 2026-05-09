import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken } from '../../services/authStorage';
import { isTokenValid } from '../../features/auth/utils';

/** @description: Protection wrapper that ensures only authenticated users can access specific routes. */
function AuthGuard({ children }) {
  const token = getAuthToken();
  const location = useLocation();
  const isValid = isTokenValid(token);

  if (!isValid) {
    const message = token ? 'Your session has expired. Please login again.' : 'Please login to access this page.';
    
    // Redirect to login but save the current location to redirect back after login
    return (
      <Navigate
        to="/login"
        state={{ 
          message, 
          from: location.pathname 
        }}
        replace
      />
    );
  }

  return children;
}

export default AuthGuard;
