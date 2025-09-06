import React from 'react';
import { useNavigate } from 'react-router-dom';

const CloudLoginPage = () => {
  const navigate = useNavigate();

  const handleCloudLogin = (e) => {
    e.preventDefault();
    // Mock API call - In a real app, you'd send credentials to a backend
    console.log('Attempting Cloud login...');
    // After successful login, navigate to dashboard or appropriate page
    navigate('/selection');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center" style={{ color: '#003366' }}>Microsoft 365 Login</h2>
      <div className="card mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <form onSubmit={handleCloudLogin}>
            <div className="mb-3">
              <label htmlFor="clientId" className="form-label">Client ID</label>
              <input type="text" className="form-control" id="clientId" required placeholder="Enter your Client ID" />
            </div>
            <div className="mb-3">
              <label htmlFor="clientSecret" className="form-label">Client Secret</label>
              <input type="password" className="form-control" id="clientSecret" required placeholder="Enter your Client Secret" />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">Proceed</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/environment-selection')}>Back</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CloudLoginPage;
