import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sharePointGenericReports = [
  'Site Collections Usage Report',
  'Site collections Ownership Report',
  'Checked out documents report',
  'WSP/App Catalog report',
  'Sharepoint Site User/Group high level Permission report',
  'Managed Metadata Termstore Report',
  'Content Search Query rules',
  'Custom Solution Report',
  'Custom Features Report',
  'Custom Event Receiver Information Report',
  'Lists with workflows',
  'Checked Out Files Report',
  'List Views Approaching Recommended Thresholds Report',
  'Lists without a major version limit',
  'Lookup Column Information Report',
  'Custom Master Pages and Page Layouts Report',
  'Custom Web Part Pages Report',
  'Deprecated Site Template Report',
  'Orphaned Users (disabled in Active Directory)',
  'Documents/list items with custom permissions',
  'Sites unchanged in the last 6 months',
];

const sharePointM365Reports = [
  'Site Collections enabled with Site Collection App Catalog',
  'Site Collections with custom SPFx Apps',
  'Forms Report',
  'Tenant level PowerAutomate Flows Report',
  'Tenant level PowerApps Report',
  'Office 365 Groups usage and Expiration report',
  'Teams usage report',
  'SPO Tenant Config Data',
];

const SharePointAssessmentPage = () => {
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
    const allOptions = [...sharePointGenericReports, ...sharePointM365Reports];
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
      <h2 className="text-center" style={{ color: '#003366' }}>You have Selected Assessment for Share Point online</h2>

      <div className="card mx-auto mt-4" style={{ maxWidth: '800px' }}>
        <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <h4 className="card-title">Select Assessment Reports:</h4>

          <div className="mb-3">
            <label className="form-label">SharePoint Onprem/Online generic reports</label>
            {sharePointGenericReports.map((option) => (
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
            <label className="form-label">Specific to M365 or SharePoint Online</label>
            {sharePointM365Reports.map((option) => (
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

export default SharePointAssessmentPage;
