var crypto = require('crypto');

const { connectToDatabase, getClient } = require('./db');

// Call the connectToDatabase function to establish the connection
connectToDatabase().catch(console.dir);

// Retrieve the MongoDB client
const client = getClient();

class Block {
    #timestamp;
    #transaction;
    #currentHash;
    #previousHash;
    #nonce;
    constructor(timestamp, transaction, previousHash, nonce) {
        this.#timestamp = timestamp;
        this.#transaction = transaction;
        this.#currentHash = this.constructHash(timestamp, transaction, previousHash);
        this.#previousHash = previousHash;
        this.#nonce = nonce;
    }

    constructHash(timestamp, transaction, previousHash) {
        var name = timestamp + JSON.stringify(transaction) + previousHash;
        var hash = crypto.createHash('md5').update(name).digest('hex');
        return hash;
    }

    get timestamp() {
        return this.#timestamp;
    }
    get transaction() {
        return this.#transaction;
    }
    get currentHash() {
        return this.#currentHash;
    }
    get previousHash() {
        return this.#previousHash;
    }
    get nonce() {
        return this.#nonce;
    }
}


class Blockchain {
    constructor() {
        this.databaseName = 'limechain-task';
        this.collectionName = 'blocks';
    }

    async initializeCollection() {
        try {
            const collections = await client.db(this.databaseName).listCollections({ name: this.collectionName }).toArray();
            if (collections.length === 0) {
                await client.db(this.databaseName).createCollection(this.collectionName);
                console.log(`Collection '${this.collectionName}' created.`);
            } else {
                console.log(`Collection '${this.collectionName}' already exists.`);
            }
            this.collection = client.db(this.databaseName).collection(this.collectionName); // Assign the collection to this.collection
        } catch (error) {
            console.error(`Error initializing collection: ${error}`);
        }
    }

    async createGenesisBlock(timestamp, transaction) {
        try {
            // Check if the collection exists, create it if it doesn't
            await this.initializeCollection();

            // Check if the genesis block already exists
            const existingGenesisBlock = await this.collection.findOne({ previousHash: '' });
            if (existingGenesisBlock) {
                console.log('Genesis block already exists in the database.');
                return;
            }

            const genezisBlock = new Block(timestamp, transaction, '', 0);

            const blockData = {
                timestamp: genezisBlock.timestamp,
                transaction: genezisBlock.transaction,
                currentHash: genezisBlock.currentHash,
                previousHash: genezisBlock.previousHash,
                nonce: genezisBlock.nonce,
            };

            await this.collection.insertOne(blockData);
            console.log('Genesis block saved to the database');
        } catch (error) {
            console.error(`Error creating genesis block: ${error}`);
        }
    }

    async createBlock(timestamp, transaction) {
        try {
            // Check if the collection is initialized
            if (!this.collection) {
                await this.initializeCollection();
            }

            // Get the previous block's current hash from the database
            const previousBlock = await this.collection.findOne({}, { sort: { timestamp: -1 } });
            const previousHash = previousBlock ? previousBlock.currentHash : '';

            const nonce = await this.calculateNonce();
            const block = new Block(timestamp, transaction, previousHash, nonce);

            const blockData = {
                timestamp: block.timestamp,
                transaction: block.transaction,
                currentHash: block.currentHash,
                previousHash: block.previousHash,
                nonce: block.nonce,
            };

            await this.collection.insertOne(blockData);
            console.log('Block saved to the database');
        } catch (error) {
            console.error('Error saving block to database:', error);
        }
    }

    async calculateNonce() {
        // Fetch the latest block from the database to get the last nonce
        const lastBlock = await this.collection.findOne({}, { sort: { timestamp: -1 } });
        const lastNonce = lastBlock ? lastBlock.nonce : 0;

        const nonce = lastNonce + 9;
        return nonce;
    }

    async validateChain() {
        try {
            const blocks = await this.collection.find().toArray();

            for (let i = 1; i < blocks.length; i++) {
                const currentBlock = blocks[i];
                const previousBlock = blocks[i - 1];

                const blockToValidate = new Block(
                    currentBlock.timestamp,
                    currentBlock.transaction,
                    previousBlock.currentHash,
                    currentBlock.nonce
                );

                if (blockToValidate.currentHash !== currentBlock.currentHash) {
                    console.log('Chain is not valid');
                    return;
                }
            }

            console.log('Chain is valid');
        } catch (error) {
            console.error('Error validating chain:', error);
        }
    }

    async validateCurrentBlock() {
        try {
            const currentBlock = await this.collection.findOne({}, { sort: { timestamp: -1 } });

            const blockTovalidate = new Block(
                currentBlock.timestamp,
                currentBlock.transaction,
                currentBlock.previousHash,
                currentBlock.nonce
            )

            if (currentBlock.currentHash !== blockTovalidate.currentHash) {
                console.log('Current block is not valid');
                return;
            }
            console.log('Current block is valid');
        } catch (error) {
            console.error('Error validating current block:', error);
        }
    }

    async validatePenultimateBlock() {
        try {
            const arrayOfBlocks = await this.collection.find().sort({ timestamp: -1 }).limit(2).toArray();
            if (arrayOfBlocks.length < 2) {
                console.log('There is only one or 0 blocks, not possible to validate');
                return;
            }
            const currentBlock = arrayOfBlocks[0];
            const penultimateBlock = arrayOfBlocks[1];

            if (currentBlock.previousHash !== penultimateBlock.currentHash) {
                console.log('Penultimate block is not valid');
                return;
            }
            console.log('Penultimate block is valid');
        } catch (error) {
            console.error('Error validating current block:', error);
        }
    }
}

async function init() {
    const blocky = new Blockchain();

    await blocky.createGenesisBlock(Date.now(), [{ "name": "Rumba" }, { "name": "Ninooo" }]);
    await blocky.createBlock(Date.now(), [{ "name": "Mima" }, { "name": "Limuzina" }]);
    await blocky.createBlock(Date.now(), [{ "name": "Rumba" }, { "name": "Ninooo" }]);

    blocky.validateChain();
    blocky.validateCurrentBlock();
    blocky.validatePenultimateBlock();
}

init();