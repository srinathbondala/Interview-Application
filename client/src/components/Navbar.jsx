import React from 'react';

function Navbar() {
  const handleAddRoleClick = () => {
    console.log("Navigating to Add Role");
  };

  return (
    <nav className="navbar py-3 bg-primary navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div className="container-fluid">
      <a className="navbar-brand " href="/">INTERVIEW APPLICATION</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/login">LOGIN</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signup">SIGN UP</a>
            </li>
        </ul>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;
