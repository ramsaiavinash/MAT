import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const identityOptions = [
  'Users Report',
  'Security Groups Report',
  'M365 Groups Report',
  'Devices Report',
  'Contact Report',
  'Azure AD Connect Configuration Report',
  'Enterprise Apps Report',
];

const identitySecurityOptions = [
  'MFA Report',
  'Conditional Access Policies Report',
  'Password Expiration Policy Report',
  'App Registration Expiration Policy Report',
];

const IdentityAssessmentPage = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleSelectAll = () => {
    const allOptions = [...identityOptions, ...identitySecurityOptions];
    setSelectedOptions(allOptions);
  };

  const handleClear = () => {
    setSelectedOptions([]);
  };

  const handleSelect = () => {
    console.log('Selected items:', selectedOptions);
    // In a real app, you would process these selected options
    alert('Selected items: ' + selectedOptions.join(', '));
  };

  return (
    <div className="container mt-5 pb-5">
      <div className="text-start mb-4">
        <button className="btn btn-info btn-lg" onClick={() => navigate('/assessment-options')}>Back to Assessment Options</button>
      </div>
      <h2 className="text-center" style={{ color: '#003366' }}>You have Selected Assessment for Identity online (Entra)</h2>

      <div className="card mx-auto mt-4" style={{ maxWidth: '800px' }}>
        <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <h4 className="card-title">Select Assessment Reports:</h4>

          <div className="mb-3">
            <label className="form-label">Identity</label>
            {identityOptions.map((option) => (
              <div className="form-check" key={option}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={option}
                  id={option.replace(/\s/g, '')}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                <label className="form-check-label" htmlFor={option.replace(/\s/g, '')}>
                  {option}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label">Identity Security</label>
            {identitySecurityOptions.map((option) => (
              <div className="form-check" key={option}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={option}
                  id={option.replace(/\s/g, '')}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                <label className="form-check-label" htmlFor={option.replace(/\s/g, '')}>
                  {option}
                </label>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-primary" onClick={handleSelectAll}>Select All</button>
            <button className="btn btn-outline-warning" onClick={handleClear}>Clear</button>
            <button className="btn btn-success" onClick={handleSelect}>Select</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityAssessmentPage;
