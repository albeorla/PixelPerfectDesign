// Import required dependencies
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Add middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a simple endpoint to handle form submissions
app.post('/api/contact', (req, res) => {
  console.log('Contact form submission received:', req.body);
  res.json({ success: true });
});

// For any other requests, send the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
const portNumber = typeof PORT === 'string' ? parseInt(PORT, 10) : PORT;
app.listen(portNumber, '0.0.0.0', () => {
  console.log(`[express] serving on port ${portNumber}`);
});