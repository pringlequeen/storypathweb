import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  
  useEffect(() => {
    // Add background image when in the homepage
    document.body.classList.add('homepage-body');

    // Remove background image when not in the homepage
    return () => {
      document.body.classList.remove('homepage-body');
    };
  }, []);

  return (
    <div className="container">
      <div className="row d-flex align-items-stretch">

        <div className="col-md-9">
          <div className="box border rounded p-4 bg-light shadow mt-4">
            <h1 className="text-center display-4 mb-4">WELCOME TO STORYPATH</h1>
            <p className="fs-5 text-center">Create engaging tours, hunts, and adventures!</p>
          </div>
        </div>


        <div className="col-md-3">
          <div className="box border rounded p-4 bg-light text-white mt-4 mb-4 d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-center display-7">Explore Our Categories</h2>
            <Link to="/projects" className="btn btn-primary mt-3">Browse Projects</Link>
          </div>
        </div>
      </div>


      <div className="row">

        <div className="col-md-9">
          <div className="row">
            <div className="col-md-4 d-flex justify-content-center mb-4">
              <div className="category-card">
                <img src="/images/home1.jpg" alt="Museum Tours" />
                <h3>Museum Tours</h3>
                <p>Discover a wide range of fascinating museum exhibits.</p>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center mb-4">
              <div className="category-card">
                <img src="/images/home2.jpeg" alt="Campus Tours" />
                <h3>Campus Tours</h3>
                <p>Explore university campuses and more.</p>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center mb-4">
              <div className="category-card">
                <img src="/images/home3.jpg" alt="Treasure Hunts" />
                <h3>Treasure Hunts</h3>
                <p>Engage in exciting treasure hunts and challenges.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="box border rounded p-4 bg-light text-center mt-4 mb-4 custom-height d-flex flex-column justify-content-center align-items-center">
            <p className="p-4 fs-5">Add locations and projects to create entertaining hunts and discoveries!</p>
            <Link to="/locations" className="btn btn-primary mt-3">Browse Locations</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
