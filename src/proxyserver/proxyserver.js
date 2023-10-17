const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins (replace '*' with the specific origin of your Vue app)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/xkcd/:comicNumber', async (req, res) => {
    const { comicNumber } = req.params;
    try {
        const response = await axios.get(`https://xkcd.com/${comicNumber}/info.0.json`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch XKCD comic.' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});


