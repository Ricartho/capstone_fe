import React, { useState } from "react";
import "./KSUStudentPortal.css";

export default function KSUStudentPortal() {
  const [open, setOpen] = useState(false);

  return (
    <div className="laptop-container">
      {/* Header */}
      <header className="header">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/8/8a/Kennesaw_State_University_logo.svg"
          alt="KSU Logo"
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
  );
}