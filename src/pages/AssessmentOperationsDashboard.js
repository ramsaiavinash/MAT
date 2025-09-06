import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssessmentOperationsDashboard = () => {
  const navigate = useNavigate();

  // Mock data for assessments
  const assessments = [
    { id: 1, name: 'Security Assessment', status: 'Completed', date: '2025-08-15' },
    { id: 2, name: 'Compliance Audit', status: 'In Progress', date: '2025-09-01' },
    { id: 3, name: 'Performance Review', status: 'Pending', date: '2025-09-10' },
  ];

  const handleView = (id) => {
    navigate(`/report?id=${id}`);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px', height: '100vh' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">MAT</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Assessments
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Reports
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Configuration
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <strong>User</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="container-fluid p-4">
        <h1 className="h3 mb-3">Assessment Operations Dashboard</h1>

        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary">Create New Assessment</button>
        </div>

        <div className="card">
          <div className="card-header">
            Assessments
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((assessment, index) => (
                  <tr key={assessment.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{assessment.name}</td>
                    <td>{assessment.status}</td>
                    <td>{assessment.date}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleView(assessment.id)}>View</button>
                      <button className="btn btn-sm btn-outline-secondary">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentOperationsDashboard;
