const { log } = require('console');
var crypto = require('crypto');
class Block {
    constructor(timestamp, transaction, previousHash, nonce) {
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.currentHash = this.constructHash(timestamp, transaction, previousHash);
        this.previousHash = previousHash;
        this.nonce = nonce;
    }

    constructHash(timestamp, transaction, previousHash) {
        var name = timestamp + JSON.stringify(transaction) + previousHash;
        var hash = crypto.createHash('md5').update(name).digest('hex');
        //console.log(hash);
        return hash;
    }
}


class Blockchain {
    constructor() {
        this.blockchainBlocks = []
    }
    createGenezisBlock(timestamp, transaction) {
        const genezisBlock = new Block(timestamp, transaction, '', 0);
        this.blockchainBlocks.push(genezisBlock);
    }

    createBlock(timestamp, transaction) {
        this.calculateNonce();
        const previousHash = this.blockchainBlocks[this.blockchainBlocks.length - 1].currentHash;
        const nonce = this.calculateNonce();
        const block = new Block(timestamp, transaction, previousHash, nonce);
        this.blockchainBlocks.push(block);
    }

    calculateNonce() {
        const nonce = this.blockchainBlocks[this.blockchainBlocks.length - 1].nonce + 9;
        //console.log(nonce);
        return nonce;
    }

    validateChain() {
        const blockToValidate = this.blockchainBlocks[this.blockchainBlocks.length - 1];
        const hashToValidate = blockToValidate.constructHash(blockToValidate.timestamp, blockToValidate.transaction, blockToValidate.previousHash);
        const blockHash = blockToValidate.currentHash;

        if (hashToValidate == blockHash) {
            console.log('Rumi e bok');
        } else {
            console.log('nanq mi se');
        }
    }
}

// const block = new Block(Date.now(), [{ "name": "Rumba" }, { "name": "Ninooo" }], '155156154181163546', '')
// console.log(block.hash);

const blocky = new Blockchain();

blocky.createGenezisBlock(Date.now(), [{ "name": "Rumba" }, { "name": "Ninooo" }]);
blocky.createBlock(Date.now(), [{ "name": "Rumba" }, { "name": "Ninooo" }]);
blocky.createBlock(Date.now(), [{ "name": "Rumba" }, { "name": "Ninooo" }]);
blocky.createBlock(Date.now(), [{ "name": "Rumba" }, { "name": "Ninooo" }]);

//console.log(blocky.blockchainBlocks);

blocky.validateChain();