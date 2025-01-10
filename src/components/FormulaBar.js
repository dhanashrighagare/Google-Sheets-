import React from "react";

const FormulaBar = ({ spreadsheet, selectedCells, setSpreadsheet }) => {
  const handleFormulaChange = (e) => {
    const formula = e.target.value;
    const newSpreadsheet = [...spreadsheet];
    selectedCells.forEach(({ row, col }) => {
      newSpreadsheet[row][col].formula = formula;
      newSpreadsheet[row][col].isCalculated = false;
    });
    setSpreadsheet(newSpreadsheet);
  };

  return (
    <input
      type="text"
      placeholder="Enter Formula"
      onChange={handleFormulaChange}
    />
  );
};

export default FormulaBar;
