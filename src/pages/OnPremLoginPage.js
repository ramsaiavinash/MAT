import React from 'react';
import { useNavigate } from 'react-router-dom';

const OnPremLoginPage = () => {
  const navigate = useNavigate();

  const handleOnPremLogin = (e) => {
    e.preventDefault();
    // Mock API call - In a real app, you'd send credentials to a backend
    console.log('Attempting On-Prem login...');
    // After successful login, navigate to dashboard or appropriate page
    // navigate('/selection'); // Removed navigation
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center" style={{ color: '#003366' }}>On-Premises Login</h2>
      <div className="card mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <form onSubmit={handleOnPremLogin}>
            <div className="mb-3">
              <label htmlFor="account" className="form-label">Account</label>
              <input type="text" className="form-control" id="account" required placeholder="Enter your account name" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" required placeholder="Enter your password" />
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

export default OnPremLoginPage;
