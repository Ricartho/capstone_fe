import React, { useState } from "react";
import "./KSUStudentPortal.css";

export default function KSUStudentPortal() {
  const [open, setOpen] = useState(false);

  return (
    <div>

      
      <div className="top-navbar">
  <div className="btn-style">DISCOVER</div>
  <div className="btn-style">YOUR</div>
  <div className="btn-style">PASSION</div>
  <div className="btn-style">AND</div>
  <div className="btn-style">PURPOSE</div>
</div>


      {/* Background Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">STUDENT DASHBOARD</h1>
      </div>


      

      <div className="laptop-container">
        {/* Header */}
        <header className="header">
          <img
src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQslP-43IzwPKp8VMowyF9lem-rV8tdCxTS8Q&s"            alt="KSU Logo"
            className="logo"
          />
          <div className="user-icon">👤</div>
        </header>

        {/* Main Content */}
        <main className="content">
          <h2 className="section-title">TODAY'S DASHBOARD</h2>

          {/* Container for all cards */}
          <div className="card-row">
            <button className="card">
              <div className="icon">💻</div>
              <h3>10</h3>
              <p>Upcoming Events</p>
            </button>

            <button className="card">
              <div className="icon">📚</div>
              <h3>3</h3>
              <p>Current Courses</p>
            </button>

            <button className="card">
              <div className="icon">🎉</div>
              <h3>5</h3>
              <p>Events Attended</p>
            </button>

            <button className="card">
              <div className="icon">🏆</div>
              <h3>2</h3>
              <p>Milestones</p>
            </button>
          </div>

          {/* Banner */}
          <div className="path-banner">PATH TO FLEDGLINGS!!</div>

          {/* Accordion */}
          <div className="accordion">
            <button className="accordion-header" onClick={() => setOpen(!open)}>
              Degree Progress
              <span className="arrow">{open ? "▲" : "▼"}</span>
            </button>

            {open && (
              <div className="accordion-content">
                <button>GPA</button>
                <button>Foundation Courses</button>
                <button>Major Courses</button>
                <button>Registration Checklist</button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
