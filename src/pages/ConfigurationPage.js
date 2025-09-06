
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfigurationPage = () => {
  const [hasAppId, setHasAppId] = useState(false);
  const [tenantUrl, setTenantUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasAppId) {
      // Mock API call to store tenant URL
      console.log('Tenant URL:', tenantUrl);
      navigate('/environment-selection');
    } else {
      alert('You must have an App ID and secret to proceed.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="alert alert-info" role="alert">
        Please check if you are all set to use this migrate tool.
      </div>
      <h1 className="mb-4">Configuration</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <p>Do you have an Client ID and secret with elevated access?</p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="hasAppId"
              id="yes"
              onChange={() => setHasAppId(true)}
            />
            <label className="form-check-label" htmlFor="yes">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="hasAppId"
              id="no"
              defaultChecked
              onChange={() => setHasAppId(false)}
            />
            <label className="form-check-label" htmlFor="no">
              No
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="tenantUrl" className="form-label">Please enter your tenant URL or ID:</label>
          <input
              type="text"
              className="form-control"
              id="tenantUrl"
              placeholder="e.g., https://yourtenant.sharepoint.com"
              value={tenantUrl}
              onChange={(e) => setTenantUrl(e.target.value)}
              required
            />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!hasAppId}>Submit</button>
      </form>
    </div>
  );
};

export default ConfigurationPage;
