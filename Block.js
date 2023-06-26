var crypto = require('crypto');
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

module.exports = { Block };