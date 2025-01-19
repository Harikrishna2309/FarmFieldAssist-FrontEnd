import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/LabourInterestModal.css";
import apiConfig from "../config/apiConfig";


const LabourInterestModal = ({ workId, onClose }) => {
  const [labours, setLabours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLabourInterest = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `${apiConfig.apiHost}/interests?workId=${workId}`,
        {
            headers: { Authorization: `Bearer ${token}` },
          }
      );
      setLabours(response.data.data || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch interested labours.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabourInterest();
  }, [workId]);

  const handleUpdateInterest = async (interestId, status) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(
        `${apiConfig.apiHost}/editinterest?id=${interestId}&status=${status}`,
        { headers }
      );
      alert(`Interest ${status} successfully.`);
      fetchLabourInterest(); // Refresh data after updating interest
    } catch (err) {
      alert("Failed to update interest.");
    }
  };

  return (
    <div className="labour-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>Interested Labours</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : labours.length > 0 ? (
          <ul className="labour-list">
            {labours.map((interest) => (
              <li key={interest.id} className="labour-item">
                <img src={interest.labour.image} alt="Labour" className="labour-image" />
                <div>
                  <h4>{interest.labour.name}</h4>
                  <p>Email: {interest.labour.email}</p>
                  <p>Phone: {interest.labour.phone}</p>
                  <p>Cost: {interest.labour.cost}</p>
                  <button
                    className="accept-button"
                    onClick={() => handleUpdateInterest(interest.id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => handleUpdateInterest(interest.id, "declined")}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No labours have expressed interest yet.</p>
        )}
      </div>
    </div>
  );
};

export default LabourInterestModal;
