import React, { useState } from 'react';
import axios from 'axios';

export default function HighCaseAndDeaths() {
  const [caseTh, setcaseTh] = useState('');
  const [deathTh, setdeathTh] = useState(''); // for death threshold
  const [filteredStates, setFilteredStates] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFilter = async () => {
    if (!caseTh || !deathTh || isNaN(caseTh) || isNaN(deathTh)) {
      setError('Please enter valid numbers for both thresholds.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get('http://localhost:5000/api/covid/high-cases-deaths', {
        params: {
          casesThreshold: caseTh, // Corrected parameter name
          deathsThreshold: deathTh, // Corrected parameter name
        },
      });
      setFilteredStates(response.data);
    } catch (error) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>States with High Cases & Deaths</h2>

      <div style={styles.inputContainer}>
        <input
          type="number"
          placeholder="Enter cases threshold"
          value={caseTh}
          onChange={(e) => setcaseTh(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Enter deaths threshold"
          value={deathTh}
          onChange={(e) => setdeathTh(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleFilter} style={styles.button}>Filter</button>
      </div>

      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.cardContainer}>
        {filteredStates.map((state, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.cardTitle}>{state.state}</h3>
            <p><strong>Total Cases:</strong> {state.totalCases}</p>
            <p><strong>Total Deaths:</strong> {state.totalDeaths}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#546e7a',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#e53935',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    marginBottom: '10px',
    color: '#333',
  },
};