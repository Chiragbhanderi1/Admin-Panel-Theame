import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';

// Define a function to check if the user is logged in (replace with your authentication logic)
const isUserLoggedIn = () => {
    if(!Cookies.get('number')){
        return false;
    }
  return true; // Replace with your authentication logic
};

// Custom route guard HOC
const ProtectedRoute = ({ element, redirectTo }) => {
  if (!isUserLoggedIn()) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to={redirectTo} />;
  }

  // If the user is logged in, render the original element
  return element;
};

export default ProtectedRoute;
