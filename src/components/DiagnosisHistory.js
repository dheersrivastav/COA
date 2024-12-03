// src/components/DiagnosisHistory.js
import React from 'react';

const DiagnosisHistory = ({ history }) => (
  <div className="diagnosis">
    <h2>Diagnosis History</h2>
    {/* Example Graph Area */}
    <div className="chart">
      {/* Use a charting library like Chart.js or Recharts */}
      <p>Graph will be here</p>
    </div>
    {/* Vitals */}
    <div className="vitals">
      <div>Respiratory Rate: {history.respiratoryRate}</div>
      <div>Temperature: {history.temperature}</div>
      <div>Heart Rate: {history.heartRate}</div>
    </div>
  </div>
);

export default DiagnosisHistory;
