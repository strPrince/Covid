import React, { useState, useEffect } from 'react';

export default function EditComponent({ isOpen, onClose, onEdit, record, recordID }) {
  const [formData, setFormData] = useState({ cases: '', deaths: '', date: '' });

  useEffect(() => {
    if (record) {
      setFormData({
        cases: record.cases || '',
        deaths: record.deaths || '',
        date: record.date ? new Date(record.date).toISOString().split('T')[0] : '',
      });
    }
  }, [record]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onEdit({ ...formData, _id: recordID });
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Edit Data for {record?.state}</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Cases:</label>
          <input
            type="number"
            name="cases"
            value={formData.cases}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Deaths:</label>
          <input
            type="number"
            name="deaths"
            value={formData.deaths}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.saveButton} onClick={handleSubmit}>Save</button>
          <button style={styles.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    width: '400px',
  },
  title: {
    marginBottom: '20px',
    fontSize: '1.5rem',
    color: '#333',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '1rem',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
