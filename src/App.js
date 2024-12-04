import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          marginRight: "20px",
        }}
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
    return (
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          margin: "20px auto",
          textAlign: "center",
          color: "#777",
        }}
      >
        Select a patient to view details
      </div>
    );
  }

  const {
    name,
    gender,
    date_of_birth,
    profile_picture,
    phone_number,
    emergency_contact,
    insurance_type,
  } = selectedPatient;

  return (
    <div
      style={{
        maxWidth: "600px",
        width: "100%",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "20px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src={profile_picture}
          alt={name}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            marginBottom: "10px",
          }}
        />
        <h2 style={{ color: "#333" }}>{name}</h2>
      </div>

      <div style={{ lineHeight: "1.8", fontSize: "14px", color: "#555" }}>
        {/* Date of Birth */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            marginLeft: "10px",
          }}
        >
          <img
            src="https://img.icons8.com/ios/50/000000/calendar.png"
            alt="Date of Birth"
            style={{ width: "20px", height: "20px", marginRight: "20px" }}
          />
          <p style={{ margin: 0 }}>
            <strong>Date of Birth:</strong>
            <br />
            {date_of_birth}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            marginLeft: "10px",
            alignItems: "center",
            marginBottom: "10px",

          }}
        >
          <img
            src="https://img.icons8.com/ios/50/000000/gender-neutral-user.png"
            alt="Gender"
            style={{ width: "20px", height: "20px", marginRight: "20px" }}
          />
          <p style={{ margin: 0 }}>
            <strong>Gender:</strong>
            <br />
            {gender}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: "10px",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <img
            src="https://img.icons8.com/ios/50/000000/phone.png"
            alt="Phone"
            style={{ width: "20px", height: "20px", marginRight: "20px" }}
          />
          <p style={{ margin: 0 }}>
            <strong>Phone:</strong>
            <br />
            {phone_number}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            marginLeft: "10px",
          }}
        >
          <img
            src="https://img.icons8.com/ios/50/000000/phone.png"
            alt="Emergency Contact"
            style={{ width: "20px", height: "20px", marginRight: "20px" }}
          />
          <p style={{ margin: 0 }}>
            <strong>Emergency Contact:</strong>
            <br />
            {emergency_contact}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            marginLeft: "10px",
          }}
        >
          <img
            src="https://w7.pngwing.com/pngs/369/414/png-transparent-logo-organization-brand-security-blue-angle-text-thumbnail.png" // Insurance icon
            alt="Insurance"
            style={{ width: "20px", height: "20px", marginRight: "20px" }}
          />
          <p style={{ margin: 0 }}>
            <strong>Insurance Provider:</strong>
            <br />
            {insurance_type}
          </p>
        </div>
      </div>

      <button
        style={{
          marginTop: "20px",
          backgroundColor: "#01F0D0",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "15px",
          width: "80%",
          cursor: "pointer",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Show All Information
      </button>
    </div>
  );
};

const ChartSection = ({ selectedPatient, diagnosisHistory }) => {
  const systolicData = diagnosisHistory.map(
    (entry) => entry.blood_pressure.systolic.value
  );
  const diastolicData = diagnosisHistory.map(
    (entry) => entry.blood_pressure.diastolic.value
  );
  const labels = diagnosisHistory.map(
    (entry) => `${entry.month} ${entry.year}`
  );

  const avgSystolic = systolicData.reduce((a, b) => a + b, 0) / systolicData.length;
  const avgDiastolic = diastolicData.reduce((a, b) => a + b, 0) / diastolicData.length;

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
        width: "97%",
        backgroundColor: "#F4F0FE",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        margin: "10px auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ textAlign: "left" }}>Diagnosis History</h1>
      <h3 style={{ marginBottom: "20px", color: "#333" }}>
        Blood Pressure Trends
      </h3>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ position: "relative", width: "70%", height: "200px" }}>
          <Line data={data} options={options} />
        </div>

        <div>
          <h4 style={{ color: "#333" }}>Average Blood Pressure</h4>
          <div >
            <strong>Systolic:</strong>
            <br></br>{avgSystolic.toFixed(2)} mmHg
          </div>
          <div>
            <strong>Diastolic:</strong>
            <br></br>{avgDiastolic.toFixed(2)} mmHg
          </div>
        </div>

      </div>
      {selectedPatient && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <VitalCard
            title="Respiratory Rate"
            unit="bpm"
            icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgNVrwo1XjgZecHEEU67vZvCOir3Tbxe5iCw&s"
            patient={selectedPatient}
            backgroundColor="#E0F3FA"
          />
          <VitalCard
            title="Temperature"
            unit="°F"
            icon="https://img.freepik.com/premium-vector/thermometer-icon-logo-vector-design-template_827767-692.jpg"
            patient={selectedPatient}
            backgroundColor="#FFE6E9"
          />
          <VitalCard
            title="Heart Rate"
            unit="bpm"
            icon="https://t3.ftcdn.net/jpg/03/00/65/82/360_F_300658258_ZONuYpgnH0tSlPHB9lxES1Ai7Ij0ZNSz.jpg"
            patient={selectedPatient}
            backgroundColor="#FFE6F1"
          />
        </div>
      )}
    </div>
  );
}

