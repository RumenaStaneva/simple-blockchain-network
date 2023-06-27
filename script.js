const { Blockchain } = require('./Blockchain');

async function init() {
    const blocky = new Blockchain();

    await blocky.createGenesisBlock(Date.now(), [{ "from": "me" }, { "to": "LimeChain" }]);
    await blocky.createBlock(Date.now(), [{ "name": "Rumba" }, { "surname": "Pumba" }]);
    await blocky.createBlock(Date.now(), [{ "greeting": "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" }]);

    blocky.listAllBlocks();
    blocky.validateChain();
    blocky.validateCurrentBlock();
    blocky.validatePenultimateBlock();
}

init();