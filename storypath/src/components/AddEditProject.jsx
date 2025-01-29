import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, createProject, updateProject } from '../api/api'; 

const AddEditProjectForm = () => {
  const navigate = useNavigate(); 
  const { id } = useParams(); 

  // State to manage project form data
  const [projectData, setProjectData] = useState({
    title: '',
    description: '', 
    instructions: '', 
    initial_clue: '', 
    homescreen_display: '', 
    participant_scoring: '', 
    is_published: false, 
  });

  // Fetch project data by ID if editing an existing project
  const fetchProject = async () => {
    try {
      const project = await getProjectById(id); 
      setProjectData({
        title: project.title,
        description: project.description,
        instructions: project.instructions,
        initial_clue: project.initial_clue,
        homescreen_display: project.homescreen_display,
        participant_scoring: project.participant_scoring,
        is_published: project.is_published, 
      });
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  // Effect to fetch project data when the component mounts or when the ID changes
  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  // Handle changes in input fields and update project data state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProjectData({
      ...projectData,
      [name]: type === 'checkbox' ? checked : value, 
    });
  };

  // Handle form submission for creating or updating project
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      if (id) {
        await updateProject(id, projectData); 
      } else {
        await createProject(projectData); 
      }
      navigate('/projects'); 
    } catch (error) {
      console.error("Error saving project:", error);
      alert('Failed to save project.'); 
    }
  };

  // Manage body class for styling 
  useEffect(() => {
    document.body.classList.add('addedit-body'); 
    return () => {
      document.body.classList.remove('addedit-body'); 
    };
  }, []);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="form-container p-4 bg-white shadow rounded">
            <h2 className="mb-4 text-center">{id ? 'Edit' : 'Add'} a Project</h2>
            <form onSubmit={handleSubmit}>
              
              {/* Title Input */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={projectData.title}
                  onChange={handleChange}
                  required
                />
                <div id="titleHelp" className="form-text">The name of your project.</div>
              </div>

              {/* Description Input */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={projectData.description}
                  onChange={handleChange}
                  required
                />
                <div id="descriptionHelp" className="form-text">Provide a brief description of your project.</div>
              </div>

              {/* Instructions Input */}
              <div className="mb-3">
                <label htmlFor="instructions" className="form-label">Instructions:</label>
                <input
                  type="text"
                  className="form-control"
                  id="instructions"
                  name="instructions"
                  value={projectData.instructions}
                  onChange={handleChange}
                  required
                />
                <div id="instructionsHelp" className="form-text">Instructions for participants.</div>
              </div>

              {/* Initial Clue Input */}
              <div className="mb-3">
                <label htmlFor="initial_clue" className="form-label">Initial Clue:</label>
                <input
                  type="text"
                  className="form-control"
                  id="initial_clue"
                  name="initial_clue"
                  value={projectData.initial_clue}
                  onChange={handleChange}
                />
                <div id="initialClueHelp" className="form-text">The first clue to start the project. (Optional)</div>
              </div>

              {/* Home Screen Display Input */}
              <div className="mb-3">
                <label htmlFor="homescreen_display" className="form-label">Home Screen Display:</label>
                <input
                  type="text"
                  className="form-control"
                  id="homescreen_display"
                  name="homescreen_display"
                  value={projectData.homescreen_display}
                  onChange={handleChange}
                  required
                />
                <div id="homeScreenDisplayHelp" className="form-text">Choose what to display on the homescreen.</div>
              </div>

              {/* Participant Scoring Input */}
              <div className="mb-3">
                <label htmlFor="participant_scoring" className="form-label">Participant Scoring:</label>
                <input
                  type="text"
                  className="form-control"
                  id="participant_scoring"
                  name="participant_scoring"
                  value={projectData.participant_scoring}
                  onChange={handleChange}
                  required
                />
                <div id="participantScoringHelp" className="form-text">Select how participants will be scored.</div>
              </div>

              {/* is_published Checkbox */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="is_published"
                  name="is_published"
                  checked={projectData.is_published} 
                  onChange={handleChange} 
                />
                <label className="form-check-label" htmlFor="is_published">
                  Publish this project
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">Save Project</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditProjectForm;
