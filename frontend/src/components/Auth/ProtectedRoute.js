// frontend/src/components/Auth/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // Decode JWT tokens

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Retrieve token from browser storage
  const token = localStorage.getItem('token');
  
  // Redirect to login if no token
  if (!token) return <Navigate to="/" />;
  
  try {
    // Decode token to get user data
    const { role } = jwt_decode(token);
    
    // Check if user has required role
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/" />; // Redirect if unauthorized
    }
    
    // Render child components if authorized
    return children;
  } catch (err) {
    // Handle invalid tokens
    console.error('Token error:', err);
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;