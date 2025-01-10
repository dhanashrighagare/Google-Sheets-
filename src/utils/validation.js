export const validateNumeric = (value) => {
    return !isNaN(value) && value.trim() !== "";
  };
  
  export const handleTextInput = (value) => {
    return value; // In the future, you can handle specific text types (e.g., Date parsing)
  };
  