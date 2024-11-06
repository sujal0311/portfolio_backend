const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS to allow requests from your frontend

// Path to the file where we store the count
const COUNTER_FILE = "./counter.txt";

// Helper function to read the current count from file
const readCount = () => {
  try {
    const data = fs.readFileSync(COUNTER_FILE, "utf8");
    return parseInt(data) || 0;
  } catch (err) {
    console.error("Error reading counter file:", err);
    return 0;
  }
};

// Helper function to write the updated count to file
const writeCount = (count) => {
  try {
    fs.writeFileSync(COUNTER_FILE, count.toString());
  } catch (err) {
    console.error("Error writing to counter file:", err);
  }
};

// Route to get and increment the visitor count
app.get("/api/visitor-count", (req, res) => {
  // Read the current count
  let count = readCount();
  
  // Increment the count
  count += 1;

  // Save the updated count
  writeCount(count);

  // Send the updated count back to the client
  res.json({ count });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
