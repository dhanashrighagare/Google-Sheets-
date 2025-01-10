// Basic formula calculation example
export const calculateCellValue = (row, col, spreadsheet) => {
    const cell = spreadsheet[row][col];
    if (cell.formula) {
      // Simple formula parsing (this can be extended for more complex formulas)
      const formula = cell.formula.slice(1); // Remove the '=' sign
      const [cellRef] = formula.split('+'); // Support for simple '+'
      const [r, c] = cellRef.split("");
      const rowIndex = parseInt(r) - 1; // Example conversion logic for Excel-like formula
  
      return spreadsheet[rowIndex][parseInt(c) - 1].value;
    }
    return cell.value;
  };
  