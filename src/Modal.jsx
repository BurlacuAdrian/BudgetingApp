import React, {useState, useEffect} from 'react';
import 'tailwindcss/tailwind.css';


const Modal = ({categoryIndex, closeModal, expenses, updateExpensesByCategory}) => {


  const [cellContent, setCellContent] = useState(() => {
    const initialContent = expenses.map((dataItem) => [dataItem.date, dataItem.source, dataItem.amount]);
    const remainingRows = Math.max(10 - initialContent.length, 0);
    for (let i = 0; i < remainingRows; i++) {
      initialContent.push(['', '', '']);
    }

    return initialContent;
  });

  const updateCells = () =>{
    const updatedExpenses = cellContent.map((row) => ({date: row[0], source: row[1], amount: row[2]}));
    updateExpensesByCategory(categoryIndex, updatedExpenses)
  }

  // useEffect(() => {
  //   const updatedExpenses = cellContent.map((row) => ({date: row[0], source: row[1], amount: row[2]}));
  //   updateExpensesByCategory(categoryIndex, updatedExpenses)
  // }, [cellContent]);

  return (
    <div className="modal-overlay"
      onClick={()=>{
        updateCells()
        closeModal();
        
      }}>
      <div className="modal-content rounded-lg w-80vw h-80vh"
        onClick={
          (e) => e.stopPropagation()
      }>
        <div className="flex flex-col">
          <div className="flex justify-between bg-gray-200 p-4 rounded-t-lg">
            <span>Date</span>
            <span>Source</span>
            <span>Amount</span>
          </div>
          <div className="overflow-y-auto">
            <table className="w-full border-collapse border">
              <tbody>
                {cellContent.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    {row.map((content, cellIndex) => (
                      <td key={cellIndex} className="border-r p-2">
                        <input
                          type="text"
                          value={content}
                          onChange={(e) => {
                            const updatedContent = [...cellContent];
                            updatedContent[rowIndex][cellIndex] = e.target.value;
                            setCellContent(updatedContent);
                          }}
                          className="w-full border-none focus:outline-none"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between bg-gray-200 p-4 rounded-b-lg">
            <span className="flex-2">Total</span>
            <span className="flex-1">Sum</span>
          </div>
        </div>
        <button className="absolute top-4 right-4"
          onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
