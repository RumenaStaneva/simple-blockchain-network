const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const uri = process.env.DB_URI;

// Create a new MongoClient
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

exports.connectToDatabase = async function () {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
    } catch (error) {
        console.log(error);
    }
}

// Export the client object
exports.getClient = function () {
    return client;
};


