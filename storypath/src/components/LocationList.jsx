import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLocations, deleteLocation } from '../api/api';
import { QRCodeSVG } from 'qrcode.react';

const LocationsList = () => {
  const [posts, setPosts] = useState([]);

  // Fetch the location data 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getLocations();
        const fetchedPosts = await response.json();
        setPosts(Array.isArray(fetchedPosts) ? fetchedPosts : []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Handle location deletion
  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      try {
        await deleteLocation(postId);
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        alert('Location deleted successfully!');
      } catch (error) {
        console.error("Error deleting location:", error);
        alert('Failed to delete location.');
      }
    }
  };

  // Add custom body class for styling 
  useEffect(() => {
    document.body.classList.add('list-body');
    return () => {
      document.body.classList.remove('list-body');
    };
  }, []);

  // Convert HTML tags into plain texts
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 border-end pe-3">
          <h1 className="mb-4">List of Locations</h1>
          <Link to="/add-locations" className="btn btn-primary mb-3 me-2">Add a Location</Link>
          <Link to="/preview" className="btn btn-secondary mb-3">Preview Project</Link>
        </div>

        {/* The list of locations */}
        <div className="col-md-8">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map(post => (
              <div className="card mb-3 rounded" key={post.id}>
                <div className="card-body">
                  <h5 className="card-title">{post.location_name}</h5>
                  <p className="card-text">
                    {stripHtmlTags(post.location_content).length > 100 
                      ? `${stripHtmlTags(post.location_content).substring(0, 100)}...` 
                      : stripHtmlTags(post.location_content)}
                  </p>
                  <Link to={`/locations/${post.id}`} state={{ post }} className="btn btn-primary me-2">View More</Link>
                  <Link to={`/edit-location/${post.id}`} className="btn btn-secondary me-2">Edit Location</Link>
                  <button 
                    className="btn btn-brown" 
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                  <div className="mt-3">
                    <QRCodeSVG value={`https://yourdomain.com/locations/${post.id}`} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No locations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationsList;
