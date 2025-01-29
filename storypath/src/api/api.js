// Base URL for the Storypath RESTful API
const API_BASE_URL = 'https://0b5ff8b0.uqcloud.net/api';

// JWT token for authorization, replace with your actual token
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiczQ2NDQ0MTYifQ.D9CrUKP4DlyJ774jrMai6Vbox6hZ0_nzioUaOwJIhXQ';

// Your UQ student username
const USERNAME = 's4644416';

/**
 * A generic function to handle API requests (GET, POST, PATCH, etc.).
 * 
 * @param {string} endpoint - The API endpoint to hit.
 * @param {string} [method='GET'] - The HTTP method (GET, POST, PATCH, etc.).
 * @param {object} [body=null] - The request body for POST/PATCH requests.
 * @returns {promise} - A promise resolving to the API response.
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JWT_TOKEN}`, // Ensure correct format
    },
  };

  // Add body if provided for POST or PATCH methods
  if (body) {
    options.body = JSON.stringify({ username: USERNAME, ...body });
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorText = await response.text(); // Get error response for debugging
      console.error('API Error:', errorText); // Log API error
      throw new Error(`Failed to ${method} ${endpoint}: ${errorText}`);
    }
    return response;
  } catch (error) {
    console.error('Network Error:', error.message);
    throw new Error('Network request failed');
  }
}

// Get all projects
export async function getProjects() {
  return apiRequest('/project');
}

// Get project by ID
export async function getProjectById(id) {
  return apiRequest(`/project?id=eq.${id}`);
}

// Create a new project
export async function createProject(project) {
  return apiRequest('/project', 'POST', project);
}

// Update a project by ID (use PATCH for partial updates)
export async function updateProject(id, project) {
  return apiRequest(`/project?id=eq.${id}`, 'PATCH', project);
}

// Delete a project by ID
export async function deleteProject(id) {
  return apiRequest(`/project?id=eq.${id}`, 'DELETE');
}

// Get all locations
export async function getLocations() {
  return apiRequest('/location'); // Ensure correct endpoint
}

// Get location by ID
export async function getLocationById(id) {
  return apiRequest(`/location?id=eq.${id}`);
}

// Create a new location
export async function createLocation(location) {
  // Ensure the body matches the schema: location_name, location_trigger, etc.
  return apiRequest('/location', 'POST', location);
}

// Update a location by ID (use PATCH for partial updates)
export async function updateLocation(id, location) {
  // Ensure the body matches the schema: location_name, location_trigger, etc.
  return apiRequest(`/location?id=eq.${id}`, 'PATCH', location);
}

// Delete a location by ID
export async function deleteLocation(id) {
  return apiRequest(`/location?id=eq.${id}`, 'DELETE');
}
