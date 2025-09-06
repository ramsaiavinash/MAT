// This is a placeholder for the Feedback Page.
import React, { useState } from 'react';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this feedback to a backend server.
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
    setFeedback(''); // Clear the form
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center" style={{ color: '#003366' }}>Provide Feedback</h2>
      <div className="card mx-auto mt-4" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          {submitted ? (
            <div className="alert alert-success" role="alert">
              Thank you for your feedback!
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="feedbackText" className="form-label">Your Feedback</label>
                <textarea
                  className="form-control"
                  id="feedbackText"
                  rows="5"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit Feedback</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
