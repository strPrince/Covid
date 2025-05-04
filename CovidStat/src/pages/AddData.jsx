import React, { useState } from 'react';
import axios from 'axios';
import './AddData.css'; 
const AddData = () => {
  const [formData, setFormData] = useState({
    state: '',
    cases: '',
    deaths: '',
    date: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/covid/add', {
        ...formData
      }
      );
    
      alert('Data submitted successfully!');
      setFormData({ state: '', cases: '', deaths: '', date: '' });
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data. Please try again.');
    }
  };

  return (
    <div className="add-data-container">
      <h2 className="title">Add COVID Data</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="state" className="label">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cases" className="label">Cases:</label>
          <input
            type="number"
            id="cases"
            name="cases"
            value={formData.cases}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deaths" className="label">Deaths:</label>
          <input
            type="number"
            id="deaths"
            name="deaths"
            value={formData.deaths}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date" className="label">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <button type="submit" className="button submit-button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default AddData;