const DiagnosticList = ({ diagnosisHistory }) => {
  const data = diagnosisHistory?.diagnostic_list || [];

  return (
    <div
      style={{
        width: "97%",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ marginBottom: "20px", color: "#333" }}>
        Problems / Diagnosis
      </h3>
      {data.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#F6F7F8" }}>
              <th
                style={{
                  padding: "20px",
                  borderBottom: "2px solid #e0e0e0",
                  textAlign: "left",
                  fontSize: "14px",
                  color: "#555",
                  borderTopLeftRadius: "50px",
                  borderBottomLeftRadius: "50px",
                }}
              >
                Diagnosis
              </th>
              <th
                style={{
                  padding: "10px",
                  borderBottom: "2px solid #e0e0e0",
                  textAlign: "left",
                  fontSize: "14px",
                  color: "#555",
                }}
              >
                Description
              </th>
              <th
                style={{
                  padding: "10px",
                  borderBottom: "2px solid #e0e0e0",
                  textAlign: "left",
                  fontSize: "14px",
                  color: "#555",
                  borderTopRightRadius: "50px",
                  borderBottomRightRadius: "50px",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((diagnosis, index) => (
              <tr key={index}>
                <td
                  style={{
                    padding: "20px",
                    borderBottom: "1px solid #e0e0e0",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  {diagnosis.name}
                </td>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #e0e0e0",
                    fontSize: "14px",
                    color: "#333",
                  }}
                >
                  {diagnosis.description}
                </td>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #e0e0e0",
                    fontSize: "14px",
                    color: diagnosis.status === "Active" ? "green" : "#777",
                  }}
                >
                  {diagnosis.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p
          style={{
            textAlign: "center",
            color: "#777",
            fontSize: "14px",
            marginTop: "10px",
          }}
        >
          No diagnoses available.
        </p>
      )}
    </div>
  );
};

const LabReportsList = ({ selectedPatient }) => {
  const data = selectedPatient?.lab_results;

  return (
    <div
      style={{
        maxWidth: "600px",
        width: "100%",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "20px auto",
      }}
    >
      <h3 style={{ textAlign: "left", marginBottom: "20px", color: "#333" }}>
        Lab Results
      </h3>
      {data && data.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {data.map((report, index) => (
              <tr key={index} style={{ textAlign: "left" }}>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #e0e0e0",
                    fontSize: "14px",
                    color: "#555",
                  }}
                >
                  {report}
                </td>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #e0e0e0",
                    textAlign: "center",
                  }}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFU_-K_ZQC_GZLgdMljcAnbU4i7e3-OpBdlA&s"
                    alt="View Report"
                    style={{
                      width: "24px",
                      height: "24px",
                      cursor: "pointer",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", color: "#777", fontSize: "14px" }}>
          No lab reports available.
        </p>
      )}
    </div>
  );
};

const VitalCard = ({ title, unit, icon, patient, backgroundColor }) => {
  const data = patient?.diagnosis_history || [];

  const totalRecords = data.length;

  const averages = {
    respiratory_rate:
      totalRecords > 0
        ? data.reduce((sum, record) => sum + record.respiratory_rate.value, 0) /
        totalRecords
        : 0,
    temperature:
      totalRecords > 0
        ? data.reduce((sum, record) => sum + record.temperature.value, 0) /
        totalRecords
        : 0,
    heart_rate:
      totalRecords > 0
        ? data.reduce((sum, record) => sum + record.heart_rate.value, 0) /
        totalRecords
        : 0,
  };

  let displayValue;
  switch (title.toLowerCase()) {
    case "respiratory rate":
      displayValue = `${averages.respiratory_rate.toFixed(2)} ${unit}`;
      break;
    case "temperature":
      displayValue = `${averages.temperature.toFixed(2)} ${unit}`;
      break;
    case "heart rate":
      displayValue = `${averages.heart_rate.toFixed(2)} ${unit}`;
      break;
    default:
      displayValue = "N/A";
  }

  return (
    <div
      style={{
        maxWidth: "300px",
        width: "100%",
        backgroundColor: backgroundColor,
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        margin: "10px",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          overflow: "hidden",
          marginBottom: "15px",
          backgroundColor: "white",
        }}
      >
        <img
          src={icon}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <h3
        style={{
          fontSize: "18px",
          color: "#333",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "24px",
          color: "#007BFF",
          margin: "10px 0",
          fontWeight: "bold",
        }}
      >
        {displayValue}
      </p>
    </div>
  );
};

const Navbar = () => (
  <nav
    style={{
      backgroundColor: "white",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "50px",
      color: "black",
      padding: "10px 30px",
      display: "flex",
      alignItems: "center",
      margin: "10px",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", marginRight: "auto" }}>
      <img
        src="1.png"
        alt="Logo"
        style={{ width: "200px", height: "50px", marginRight: "10px" }}
      />
    </div>

    <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
      <a
        href="#Overview"
        style={{
          color: "black",
          margin: "0 20px",
          textDecoration: "none",
          fontSize: "16px",
          padding: "10px",
        }}
      >
        <img src="9.png"></img> Overview
      </a>
      <a
        href="#Patients"
        style={{
          color: "black",
          margin: "0 20px",
          textDecoration: "none",
          fontSize: "16px",
          backgroundColor: "#01F0D0",
          padding: "10px",
          borderRadius: "50px",
        }}
      >
        <img src="5.png"></img> Patients
      </a>

      <a
        href="#Message"
        style={{
          color: "black",
          margin: "0 20px",
          padding: "10px",
          textDecoration: "none",
          fontSize: "16px",
        }}
      >
        <img src="7.png"></img> Message
      </a>
      <a
        href="#Transactions"
        style={{
          color: "black",
          margin: "0 20px",
          padding: "10px",
          textDecoration: "none",
          fontSize: "16px",
        }}
      >
        <img src="8.png"></img> Transactions
      </a>
      {/* <a
  href="#about"
  style={{
    color: "black",
    margin: "0 20px",
    textDecoration: "none",
    fontSize: "16px",
    display: "inline-flex", // Ensure text and image are inline
    alignItems: "center",   // Align items vertically
  }}
>
  <img 
    src="6.png" 
    alt="Schedule Icon"
    style={{
      width: "30px", // Consistent size for all icons
      marginRight: "5px", // Spacing between the icon and text
    }}
  />
  Schedule
</a> */}
    </div>

    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src="2.png"
        alt="Dr. Jose Simmons"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          marginRight: "10px",
        }}
      />
      <div style={{ marginRight: "10px" }}>
        <div style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>
          Dr. Jose Simmons
        </div>
        <div style={{ fontSize: "14px", color: "gray" }}>
          General Practitioner
        </div>
      </div>
      |
      <img
        src="3.png"
        alt="Dr. Jose Simmons"
        style={{
          margin: "0 10px 0 10px",
        }}
      />
      <img
        src="4.png"
        style={{
          marginRight: "10px",
        }}
      />
    </div>
  </nav>
);

const App = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const getPatients = async () => {
    const response = await fetch(
      "https://fedskillstest.coalitiontechnologies.workers.dev",
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa("coalition:skills-test"),
        },
      }
    );
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
    <>
      <Navbar />
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            width: "300px",
            borderRadius: "16px",
            padding: "20px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            border: "1px solid #ccc",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: 0 }}>Patients</h3>
            <img
              src="https://img.icons8.com/ios/50/000000/search.png"
              alt="Search Icon"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          </div>

          <div
            style={{
              maxHeight: "1200px",
              overflowY: "auto",
            }}
          >
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.name}
                patient={patient}
                onClick={setSelectedPatient}
              />
            ))}
          </div>
        </div>

        <div style={{ width: "50%", padding: "20px" }}>
          {selectedPatient && (
            <ChartSection
              diagnosisHistory={selectedPatient.diagnosis_history}
              selectedPatient={selectedPatient}
            />
          )}
          {selectedPatient && (
            <DiagnosticList diagnosisHistory={selectedPatient} />
          )}
        </div>

        <div style={{ width: "25%", padding: "20px" }}>
          <PatientDetails selectedPatient={selectedPatient} />
          {selectedPatient && (
            <LabReportsList selectedPatient={selectedPatient} />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
