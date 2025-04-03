import React from 'react';
import './Header.css'; // ถ้ามีไฟล์ CSS แยก

const Header = () => {
  return (
    <div className="header">
      <img src="logo.png" alt="Logo" className="logo" />
      <h1 className="site-name">Ticket2Attraction</h1>
    </div>
  );
};

export default Header;
