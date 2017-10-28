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
        return new Block({
            text: 'Hello world'
        }, null)
    }

    getBlocks() {
        let blocks = this.chain

        blocks.forEach(block => {
            block.hash = block.calculateHash()
        })

        return blocks
    }
}

let chain = new Chain()

const express = require('express')

const app = express()

app.get('/blocks', (request, response) => {
    response.json(chain.getBlocks())
})

app.listen(3000)
