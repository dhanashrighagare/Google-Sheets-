import React, { useState, useEffect } from "react";
import { calculateCellValue } from "../utils/functions"; // Formula calculation logic

const Spreadsheet = ({
  spreadsheet,
  setSpreadsheet,
  selectedCells,
  setSelectedCells,
}) => {
  const [columnWidths, setColumnWidths] = useState(
    new Array(spreadsheet[0]?.length || 0).fill(100) // Initial column width
  );

  // Handle selecting cells
  const handleCellSelect = (rowIndex, colIndex) => {
    setSelectedCells((prevSelectedCells) => {
      const index = prevSelectedCells.findIndex(
        (cell) => cell.row === rowIndex && cell.col === colIndex
      );
      if (index === -1) {
        return [...prevSelectedCells, { row: rowIndex, col: colIndex }];
      } else {
        return prevSelectedCells.filter(
          (cell) => !(cell.row === rowIndex && cell.col === colIndex)
        );
      }
    });
  };

  // Handle content changes in a cell
  const handleChange = (rowIndex, colIndex, e) => {
    const newSpreadsheet = spreadsheet.map((row, rIndex) =>
      rIndex === rowIndex
        ? row.map((cell, cIndex) =>
            cIndex === colIndex
              ? { ...cell, value: e.target.value, isCalculated: false }
              : cell
          )
        : row
    );
    setSpreadsheet(newSpreadsheet);
  };

  // Add a new row at a specific index
  const addRow = (index) => {
    const newRow = new Array(spreadsheet[0].length).fill({
      value: "",
      fontSize: 14,
    });
    const newSpreadsheet = [...spreadsheet];
    newSpreadsheet.splice(index, 0, newRow); // Insert new row at the given index
    setSpreadsheet(newSpreadsheet);
  };

  // Remove a row at a specific index
  const removeRow = (index) => {
    const newSpreadsheet = spreadsheet.filter(
      (_, rowIndex) => rowIndex !== index
    );
    setSpreadsheet(newSpreadsheet);
  };

  // Add a new column at a specific index
  const addColumn = (index) => {
    const newSpreadsheet = spreadsheet.map((row) => {
      const newCell = { value: "", fontSize: 14 };
      row.splice(index, 0, newCell); // Insert new column at the given index
      return row;
    });
    setSpreadsheet(newSpreadsheet);
  };

  // Remove a column at a specific index
  const removeColumn = (index) => {
    const newSpreadsheet = spreadsheet.map((row) => {
      row.splice(index, 1); // Remove the column at the given index
      return row;
    });
    setSpreadsheet(newSpreadsheet);
  };

  // Handle drag start event (for resizing columns)
  const handleDragStart = (e, colIndex) => {
    e.preventDefault();
    e.dataTransfer.setData("colIndex", colIndex);
  };

  // Handle drag over event (for resizing columns)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop event (for resizing columns)
  const handleDrop = (e, colIndex) => {
    e.preventDefault();
    const startX = e.clientX;
    const dragColIndex = e.dataTransfer.getData("colIndex");

    const onDragMove = (moveEvent) => {
      const widthDiff = moveEvent.clientX - startX;
      const newWidths = [...columnWidths];
      newWidths[dragColIndex] = Math.max(
        50,
        newWidths[dragColIndex] + widthDiff
      );
      setColumnWidths(newWidths);
    };

    const onDragEnd = () => {
      document.removeEventListener("mousemove", onDragMove);
      document.removeEventListener("mouseup", onDragEnd);
    };

    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);
  };

  // Adjust table when rows/columns are added or removed
  useEffect(() => {
    if (spreadsheet[0]) {
      setColumnWidths(new Array(spreadsheet[0].length).fill(100)); // Reset column widths when column count changes
    }
  }, [spreadsheet]);

  return (
    <div>
      <div className="toolbar">
        {/* Add Buttons for Row and Column Manipulation */}
        <button onClick={() => addRow(0)}>Add Row Above</button>
        <button onClick={() => addRow(spreadsheet.length)}>
          Add Row Below
        </button>
        <button onClick={() => removeRow(0)}>Remove First Row</button>

        <button onClick={() => addColumn(0)}>Add Column Left</button>
        <button onClick={() => addColumn(spreadsheet[0]?.length)}>
          Add Column Right
        </button>
        <button onClick={() => removeColumn(0)}>Remove First Column</button>
      </div>

      <table className="spreadsheet">
        <thead>
          <tr>
            {Array.from({ length: spreadsheet[0]?.length }, (_, i) => (
              <th key={i} style={{ width: columnWidths[i] }}>
                {String.fromCharCode(65 + i)}
                {/* Resize Column */}
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, i)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, i)}
                  className="resize-column"
                  style={{ cursor: "col-resize", height: "100%" }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {spreadsheet.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                const calculatedValue = cell.isCalculated
                  ? cell.value
                  : calculateCellValue(rowIndex, colIndex, spreadsheet);

                return (
                  <td
                    key={colIndex}
                    onClick={() => handleCellSelect(rowIndex, colIndex)}
                    style={{ width: columnWidths[colIndex] }}
                  >
                    <input
                      type="text"
                      value={calculatedValue || cell.value}
                      onChange={(e) => handleChange(rowIndex, colIndex, e)}
                      style={{
                        fontSize: `${cell.fontSize || 14}px`, // Apply the font size
                        fontWeight: cell.fontWeight || "normal", // Apply bold style
                        fontStyle: cell.fontStyle || "normal", // Apply italic style
                        color: cell.fontColor || "black", // Apply font color
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
