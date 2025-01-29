import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProjects, deleteProject } from '../api/api';

const ProjectList = () => {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  // Fetch projects from the API and parse the response as JSON
  const fetchPosts = async () => {
    setLoading(true); 
    try {
      const fetchedPosts = await getProjects(); 
      const data = await fetchedPosts.json(); 
      setPosts(data || []); 
    } catch (error) {
      console.error("Error fetching projects:", error); 
      alert("Failed to fetch projects. Please try again later."); 
    } finally {
      setLoading(false); 
    }
  };

  // Fetch projects data
  useEffect(() => {
    fetchPosts();
  }, []);

  // Navigate to the detailed view of the project
  const handleViewMore = (post) => {
    navigate(`/post/${post.id}`, { state: { post } });
  };

  // Handle project deletion
  const handleDelete = async (postId) => {
    console.log(`Deleting project with ID: ${postId}`); 
    if (window.confirm("Are you sure you want to delete this project?")) { 
      try {
        await deleteProject(postId); 
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId)); // Update state to remove the deleted project
        alert('Project deleted successfully!'); 
      } catch (error) {
        console.error("Error deleting project:", error); 
        alert('Failed to delete project.'); 
      }
    }
  };

  // Add custom body class 
  useEffect(() => {
    document.body.classList.add('list-body');
    return () => {
      document.body.classList.remove('list-body');
    };
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        
        <div className="col-md-4 border-end pe-3">
          <h1 className="mb-4">List of Projects</h1>
          <Link to="/add-projects" className="btn btn-primary mb-3 me-2">Add a Project</Link>
          <Link to="/preview" className="btn btn-secondary mb-3">Preview Project</Link>
        </div>

        {/* The list of projects */}
        <div className="col-md-8">
          {posts.map(post => (
            <div className="card mb-3 rounded" key={post.id || post.title}>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">
                  {post.description.length > 100 ? `${post.description.substring(0, 100)}...` : post.description}
                </p>
                <button 
                  className="btn btn-primary me-2"
                  onClick={() => handleViewMore(post)}>
                  View More
                </button>
                <Link to={`/edit/${post.id}`} className="btn btn-secondary me-2">Edit Project</Link>
                <button 
                  className="btn btn-brown" 
                  onClick={() => handleDelete(post.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
