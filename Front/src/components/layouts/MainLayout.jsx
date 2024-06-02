import React from 'react';
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children, isOpen }) => {
  const location = useLocation();
  
  // List of routes that should not have padding
  const noPaddingRoutes = ['/'];

  // Check if the current route is in the no-padding list
  const shouldApplyPadding = !noPaddingRoutes.includes(location.pathname);

  return (
    <div className={`App ${isOpen && shouldApplyPadding ? "" : "open"}`}>
      {children}
    </div>
  );
};

export default MainLayout;
