import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const LocationDetails = () => {
  // Manage body class for styling and retrieve location data from route state
  useEffect(() => {
    document.body.classList.add('detail-body'); 

    return () => {
      document.body.classList.remove('detail-body'); 
    };
  }, []);

  const location = useLocation();
  const { post } = location.state || {}; 

  // Convert HTML tags into plain texts
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  if (!post) {
    return <div>No location details available.</div>;
  }

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card shadow p-4 rounded" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="text-center mb-4">{post.location_name}</h1>
        <p><strong>Location Trigger:</strong> {post.location_trigger}</p>
        <p><strong>Location Position:</strong> {post.location_position}</p>
        <p><strong>Score Points:</strong> {post.score_points}</p>
        <p><strong>Clue:</strong> {post.clue}</p>
        <p><strong>Location Content:</strong> {stripHtmlTags(post.location_content)}</p>
      </div>
    </div>
  );
};

export default LocationDetails;


