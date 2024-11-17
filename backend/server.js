const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // MySQL client
const app = express();
const port = 3001;

// Middleware for CORS (Cross-Origin Resource Sharing)
app.use(cors());
require('dotenv').config()

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST , // Set your DB host (RDS endpoint)
  user: process.env.DB_USER, // Your DB username
  password: process.env.DB_PASSWORD, // Your DB password
  database: process.env.DB_NAME, // Your DB name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoint to get data from the database by ID
app.get('/api/data/:id', (req, res) => {
  const id = req.params.id;

  // SQL query to fetch data from "my_table"
  const query = 'SELECT * FROM my_table WHERE id = ?';

  // Run the query
  db.execute(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err.stack);
      return res.status(500).json({ message: 'Error fetching data from the database' });
    }

    // Check if data is found
    if (results.length > 0) {
      return res.json(results); // Send the results as JSON
    } else {
      return res.status(404).json({ message: 'Item not found' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
