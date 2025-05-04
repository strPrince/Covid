import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";
import EditComponent from "../components/EditComponent"; // Import the EditComponent

export default function HomePage() {
  const [covidData, setCovidData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [threshold, setThreshold] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/covid/coviddata");
        setCovidData(res.data);
        setFilteredData(res.data);
        setLoading(false);
      } catch (err) {
        setError(
          "Failed to load data. Please check if the server is running."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    const thresholdValue = parseInt(threshold);
    if (!thresholdValue) {
      setFilteredData(covidData);
      return;
    }

    const filtered = covidData.filter((record) => {
      return record.totalDeaths >= thresholdValue;
    });

    setFilteredData(filtered);
  };

  const handleClear = () => {
    setThreshold("");
    setFilteredData(covidData);
    setShowFilter(false);
  };

  



  return (
    <div className="container">
      <h1 className="title">COVID-19 Dashboard</h1>

      {showFilter && (
        <div className="filter-container">
          <div className="filter-header">
            <h2>Filter Records by Death Threshold</h2>
            <button
              onClick={() => setShowFilter(false)}
              className="close-button"
            >
              <X size={18} />
            </button>
          </div>
          <div className="filter-inputs">
            <input
              type="number"
              placeholder="Enter death threshold"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="input"
            />
            <button onClick={handleFilter} className="button filter-button">
              Filter
            </button>
          </div>
        </div>
      )}

      {!showFilter && (
        <div className="filter-toggle">
          <button
            onClick={() => setShowFilter(true)}
            className="button filter-button"
          >
            <Filter size={16} />
            Filter Records
          </button>
          <button onClick={handleClear} className="button clear-button">
            <X size={16} />
            Clear Filter
          </button>
        </div>
      )}

      {filteredData.length === 0 ? (
        <div className="no-records">
          <p>No records found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid">
          {filteredData.map((record, index) => (
            <Link to={`/state/${record.state}`} className="card-link">
            <div key={index} className="card">
              <div className="card-header">
                <h3>
                  
                    {record.state}
                 
                </h3>
                <div className="card-actions">
                
                </div>
              </div>
              <div className="card-body">
                <p>
                  <span>Cases:</span> {record.totalCases.toLocaleString()}
                </p>
                <p>
                  <span>Deaths:</span> {record.totalDeaths.toLocaleString()}
                </p>
              </div>
            </div>
             </Link>
          ))}
        </div>
      )}

      
    </div>
  );
}
