import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import '../styles.css';

const ExpensesTable = ({ category, modalCat, data, sum }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [fullData, setFullData] = useState(data);

  useEffect(() => {
    // Update modalData with exactly 6 rows for each category
    const emptyRows = Array(Math.max(6 - data.length, 0)).fill({ date: '', source: '', amount: '' });
    setModalData([...data, ...emptyRows]);
  }, [data]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateModalData = (updatedData) => {
    setModalData(updatedData);
  };

  {console.log(JSON.stringify(fullData,null,2))}
  return (
    <>
      <table className="my-table w-full h-full" onClick={openModal} style={{ cursor: 'pointer' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Source</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {modalData.map((entry, index) => (
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

      {/* Pass the key, closeModal function, modalData, and update function to the Modal component */}
      {isModalOpen && <Modal key2={modalCat} closeModal={() => setIsModalOpen(false)} modalData={fullData} updateModalData={setFullData} />}
    </>
  );
};

export default ExpensesTable;
