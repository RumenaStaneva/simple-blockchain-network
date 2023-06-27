# Simple Blockchain network

## How to start the project :magic_wand

### Use the following commands

- ``` npm run script ``` - to execute the create blockchain with genezis block and 2 other blocks, list all blocks, validate the whole chain, validate current block and validate penultimate block.

- ``` npm run server ``` - to start the server. On <http://localhost:3000/> you can click on `View All Blocks` to see all the blocks, or paste a specific hash inside the input and see it's block.

In .env.example you need to paste your uri to connect to the DataBase. I am using MongoDB.

NOTE:
In the task the block needs to have Timestamp, Transactions and Hash, which should be built by the hash of the previous block, the current data (transactions), and the current timestamp. So my blocks have current hash and previous hash. But I noticed that in the screenshot from the task, there is another property called only hash. I wasn't sure if this property is another combination of all the previous properties (timestamp, transaction, currentHash, previousHash, nonce). :thinking: That's why I left my block with only current hash and previous hash, but I can always remake it. :sweat_smile:
