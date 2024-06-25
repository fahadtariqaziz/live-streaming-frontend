import React from 'react';
import Teams from './Teams.js';
import Channels from './Channels';
import Leagues from './Leagues';
import Fixtures from './Fixture';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <section className="dashboard-section">
        <Teams />
      </section>
      <section className="dashboard-section">
        <Channels />
      </section>
      <section className="dashboard-section">
        <Leagues />
      </section>
      <section className="dashboard-section">
        <Fixtures />
      </section>
    </div>
  );
};

export default Dashboard;
