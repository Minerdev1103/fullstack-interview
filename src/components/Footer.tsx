import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer-text">© 2025 Company Name. All rights reserved.</p>
      <div className="footer-links">
        <a href="/terms" className="footer-link">Terms</a>
        <a href="/privacy" className="footer-link">Privacy Policy</a>
        <a href="/contact" className="footer-link">Contact Us</a>
      </div>
    </div>
  );
};

export default Footer;
