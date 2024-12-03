// src/components/Sidebar.js
import React from 'react';

const patients = [
  { name: 'Emily Williams', gender: 'Female', age: 18 },
  { name: 'Ryan Johnson', gender: 'Male', age: 45 },
  // Add more patients here...
];

const Sidebar = ({ onSelectPatient }) => (
  <div className="sidebar">
    <h2>Patients</h2>
    <ul>
      {patients.map((patient, index) => (
        <li key={index} onClick={() => onSelectPatient(index)}>
          {patient.name} <span>({patient.gender}, {patient.age})</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
