import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ProjectDetails = () => {
  
  // Add and remove background image when in the project detail page
  useEffect(() => {
    document.body.classList.add('detail-body');
    return () => {
      document.body.classList.remove('detail-body');
    };
  }, []);

  const location = useLocation();
  const { post } = location.state || {}; 

  if (!post) {
    return <div>No project details available.</div>;
  }

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card shadow p-4 rounded" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="text-center mb-4">{post.title}</h1>
        <p><strong>Description:</strong> {post.description}</p>
        <p><strong>Instructions:</strong> {post.instructions}</p>
        <p><strong>Initial Clue:</strong> {post.initial_clue}</p>
        <p><strong>Home Screen Display:</strong> {post.homescreen_display}</p>
        <p><strong>Participant Scoring:</strong> {post.participant_scoring}</p>
      </div>
    </div>
  );
};

export default ProjectDetails;
