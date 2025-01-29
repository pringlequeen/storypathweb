import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLocationById, createLocation, updateLocation, getProjects } from '../api/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const AddEditLocationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [locationData, setLocationData] = useState({
    project_id: '',
    location_name: '',
    location_trigger: '',
    location_position: '',
    score_points: '',
    clue: '',
    location_content: '',
  });

  // Fetch projects and location data when editing
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        const fetchedProjects = await response.json();
        setProjects(Array.isArray(fetchedProjects) ? fetchedProjects : []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    // Fetch location data by ID if editing
    const fetchLocation = async () => {
      if (id) {
        try {
          const location = await getLocationById(id);
          setLocationData(location);
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      }
    };

    fetchProjects();
    fetchLocation();
  }, [id]);

  // Handle changes in input fields and update location data state
  const handleChange = (e) => {
    setLocationData({
      ...locationData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle changes in the WYSIWYG Quill editor and update location content state
  const handleQuillChange = (value) => {
    setLocationData({
      ...locationData,
      location_content: value,
    });
  };

  // Handle form submission for creating or updating location
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateLocation(id, locationData);
      } else {
        await createLocation(locationData);
      }
      navigate('/locations');
    } catch (error) {
      console.error("Error saving location:", error);
      alert('Failed to save location.');
    }
  };

  // Manage custom body class for styling
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
            <h2 className="mb-4 text-center">{id ? 'Edit' : 'Add'} Location</h2>
            <form onSubmit={handleSubmit}>

              {/* Project Selection */}
              <div className="mb-3">
                <label htmlFor="project_id" className="form-label">Project:</label>
                <select
                  className="form-control"
                  id="project_id"
                  name="project_id"
                  value={locationData.project_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
                <div id="projectHelp" className="form-text">Link this location to a project</div>
              </div>

              {/* Location Name */}
              <div className="mb-3">
                <label htmlFor="location_name" className="form-label">Location Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="location_name"
                  name="location_name"
                  value={locationData.location_name}
                  onChange={handleChange}
                  required
                />
                <div id="locationHelp" className="form-text">The name of this location.</div>
              </div>

              {/* Location Trigger */}
              <div className="mb-3">
                <label htmlFor="location_trigger" className="form-label">Location Trigger:</label>
                <select
                  className="form-control"
                  id="location_trigger"
                  name="location_trigger"
                  value={locationData.location_trigger}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Trigger Type</option>
                  <option value="Location Entry">Location Entry</option>
                  <option value="QR Code Scan">QR Code Scan</option>
                  <option value="Both">Both Location Entry and QR Code Scan</option>
                </select>
                <div id="triggerHelp" className="form-text">Select how this location will be triggered.</div>
              </div>

              {/* Location Position */}
              <div className="mb-3">
                <label htmlFor="location_position" className="form-label">Location Position (Latitude, Longitude):</label>
                <input
                  type="text"
                  className="form-control"
                  id="location_position"
                  name="location_position"
                  value={locationData.location_position}
                  onChange={handleChange}
                  placeholder="(27.4975, 153.013276)" // Example format
                  required
                />
                <div id="latitudeHelp" className="form-text">Enter the latitude and longitude for this location.</div>
              </div>

              {/* Score Points */}
              <div className="mb-3">
                <label htmlFor="score_points" className="form-label">Score Points:</label>
                <input
                  type="number"
                  className="form-control"
                  id="score_points"
                  name="score_points"
                  value={locationData.score_points}
                  onChange={handleChange}
                  required
                />
                <div id="scoreHelp" className="form-text">Specify the number of points participants earn by reaching this location.</div>
              </div>

              {/* Location Clue */}
              <div className="mb-3">
                <label htmlFor="clue" className="form-label">Clue (Optional):</label>
                <textarea
                  className="form-control"
                  id="clue"
                  name="clue"
                  value={locationData.clue}
                  onChange={handleChange}
                />
                <div id="clueHelp" className="form-text">Enter the clue that leads to the next location.</div>
              </div>

              {/* Location Content */}
              <div className="mb-3">
                <label htmlFor="location_content" className="form-label">Location Content:</label>
                <ReactQuill 
                  value={locationData.location_content} 
                  onChange={handleQuillChange} 
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, false] }],
                      ['bold', 'italic', 'underline'],
                      ['link', 'image'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['clean']
                    ]
                  }} 
                />
                <div id="contentHelp" className="form-text">Provide additional content that will be displayed when participants reach this location.</div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">Save Location</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditLocationForm;
