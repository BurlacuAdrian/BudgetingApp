import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import '../styles.css';

const ExpensesTable = ({ categoryTitle, categoryIndex, expenses, updateExpensesByCategory,sum }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState([]);

  // console.log("EXPENSES for "+categoryTitle)
  // console.log(expenses)

  useEffect(() => {

    const newData = expenses.filter((item) => item.date !== '' && item.source !== '' && item.amount !== '');
    const count = newData.length;

    // console.log(Math.max(6 - count, 0))
    Array(Math.max(6 - count, 0)).fill({ date: '', source: '', amount: '' }).forEach((element,index)=>{
      newData.push(element)
    })
    setPreviewData(newData)
  }, [expenses]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          {previewData.map((entry, index) => (
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

      {isModalOpen && <Modal categoryIndex={categoryIndex} closeModal={closeModal} expenses={expenses} updateExpensesByCategory={updateExpensesByCategory} />}
    </>
  );
};

export default ExpensesTable;
