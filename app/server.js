

// server.js using Node.js

// Import dependencies
    // Import express.js framework (building web apps/ API with Node.js)
    // body-parser used to parse incoming request in a middleware before handlers (req.body property)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express application
    // Creates instance of Express app, used to configure routes, middleware, handle HTTP requests.
const app = express();
const port = 3000;

// Set up middleware
    // Add body-parser middleware to Express
        // Configures middleware to parse JSON data from incoming requests and populate (req.body) object.

app.use(cors());        app.use(bodyParser.json());
app.use(express.static('app')); // Serve static files from codefiles directory

// Routes
app.post('/api/saveUserData', (req, res) => {
    const userData = req.body;
    // Process and save userData to your database
    console.log('Received user data:', userData);
    res.json({ success: true });
});

    // Create route for root path because it is producing a 404 Not Found error.
    // 404 Not Found indicates there might not be a route defined for root path in Express application.
app.get('/', (req, res) => {
    res.send('Hello, this is the root route.')
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Indicates server is ready to receive requests.
});









// Server needs to listen for POST request at /api/saveUserData endpoint
// Process incoming JSON data.

// Need to add console.log to ensure if server receives and processes incoming data

// Favicon.ico.file
    //

// Installed CORS (Cross Origin Resource Sharing) security feature that restrict webpages fro making requests to different domain.
    // npm install cors

// Console
    // server response {success: true}
        // serve successfully received user data and processed it. API indication that it was successful.
        // frontend application received server response successfully 





/* PURPOSE OF API
    Uses Node and Express
    Use POST to receive user data, process, and save to database. It logs data to console and sends back JSON response indicating success.
    Use GET to handle request to root path. Prevent Not Found Error.
    Express simplifies process of building web app and API.
    Body parser used to parse incoming request. Parses JSON data.
    CORS allows server to accept request from other domains.
    Server configured with static files.
    Port configuration to port 3000.
    Console logs statments to indicate server status.

*/