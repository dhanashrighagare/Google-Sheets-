import React, { useState } from "react";
import Toolbar from "./components/Toolbar";
import Spreadsheet from "./components/Spreadsheet";
import FormulaBar from "./components/FormulaBar";
import './App.css';

const App = () => {
  const initialSpreadsheet = Array(10).fill(Array(10).fill({
    value: "",
    formula: "",
    isCalculated: false,
    bold: false,
    italic: false,
    fontSize: 14,
    fontColor: "black",
    backgroundColor: "white",
  }));

  const [spreadsheet, setSpreadsheet] = useState(initialSpreadsheet);
  const [selectedCells, setSelectedCells] = useState([]);

  return (
    <div className="App">
      <Toolbar
        spreadsheet={spreadsheet}
        setSpreadsheet={setSpreadsheet}
        selectedCells={selectedCells}
        setSelectedCells={setSelectedCells}
      />
      <FormulaBar
        spreadsheet={spreadsheet}
        selectedCells={selectedCells}
        setSpreadsheet={setSpreadsheet}
      />
      <Spreadsheet
        spreadsheet={spreadsheet}
        setSpreadsheet={setSpreadsheet}
        selectedCells={selectedCells}
        setSelectedCells={setSelectedCells}
      />
    </div>
  );
};

export default App;
