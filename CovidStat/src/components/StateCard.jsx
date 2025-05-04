// src/components/StateCard.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function StateCard({ record }) {
  if (!record) {
    return <div>OOPS no data</div>;
  }

  const stateName = record.state || "Unknown";

  return (
    <Link to={`/state/${stateName}`} style={{ textDecoration: 'none' }}>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>{record.state}</h3>
        <p><strong>Cases:</strong> {record.totalCases}</p>
        <p><strong>Deaths:</strong> {record.totalDeaths}</p>
      </div>
    </Link>
  );
}

export function CustomModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttonContainer}>
          <button style={styles.confirmButton} onClick={onConfirm}>Yes</button>
          <button style={styles.cancelButton} onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#f9f9f9', // Light background
    border: '1px solid #e0e0e0', // Light gray border
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Subtle shadow
    padding: '20px',
    position: 'relative',
    transition: 'transform 0.2s ease',
  },
  cardTitle: {
    margin: '0 0 15px',
    fontSize: '1.2rem',
    color: '#333', // Dark text
  },
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
    textAlign: 'center',
    width: '300px',
  },
  message: {
    marginBottom: '20px',
    fontSize: '1rem',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  confirmButton: {
    padding: '10px 20px',
    backgroundColor: '#4caf50', // Green button
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336', // Red button
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
