import React from 'react';

const FinalPage = ({ formData }) => {
  return (
    <div>
      <h1>Final Data</h1>
      <h2>Summary:</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <button onClick={() => alert('Data saved!')}>Save Data</button>
    </div>
  );
};

export default FinalPage;
