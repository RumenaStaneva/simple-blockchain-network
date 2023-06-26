const { Blockchain } = require('./Blockchain');

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