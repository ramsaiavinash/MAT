import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssessmentOptionsPage = () => {
  const navigate = useNavigate();

  const handleAssessmentTypeClick = (type) => {
    console.log(`Selected Assessment Type: ${type}`);
    if (type === 'Share Point online') {
      navigate('/assessment-details/sharepoint-online');
    } else if (type === 'Identity online (Entra)') {
      navigate('/assessment-details/identity-online');
    } else if (type === 'Exchange online') {
      navigate('/assessment-details/exchange-online');
    } else if (type === 'OneDrive for Business') {
      navigate('/assessment-details/onedrive-for-business');
    } else if (type === 'Teams & Enterprise Voice') {
      navigate('/assessment-details/teams-enterprise-voice');
    } else if (type === 'Cloud file shares') {
      navigate('/assessment-details/cloud-file-shares');
    } else {
      // Handle unknown assessment type or do nothing
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center" style={{ color: '#003366' }}>Select Assessment Type</h2>
      <div className="d-grid gap-3 col-md-8 mx-auto mt-4">
        <button className="btn btn-primary btn-lg" onClick={() => handleAssessmentTypeClick('Identity online (Entra)')}>Identity online (Entra)</button>
        <button className="btn btn-primary btn-lg" onClick={() => handleAssessmentTypeClick('Exchange online')}>Exchange online</button>
        <button className="btn btn-primary btn-lg" onClick={() => handleAssessmentTypeClick('Share Point online')}>Share Point online</button>
        <button className="btn btn-primary btn-lg" onClick={() => handleAssessmentTypeClick('OneDrive for Business')}>OneDrive for Business</button>
        <button className="btn btn-primary btn-lg" onClick={() => handleAssessmentTypeClick('Teams & Enterprise Voice')}>Teams & Enterprise Voice</button>
        <button className="btn btn-primary btn-lg" onClick={() => handleAssessmentTypeClick('Cloud file shares')}>Cloud file shares</button>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate('/selection')}>Back to Selection</button>
      </div>
    </div>
  );
};

export default AssessmentOptionsPage;
