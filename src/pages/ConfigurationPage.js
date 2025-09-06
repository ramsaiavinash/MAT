
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfigurationPage = () => {
  const [hasAppId, setHasAppId] = useState(false);
  const [tenantUrl, setTenantUrl] = useState('');
  const [existingTenant, setExistingTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/login');
      return;
    }

    const fetchTenant = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/tenants/${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          if (data.tenants && data.tenants.length > 0) {
            setExistingTenant(data.tenants[0]); // Assuming only one tenant for simplicity
            setTenantUrl(data.tenants[0].tenantId); // Pre-fill the form
            setHasAppId(true); // Assume if tenant exists, App ID was used
          }
        } else {
          console.error('Failed to fetch existing tenant:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching existing tenant:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear any previous success message

    if (hasAppId) {
      const userEmail = sessionStorage.getItem('userEmail'); // Get user email from session storage
      if (!userEmail) {
        alert('User not logged in. Please log in again.');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/users/tenants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail, tenantId: tenantUrl }),
        });

        const data = await response.json();

        if (response.ok) {
          setExistingTenant({ id: Date.now(), tenantId: tenantUrl }); // Update existing tenant state
          setSuccessMessage('Configuration saved successfully!');
          // Only navigate if it was an initial submission (no existing tenant before this submit)
          if (!existingTenant) {
            navigate('/environment-selection');
          }
        } else {
          alert(data.message || 'Failed to save tenant URL.');
        }
      } catch (error) {
        console.error('Tenant submission error:', error);
        alert('An error occurred while saving the tenant URL.');
      }
    } else {
      alert('You must have an App ID and secret to proceed.');
    }
  };

  const handleProceed = () => {
    navigate('/environment-selection');
  };

  if (loading) {
    return <div className="container mt-5 text-center">Loading configuration...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="alert alert-info" role="alert">
        Please check if you are all set to use this migrate tool.
      </div>
      <h1 className="mb-4">Configuration</h1>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {existingTenant ? (
        <div className="card p-4 shadow-sm">
          <p>You already have a configured tenant:</p>
          <p><strong>Tenant URL/ID:</strong> {existingTenant.tenantId}</p>
          <button className="btn btn-primary" onClick={handleProceed}>Proceed to Environment Selection</button>
          <hr />
          <p>Or, if you wish to update it, use the form below:</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <p>Do you have an Client ID and secret with elevated access?</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="hasAppId"
                  id="yes"
                  checked={hasAppId}
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
                  checked={!hasAppId}
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
            <button type="submit" className="btn btn-primary" disabled={!hasAppId}>Update Configuration</button>
          </form>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default ConfigurationPage;
