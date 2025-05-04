import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomModal from '../components/CustomModal';
import EditComponent from '../components/EditComponent';

export default function StateDetailsPage() {
  const { stateName } = useParams();
  const [stateData, setStateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [recordId, setRecordId] = useState(null);

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/covid/state/${stateName}`);
        setStateData(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch state data.');
        setLoading(false);
      }
    };
    fetchStateData();
  }, [stateName]);

  const handleEdit = async (updatedRecord) => {
    console.log(updatedRecord);
    try {
      await axios.put(`http://localhost:5000/api/covid/update/${updatedRecord._id}`, updatedRecord);
      setStateData((prevData) =>
        prevData.map((record) =>
          record._id === updatedRecord._id ? updatedRecord : record
        )
      );
      alert('Record updated successfully');
      setIsEditModalOpen(false);
      setSelectedRecord(null);
      setRecordId(null);
    } catch (err) {
      alert('Failed to update record');
    }
  };

  const openEditModal = (recordid, record) => {
    setSelectedRecord(record);
    setRecordId(recordid);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRecord(null);
    setRecordId(null);
  };

      const handleDelete = async () => {
        try {
          await axios.delete(`http://localhost:5000/api/covid/delete/${selectedRecordId}`);
          setStateData(stateData.filter(record => record._id !== selectedRecordId));
          alert('Record deleted successfully');
          setIsModalOpen(false);
        } catch (err) {
          alert('Failed to delete record');
        }
      };

  const openModal = (recordId) => {
    setSelectedRecordId(recordId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecordId(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h1>Details for {stateName}</h1>
      <div style={styles.cardContainer}>
        {stateData.map((record) => (
          <div key={record._id} style={styles.card}>
            <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
            <p><strong>Cases:</strong> {record.cases}</p>
            <p><strong>Deaths:</strong> {record.deaths}</p>
            <button style={styles.editButton} onClick={() => openEditModal(record._id, record)}>Edit</button>
            <button style={styles.deleteButton} onClick={() => openModal(record._id)}>Delete</button>
          </div>
        ))}
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this record?"
      />

      <EditComponent
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onEdit={handleEdit}
        record={selectedRecord}
        recordID={recordId}
      />
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  editButton: {
    marginRight: '10px',
    padding: '10px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
