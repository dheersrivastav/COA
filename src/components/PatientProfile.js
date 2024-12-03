// src/components/PatientProfile.js
import React from 'react';

const PatientProfile = ({ patient }) => (
  <div className="profile">
    <img src={patient.photo || 'placeholder.jpg'} alt="Profile" />
    <h2>{patient.name}</h2>
    <p>Date of Birth: {patient.dob}</p>
    <p>Gender: {patient.gender}</p>
    <p>Contact: {patient.contact}</p>
    <p>Emergency: {patient.emergencyContact}</p>
    <p>Insurance: {patient.insurance}</p>
  </div>
);

export default PatientProfile;
