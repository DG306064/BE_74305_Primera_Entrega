const fs = require('fs').promises
const filePath = './products.json'

class ProductManager{
    constructor(){
        this.filePath = filePath
        this.products = []
    }

    async getProducts(){
        const productsJson = await fs.readFile(filePath,'utf-8')
        const productsArray = JSON.parse(productsJson)
        return productsArray 
    }
}