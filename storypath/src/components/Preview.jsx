import React, { useState, useEffect, useRef } from 'react';
import { getProjects, getLocations } from '../api/api'; 
import MyMap from './Map'; 

const Preview = () => {
  const [project, setProject] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedOption, setSelectedOption] = useState('homescreen'); 
  const [locationsVisited, setLocationsVisited] = useState([]);
  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0); 
  const selectRef = useRef(null); 

  // Fetch project and location data on component mount
  useEffect(() => {
    const fetchProjectAndLocations = async () => {
      try {
        const fetchedProjects = await getProjects();
        const projectData = await fetchedProjects.json();
        setProject(projectData[0]);

        const fetchedLocations = await getLocations();
        const locationsData = await fetchedLocations.json();
        setLocations(locationsData);

        // Calculate the total possible points from all locations
        const calculatedTotalPoints = locationsData.reduce((sum, location) => sum + location.score_points, 0);
        setTotalPoints(calculatedTotalPoints);
      } catch (error) {
        console.error("Error fetching project or locations data", error);
      }
    };

    fetchProjectAndLocations();
  }, []);

  // Convert HTML tags into plain text
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  // Handle dropdown selection change
  const handleChange = (e) => {
    const locationName = e.target.value;
    setSelectedOption(locationName);

    // Update visited locations and points if the location hasn't been visited
    if (!locationsVisited.includes(locationName) && locationName !== 'homescreen') {
      const selectedLocation = locations.find(loc => loc.location_name === locationName);
      
      setLocationsVisited([...locationsVisited, locationName]);

      if (selectedLocation && project?.participant_scoring === 'points_per_visit') {
        setPoints(prevPoints => prevPoints + selectedLocation.score_points);
      }
    }
  };

  // Calculate total points based on visited locations
  const calculateTotalPoints = () => {
    return locationsVisited.reduce((sum, locationName) => {
      const location = locations.find(loc => loc.location_name === locationName);
      return sum + (location ? location.score_points : 0);
    }, 0);
  };

  // Display the details for the selected location
  const renderLocationDetails = (location) => {
    if (location) {
      return (
        <div className="section">
          <h1 className="heading">Location Preview</h1>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{location.location_name}</h2>
              {location.clue && <h3 className="card-subtitle">Clue: {location.clue}</h3>}
              {location.location_content && <h3 className="card-subtitle">Content: {stripHtmlTags(location.location_content)}</h3>}
              <div className="points-container">
                <div className="points-box">
                  Points for this location: {location.score_points}
                </div>
                <div className="points-box">
                  Locations visited {locationsVisited.length}/{locations.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Show the homescreen view along with the project details
  const renderHomescreen = () => {
    if (project) {
      const calculatedPoints = calculateTotalPoints();

      return (
        <div className="section">
          <h1 className="heading">Project Preview</h1>
          <p className="project-description">Change Locations to Test Scoring</p>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{project.title}</h2>
              <h3 className="card-subtitle">Description: {project.description}</h3>
              <h3 className="card-subtitle">Instructions: {project.instructions}</h3>
              <h3 className="card-subtitle">Initial Clue: {project.initial_clue}</h3>

              {project.homescreen_display === 'Display all locations' && (
                <div>
                  <h3 className="sub-heading">All Locations:</h3>
                  <ul className="location-list">
                    {locations.map((location) => (
                      <li key={location.location_name}>{location.location_name}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="points-container">
                <div className="points-box">
                  Points received: {calculatedPoints}/{totalPoints}
                </div>
                <div className="points-box">
                  Locations visited {locationsVisited.length}/{locations.length}
                </div>
              </div>

              <div className="map-container">
                <MyMap style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div className="no-data">No project data available</div>;
  };

  return (
    <div className="preview-page"> 
      <select 
        onChange={handleChange} 
        value={selectedOption} 
        className="select-dropdown"
        ref={selectRef}>
        <option value="homescreen">Homescreen</option>
        {locations.map((location) => (
          <option key={location.location_name} value={location.location_name}>{location.location_name}</option>
        ))}
      </select>

      {selectedOption === 'homescreen' ? (
        renderHomescreen() 
      ) : (
        renderLocationDetails(locations.find(location => location.location_name === selectedOption)) // Render selected location details
      )}
    </div>
  );
};

export default Preview;
