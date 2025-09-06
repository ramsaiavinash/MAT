import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AssessmentOperationsDashboard = () => {
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem('userEmail');
  const userName = userEmail ? userEmail.split('@')[0].replace(/\d+/g, '') : 'User';

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) {
      navigate('/login');
      return;
    }

    const fetchAssessments = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/assessments/${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setAssessments(data.assessments || []);
        } else {
          console.error('Failed to fetch assessments:', response.statusText);
          alert('Failed to load assessments.');
        }
      } catch (error) {
        console.error('Error fetching assessments:', error);
        alert('An error occurred while loading assessments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [userEmail, navigate]);

  const handleView = (id) => {
    navigate(`/report?id=${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this assessment? This action cannot be undone.')) {
      return;
    }

    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      alert('User not logged in. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/users/assessments/${userEmail}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAssessments(assessments.filter(assessment => assessment.id !== id));
        alert('Assessment deleted successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to delete assessment: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting assessment:', error);
      alert('An error occurred while deleting the assessment.');
    }
  };

  if (loading) {
    return <div className="container mt-5 text-center">Loading assessments...</div>;
  }

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
        <p className="lead">Welcome {userName}!</p>

        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary me-2" onClick={() => navigate('/configure')}>Go to Configuration</button>
        </div>

        <div className="card">
          <div className="card-header">
            Assessments
          </div>
          <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {assessments.length === 0 ? (
              <p>No assessments initiated yet. Go to Assessment Options to start one.</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Type</th>
                    <th scope="col">Report Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((assessment, index) => (
                    <tr key={assessment.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{assessment.type}</td>
                      <td>{assessment.reportName}</td>
                      <td>{assessment.status}</td>
                      <td>{assessment.date}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleView(assessment.id)}>View</button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(assessment.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentOperationsDashboard;
