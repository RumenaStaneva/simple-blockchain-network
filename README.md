# Simple Blockchain network

## How to start the project :crystal_ball

### Use the following commands

- ``` npm run script ``` - to execute the create blockchain with genezis block and 2 other blocks, list all blocks, validate the whole chain, validate current block and validate penultimate block.

- ``` npm run server ``` - to start the server. On <http://localhost:3000/> you can click on `View All Blocks` to see all the blocks, or paste a specific hash inside the input and see it's block.

In .env.example you need to paste your uri to connect to the DataBase. I am using MongoDB.

### NOTES

- In the task the block needs to have Timestamp, Transactions and Hash, which should be built by the hash of the previous block, the current data (transactions), and the current timestamp. So my blocks have current hash and previous hash. But I noticed that in the screenshot from the task, there is another property called only hash. I wasn't sure if this property is another combination of all the previous properties (timestamp, transaction, currentHash, previousHash, nonce). :thinking: That's why I left my block with only current hash and previous hash, but I can always remake it. :blush:

- I also did not understood what you mean by "Your schema should support transactions" soo I just left it like this. :sweat_smile: By transactions do you mean database transactions - saving all blocks at one time and if one of them failes to save, none of them are saved at the end? Currently I am saving block every time one of these methods - createGenesisBlock or createBlock is being called and there si no need to use database transactions. If I need to use database transactions maybe I should refactor the code and to save all blocks with a method saveBlockchain for example. Let me know if I also need to refactor this. :blush:
