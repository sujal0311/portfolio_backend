// Importing required modules
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

// Use environment variable for port, fallback to 5000 if not set
const PORT = process.env.PORT || 5000;

// Enable CORS for all domains (can be modified to specific domains for production)
app.use(cors());

// Path to the file where we store the count
const COUNTER_FILE = process.env.COUNTER_FILE || "./counter.txt"; // Optional: use env var for flexibility

// Helper function to read the current count from the counter file
const readCount = () => {
  try {
    const data = fs.readFileSync(COUNTER_FILE, "utf8");
    return parseInt(data) || 0; // Return 0 if no valid count is found
  } catch (err) {
    console.error("Error reading counter file:", err);
    return 0;
  }
};

// Helper function to write the updated count to the counter file
const writeCount = (count) => {
  try {
    fs.writeFileSync(COUNTER_FILE, count.toString());
  } catch (err) {
    console.error("Error writing to counter file:", err);
  }
};

// Route to get and increment the visitor count
app.get("/api/visitor-count", (req, res) => {
  try {
    // Read the current count
    let count = readCount();
  
    // Increment the count
    count += 1;
  
    // Save the updated count
    writeCount(count);
  
    // Send the updated count back to the client
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch visitor count" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
