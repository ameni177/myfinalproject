import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [inputId, setInputId] = useState('');
  const [ec2Ip, setEc2Ip] = useState(''); // Store EC2 IP

  // This will run only once when the component mounts
  useEffect(() => {
    // Get EC2 IP from the environment variable
    const ip = process.env.REACT_APP_EC2_IP || '';  // Default to empty if not set
    setEc2Ip(ip);
  }, []);


  const fetchData = async (id) => {
    try {
      // Use EC2 IP if available, otherwise fallback to localhost
      const backendUrl = ec2Ip ? `http://${ec2Ip}:3001/api/data/${id}` : `http://localhost:3001/api/data/${id}`;
      const res = await fetch(backendUrl);
      const data = await res.json();
      setData(data); // Assuming the backend returns an array of data
    } catch (err) {
      console.log("Error occurred:", err);
    }
  };

  const handleFetch = () => {
    fetchData(inputId);
  };

  return (
    <div>
      <h1>Simple Web App</h1>
      <div>
        <input 
          type="text" 
          value={inputId} 
          onChange={(e) => setInputId(e.target.value)} 
          placeholder="Enter ID" 
        />
        <button onClick={handleFetch}>Fetch Data</button>
      </div>
      <div>
        <h2>Results:</h2>
        <ul>
          {data.length > 0 ? (
            data.map((item, index) => (
              <li key={index}>
                {/* Assuming 'name' is a field in the backend data */}
                {item.name}
              </li>
            ))
          ) : (
            <p>No data found</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
