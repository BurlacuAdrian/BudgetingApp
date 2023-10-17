import React, { useState } from 'react';
import '../styles.css';

const ExpensesTable = ({ category, data, sum }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  
  const paddedData = [...data, ...Array(Math.max(6 - data.length, 0)).fill({ date: '', source: '', amount: '' })];

  return (
    <>
      <table
        className="my-table w-full h-full"
        onClick={openModal}
        style={{ cursor: 'pointer' }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Source</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {paddedData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.source}</td>
              <td>{entry.amount}</td>
            </tr>
          ))}
          {/* Total row */}
          <tr>
            <td colSpan="2">Total</td>
            <td>{sum}</td>
          </tr>
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>This is your modal content.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpensesTable;
