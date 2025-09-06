import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const exchangeAssessmentReports = [
  'Exchange Org Structure',
  'M365 Groups',
  'Journaling Rules',
  'SPF, DKIM, DMARC',
  'No. of Users',
  'Total mailbox count',
  'Type of mailboxes',
  'Public folder details',
  'Public folder mailboxes',
  'Mailbox permissions',
  'Mailbox delegation',
  'Litigation / Compliance hold',
  'Mailbox size',
  'Archive mailbox usage',
  'Distribution Groups and membership',
  'Mail Enabled Security group',
  'Email delivery restrictions for groups and mailboxes',
  'Group delegations',
  'Group moderation settings',
  'Mail Contacts',
  'Meeting room list',
  'Meeting room configurations',
  'Resource mailbox booking / calendar processing configuration',
  'SMTP addresses',
  'Email Forwarding (internal/external)',
  'Mailbox Auto reply',
  'Mail tips assigned to mailboxes',
  'Mailboxes hidden from GAL',
  'Mailbox rules',
  'Transport rules',
];

const ExchangeAssessmentPage = () => {
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
    const allOptions = [...exchangeAssessmentReports];
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
      <h2 className="text-center" style={{ color: '#003366' }}>You have Selected Assessment for Exchange online</h2>

      <div className="card mx-auto mt-4" style={{ maxWidth: '800px' }}>
        <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <>
          <h4 className="card-title">Select Assessment Reports:</h4>

          <div className="mb-3">
            <label className="form-label">Exchange Assessment Reports</label>
            {exchangeAssessmentReports.map((option) => (
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
          </>
        </div>
      </div>
    </div>
  );
};

export default ExchangeAssessmentPage;