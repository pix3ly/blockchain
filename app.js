const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(data, previousHash) {
        this.data = data

        this.previousHash = previousHash
    }

    calculateHash() {
        return SHA256(this.previousHash + JSON.stringify(this.data)).toString()
    }
}

class Chain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        return new Block(null, {
            text: 'Hello world'
        })
    }

    debug() {
        let hashes = []

        this.chain.forEach(block => {
            hashes.push(block.calculateHash())
        })

        console.log(hashes)
    }
}

let chain = new Chain()

chain.debug()
