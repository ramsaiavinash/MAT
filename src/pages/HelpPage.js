import React from 'react';

const HelpPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center" style={{ color: '#003366' }}>Help and Instructions</h2>
      <div className="card mx-auto mt-4" style={{ maxWidth: '800px' }}>
        <div className="card-body">
          <p>Welcome to the Help page. Here you will find instructions on how to use the Migration Acceleration Toolkit.</p>
          <h4>Getting Started:</h4>
          <ul>
            <li>Navigate to the Home page to begin.</li>
            <li>Use the 'Collaboration on Cloud' or 'Collaboration on On-Premises' options to select your environment.</li>
            <li>Follow the login prompts to access the dashboard.</li>
          </ul>
          <h4>Troubleshooting:</h4>
          <ul>
            <li>If you encounter login issues, please ensure your credentials are correct.</li>
            <li>For any technical difficulties, please use the Feedback page to report the issue.</li>
          </ul>
          <p>For further assistance, contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
