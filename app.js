const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a server
const server = http.createServer((req, res) => {
  // Handle API root
  if (req.url === '/' || req.url === '/api') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 
      message: 'ERP API Server',
      status: 'running',
      endpoints: ['/api', '/api/status', '/api/users'],
      timestamp: new Date().toISOString()
    }));
  } 
  // Handle API endpoints
  else if (req.url.startsWith('/api/')) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 
      endpoint: req.url,
      message: 'API endpoint accessed',
      status: 'success'
    }));
  }
  // Handle 404 - Not Found
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'error',
      message: 'Endpoint not found',
      path: req.url
    }));
  }
});

// Define the port and host
const port = process.env.PORT || 3031;
const host = '0.0.0.0';  // Listen on all network interfaces

// Start the server
server.listen(port, host, () => {
  console.log(`API server running at http://${host}:${port}/`);
});
