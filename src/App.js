import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./App.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PatientCard = ({ patient, onClick }) => {
  return (
    <div
      onClick={() => onClick(patient)}
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        margin: "10px 0",
        cursor: "pointer",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        height: "50px",
        overflow: "hidden",
      }}
    >
      <img
        src={patient.profile_picture}
        alt={patient.name}
        style={{ width: "60px", height: "60px", borderRadius: "50%", marginRight: "20px" }}
      />
      <div>
        <h3 style={{ fontSize: "16px", margin: 0 }}>{patient.name}</h3>
        <p style={{ margin: 0 }}>Gender: {patient.gender}</p>
        <p style={{ margin: 0 }}>Age: {patient.age}</p>
      </div>
    </div>
  );
};

const PatientDetails = ({ selectedPatient }) => {
  if (!selectedPatient) {
    return <div>Select a patient to view details</div>;
  }

  const {
    name,
    gender,
    age,
    date_of_birth,
    profile_picture,
    phone_number,
    emergency_contact,
    insurance_type,
    diagnosis_history,
  } = selectedPatient;

  return (
    <div style={{ marginLeft: "20px", flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
        <img
          src={profile_picture}
          alt={name}
          style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "10px" }}
        />
        <h2>{name}</h2>
      </div>

      <div>
        <p>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYHv-27s7X2S36vetk9tKap9o2nknn0gVjDg&s" // Replace with the appropriate icon
            alt="Date of Birth"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          <strong>Date of Birth:</strong> {date_of_birth}
        </p>
        <p>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF3l04g-v9KIIIdbHBuvxrVpjEBkgK5LCSmA&s" // Replace with the appropriate icon
            alt="Gender"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          <strong>Gender:</strong> {gender}
        </p>
        <p>
          <img
            src="https://i.pinimg.com/474x/88/a9/d0/88a9d0c252977e827f7f3862e8de6714.jpg" // Replace with the appropriate icon
            alt="Phone"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          Phone: {phone_number}
        </p>
        <p>
          <img
            src="https://i.pinimg.com/474x/88/a9/d0/88a9d0c252977e827f7f3862e8de6714.jpg" // Replace with the appropriate icon
            alt="Emergency Contact"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          Emergency Contact: {emergency_contact}
        </p>
        <p>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHvDrBZtCGctOuSvq_F52J6bsBFBSEZmuAWg&s" // Replace with the appropriate icon
            alt="Insurance Provider"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          Insurance Provider: {insurance_type}
        </p>
      </div>

      <button
        style={{
          marginTop: "20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "15px",
          cursor: "pointer",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
      >
        Show All Information
      </button>
    </div>

  );
};

const ChartSection = ({ diagnosisHistory }) => {
  const systolicData = diagnosisHistory.map(entry => entry.blood_pressure.systolic.value);
  const diastolicData = diagnosisHistory.map(entry => entry.blood_pressure.diastolic.value);
  const labels = diagnosisHistory.map(entry => `${entry.month} ${entry.year}`);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Systolic",
        data: systolicData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "Diastolic",
        data: diastolicData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Blood Pressure",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month/Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Blood Pressure (mmHg)",
        },
      },
    },
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderRadius: "8px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

const DiagnosticList = ({ diagnosisHistory }) => {
  const data = diagnosisHistory.diagnostic_list;
  return (
    <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <h3>Problems/Diagnosis</h3>
      {data && data.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Diagnosis</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Description</th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((diagnosis, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{diagnosis.name}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{diagnosis.description}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{diagnosis.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No diagnoses available.</p>
      )}
    </div>
  );
};


const LabReportsList = ({ selectedPatient }) => {
  const data = selectedPatient.lab_results;
  return (
    <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <h3>Lab Reports</h3>
      {data && data.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {data.map((report, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{report}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}><img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFU_-K_ZQC_GZLgdMljcAnbU4i7e3-OpBdlA&s"
                  alt="Phone"
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                /></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No diagnoses available.</p>
      )}
    </div>
  );
};

const VitalCard = ({ title, unit, icon, patient }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "20px",
        textAlign: "center",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        flex: 1,
      }}
    >
      <img src={icon} alt={title} style={{ width: "40px", height: "40px", marginBottom: "10px" }} />
      <h3>{title}</h3>
      <p style={{ fontSize: "24px", margin: "10px 0" }}>
        {unit}
      </p>
    </div>
  );
};

const App = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const getPatients = async () => {
    const response = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa("coalition:skills-test"),
      },
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const patients = await getPatients();
      setPatients(patients);
      setFilteredPatients(patients);
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "250px", borderRight: "1px solid #ccc", padding: "20px", overflowY: "auto" }}>
        <input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        {filteredPatients.map((patient) => (
          <PatientCard key={patient.name} patient={patient} onClick={setSelectedPatient} />
        ))}
      </div>

      <div style={{ width: "50%", padding: "20px" }}>
        <h1>Diagnosis History</h1>
        {selectedPatient && <ChartSection diagnosisHistory={selectedPatient.diagnosis_history} />}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          {selectedPatient && (
            <>
              {selectedPatient && <VitalCard title="Respiratory Rate" unit="bpm" icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgNVrwo1XjgZecHEEU67vZvCOir3Tbxe5iCw&s" patient={patients} />}
              {selectedPatient && <VitalCard title="Temperature" unit="°F" icon="https://img.freepik.com/premium-vector/thermometer-icon-logo-vector-design-template_827767-692.jpg" patient={selectedPatient} />}
              {selectedPatient && <VitalCard title="Heart Rate" unit="bpm" icon="https://t3.ftcdn.net/jpg/03/00/65/82/360_F_300658258_ZONuYpgnH0tSlPHB9lxES1Ai7Ij0ZNSz.jpg" patient={selectedPatient} />}
            </>
          )}
        </div>
        {selectedPatient && <DiagnosticList diagnosisHistory={selectedPatient} />}
      </div>

      <div style={{ width: "25%", padding: "20px" }}>
        <PatientDetails selectedPatient={selectedPatient} />
        {selectedPatient && <LabReportsList selectedPatient={selectedPatient} />}
      </div>

    </div>
  );
};

export default App;
