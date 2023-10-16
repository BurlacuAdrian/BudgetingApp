import React from 'react';
import '../styles.css'

const ExpensesTable = () => {
  return (<>
    {/* <h1>Title</h1> */}
    <table className="my-table w-full h-full">
      <thead>
        <tr>
          <th>Date</th>
          <th>Source</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {/* 8 empty rows */}
        {[...Array(6)].map((_, index) => (
          <tr key={index}>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
        {/* Total row */}
        <tr>
          <td colSpan="2">Total</td>
          <td >Sum</td>
        </tr>
      </tbody>
    </table>
  </>);
};

export default ExpensesTable;
