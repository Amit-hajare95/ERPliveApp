const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a server
const server = http.createServer((req, res) => {
  // Handle API requests
  if (req.url === '/api') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 
      message: 'Hello from the API!', 
      status: 'success',
      timestamp: new Date().toISOString()
    }));
  } 
  // Handle root path - serve HTML
  else if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(content);
    });
  }
  // Handle other API endpoints
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
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>404 - Page Not Found</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #d9534f; }
            a { color: #0275d8; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <p><a href="/">Go back to homepage</a></p>
        </body>
      </html>
    `);
  }
});

// Define the port and host
const port = process.env.PORT || 3000;
const host = '0.0.0.0';  // Listen on all network interfaces

// Start the server
server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
