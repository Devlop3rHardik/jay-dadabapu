// server.js
const express = require('express');
const requestIp = require('request-ip');

const app = express();
const port = process.env.PORT || 3001;

const onlineUsers = new Set(); // Using a Set to store unique user IPs

app.get('/counter', (req, res) => {
    const clientIp = requestIp.getClientIp(req);
    
    // Check if the user's IP is not in the Set, then add it
    if (!onlineUsers.has(clientIp)) {
        onlineUsers.add(clientIp);
    }

    const responseData = {
        counter: onlineUsers.size,
    };

    res.json(responseData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
