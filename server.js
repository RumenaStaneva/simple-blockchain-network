const express = require('express');
const app = express();
const { connectToDatabase, getClient } = require('./db');
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Call the connectToDatabase function to establish the connection
connectToDatabase().catch(console.dir);
// Retrieve the MongoDB client
const client = getClient();
// Connect to MongoDB
client.connect().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});


// Endpoint: /
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint: /blocks/all
app.get('/blocks/all', async (req, res) => {
    try {
        const collection = client.db('limechain-task').collection('blocks');
        const blocks = await collection.find().toArray();
        res.json(blocks);
    } catch (error) {
        console.error('Error retrieving blocks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint: /block/hash
app.get('/block/:hash', async (req, res) => {
    const hash = req.params.hash;
    try {
        const collection = client.db('limechain-task').collection('blocks');
        const block = await collection.findOne({ currentHash: hash });
        if (block) {
            res.json(block);
        } else {
            res.status(404).json({ error: 'Block not found' });
        }
    } catch (error) {
        console.error('Error retrieving block:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});