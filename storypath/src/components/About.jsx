import React from 'react';

function About() {
  return (
    <div>
      {/* About Us section explaining the purpose of StoryPath */}
      <h1>About Us</h1>

      <div className="alert alert-light" role="alert">
        <h2 className="alert-heading">We are StoryPath!</h2>
        <p>
        StoryPath is a location experience platform designed to allow users to 
        create and explore virtual museum exhibits, location-based tours, 
        and treasure hunts with clues. The users can create multiple projects and add locations,
        setup flexible scoring options, author and test their location-based experiences.
        </p>
        <hr />
        <p className="mb-0">
          We are dedicated to provide the best experience in authoring content and activites.
        </p>
      </div>
    </div>
  );
}

export default About;

