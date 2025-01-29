import React from 'react';

function Contact() {
  // Contact information and links to social media profiles
  return (
    <div>
      <h1>Contact Us</h1>
      <div className="alert alert-primary" role="alert">
        Follow us on <a href="#" className="alert-link">Facebook</a> for more details on our company and offerings.
      </div>
      <div className="alert alert-warning" role="alert">
        Follow us on <a href="#" className="alert-link">Instagram</a> for more details on our company and offerings.
      </div>
      <div className="alert alert-light" role="alert">
        Follow us on <a href="#" className="alert-link">LinkedIn</a> for more details on our company and offerings.
      </div>
      <div className="alert alert-danger" role="alert">
        Follow us on <a href="#" className="alert-link">Twitter</a> for more details on our company and offerings.
      </div>
    </div>
  );
}

export default Contact;

