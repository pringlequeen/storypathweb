import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProjectList from './components/ProjectList';
import AddEditProjectForm from './components/AddEditProject';
import LocationsList from './components/LocationList';
import Contact from './components/Contact';
import About from './components/About';
import Preview from './components/Preview';
import AddEditLocationForm from './components/AddEditLocations';
import ProjectDetails from './components/ProjectDetails';
import LocationDetails from './components/LocationDetails';


function App() {
  // Navigation links for the header and paths
  const navLinks = [
    { path: '/', text: 'Home' },
    { path: '/projects', text: 'Projects' },
    { path: '/locations', text: 'Locations' },
    { path: '/about', text: 'About' },
    { path: '/contact', text: 'Contact' },
  ];

  return (
    // Main Router that handles navigation across the website 
    <Router>
      <div>
        <Header brandText="StoryPath" navLinks={navLinks} />
        
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/locations" element={<><LocationsList /></>} /> 
            <Route path="/add-projects" element={<AddEditProjectForm />} /> 
            <Route path="/add-locations" element={<AddEditLocationForm />} /> 
            <Route path="/preview" element={<Preview />} />
            <Route path="/post/:id" element={<ProjectDetails />} />
            <Route path="/edit/:id" element={<AddEditProjectForm />} />
            <Route path="/locations/:id" element={<LocationDetails />} /> 
            <Route path="/edit-location/:id" element={<AddEditLocationForm />} /> 
          </Routes>
        </div>

        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
