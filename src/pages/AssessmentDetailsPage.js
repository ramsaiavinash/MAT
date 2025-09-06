import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const assessmentReports = {
  "sharepoint-online": {
    displayName: "SharePoint Online",
    reports: [
      { category: "None", items: [] },
      { category: "Tenant Level", items: ["Site Collection Report", "Site Collection Owner Report", "App Catalog Report", "Site Collection Level App catalog Enabled Report", "External User Enabled Site Collection Report", "Metadata Taxonomy Report"] },
      { category: "Site Collection Level", items: ["Site Report", "Document Checked Out Report", "Permission Report", "list or library Report", "Orphan User Report"] }
    ]
  },
  "identity-online": {
    displayName: "Identity online (Entra)",
    reports: [
      { category: "None", items: [] },
      { category: "Identity", items: ["Users Report", "Security Groups Report", "M365 Groups Report", "Devices Report", "Contact Report", "Azure AD Connect Configuration Report", "Enterprise Apps Report"] },
      { category: "Identity Security", items: ["MFA Report", "Conditional Access Policies Report", "Password Expiration Policy Report", "App Registration Expiration Policy Report"] }
    ]
  },
  "exchange-online": {
    displayName: "Exchange online",
    reports: [
      { category: "None", items: [] },
      { category: "Mailbox", items: ["Users Mailbox Report", "Shared Mailbox Report", "M365 Groups mailbox Report", "Resource/Euipment mailbox Report", "Public folder Report"] },
      { category: "Distribution Groups", items: [] },
      { category: "Mail Contacts", items: [] },
      { category: "Hybrid Confirguration", items: [] },
      { category: "Mail Flow", items: [] },
      { category: "Permissions/Delegations", items: [] },
      { category: "Organization Policies", items: [] },
      { category: "MRM", items: [] },
      { category: "Sharing Report", items: [] },
      { category: "Retention Report", items: [] }
    ]
  },
  "onedrive-for-business": {
    displayName: "OneDrive for Business",
    reports: [
      { category: "None", items: [] },
      { category: "Placeholder", items: ["Report 1", "Report 2"] } // Placeholder
    ]
  },
  "teams-enterprise-voice": {
    displayName: "Teams & Enterprise Voice",
    reports: [
      { category: "None", items: [] },
      { category: "Placeholder", items: ["Report A", "Report B"] } // Placeholder
    ]
  },
  "cloud-file-shares": {
    displayName: "Cloud file shares",
    reports: [
      { category: "None", items: [] },
      { category: "Placeholder", items: ["File Share Report 1", "File Share Report 2"] } // Placeholder
    ]
  }
};

const AssessmentDetailsPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [selectedReports, setSelectedReports] = useState({});
  const [allReports, setAllReports] = useState([]);

  const assessmentInfo = assessmentReports[type];

  useEffect(() => {
    if (assessmentInfo) {
      const reports = assessmentInfo.reports.flatMap(cat => cat.items);
      setAllReports(reports);
      const initialSelection = {};
      reports.forEach(report => {
        initialSelection[report] = false;
      });
      setSelectedReports(initialSelection);
    }
  }, [type, assessmentInfo]);

  const handleCheckboxChange = (reportName) => {
    setSelectedReports(prev => ({
      ...prev,
      [reportName]: !prev[reportName]
    }));
  };

  const handleSelectAll = () => {
    const newSelection = {};
    allReports.forEach(report => {
      newSelection[report] = true;
    });
    setSelectedReports(newSelection);
  };

  const handleClear = () => {
    const newSelection = {};
    allReports.forEach(report => {
      newSelection[report] = false;
    });
    setSelectedReports(newSelection);
  };

  const handleSelect = () => {
    const selected = Object.keys(selectedReports).filter(report => selectedReports[report]);
    console.log('Selected Reports:', selected);
    // Here you would typically process the selected reports, e.g., send to backend
    alert('Selected Reports: ' + selected.join(', '));
  };

  if (!assessmentInfo) {
    return (
      <div className="container mt-5">
        <h1 style={{ color: '#003366' }}>Assessment Type Not Found</h1>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/assessment-types')}>Back to Assessment Types</button>
      </div>
    );
  }

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h1 className="mb-4" style={{ color: '#003366' }}>You have Selected Assessment for {assessmentInfo.displayName}</h1>
      <div className="card" style={{ width: '35rem' }}>
        <div className="card-body">
          <p className="card-text">Select reports:</p>
          <div className="mb-3">
            <button className="btn btn-outline-primary btn-sm me-2" onClick={handleSelectAll}>Select All</button>
            <button className="btn btn-outline-secondary btn-sm" onClick={handleClear}>Clear</button>
          </div>
          <div className="form-check">
            {assessmentInfo.reports.map(category => (
              <div key={category.category}>
                {category.category !== "None" && <h5>{category.category}</h5>}
                {category.items.map(report => (
                  <div key={report} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={report}
                      checked={selectedReports[report] || false}
                      onChange={() => handleCheckboxChange(report)}
                    />
                    <label className="form-check-label" htmlFor={report}>
                      {report}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={handleSelect}>Select</button>
          </div>
        </div>
      </div>
      <button className="btn btn-secondary mt-3" onClick={() => navigate('/assessment-types')}>Back</button>
    </div>
  );
};

export default AssessmentDetailsPage;
