import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  return (
    <div className="p-6">
      <p className="text-lg">Logging you out...</p>
    </div>
  );
};

export default LogoutPage;
