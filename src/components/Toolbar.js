import React from "react";

const Toolbar = ({ spreadsheet, setSpreadsheet, selectedCells }) => {
  // Function to apply cell formatting (bold, italic, etc.)
  const applyCellFormatting = (styleType, value) => {
    const newSpreadsheet = spreadsheet.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        selectedCells.some(
          (selectedCell) => selectedCell.row === rowIndex && selectedCell.col === colIndex
        )
          ? {
              ...cell,
              [styleType]: value, // Apply the formatting style (e.g., fontWeight, fontStyle, etc.)
            }
          : cell
      )
    );
    setSpreadsheet(newSpreadsheet);
  };

  // Function to handle font size changes
  const handleFontSizeChange = (e) => {
    const newFontSize = parseInt(e.target.value);
    const newSpreadsheet = spreadsheet.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        selectedCells.some(
          (selectedCell) => selectedCell.row === rowIndex && selectedCell.col === colIndex
        )
          ? { ...cell, fontSize: newFontSize }
          : cell
      )
    );
    setSpreadsheet(newSpreadsheet);
  };

  // Function to handle font color changes
  const handleFontColorChange = (e) => {
    const newFontColor = e.target.value;
    const newSpreadsheet = spreadsheet.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        selectedCells.some(
          (selectedCell) => selectedCell.row === rowIndex && selectedCell.col === colIndex
        )
          ? { ...cell, fontColor: newFontColor }
          : cell
      )
    );
    setSpreadsheet(newSpreadsheet);
  };

  return (
    <div className="toolbar">
      {/* Bold Button */}
      <button onClick={() => applyCellFormatting("fontWeight", "bold")}>B</button>
      
      {/* Italic Button */}
      <button onClick={() => applyCellFormatting("fontStyle", "italic")}>I</button>

      {/* Font Size Dropdown */}
      <select onChange={handleFontSizeChange} defaultValue="14">
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="24">24</option>
        <option value="30">30</option>
        <option value="32">32</option>
        <option value="34">34</option>
        <option value="36">36</option>
        <option value="38">38</option>
        <option value="40">40</option>
      </select>

      {/* Font Color Dropdown */}
      <select onChange={handleFontColorChange} defaultValue="black">
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="purple">Purple</option>
        <option value="orange">Orange</option>
        <option value="brown">Brown</option>
        <option value="pink">Pink</option>
        <option value="gray">Gray</option>
      </select>
    </div>
  );
};

export default Toolbar;
