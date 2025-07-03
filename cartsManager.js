const filePath = './carts.json'
const fs = require('fs').promises

class CartsManager{
    constructor(){
        this.filePath = filePath
        this.carts = []
    }
    
    async readFile(path){
        return await fs.readFile(path,'utf-8')
    }

    async writeFile(path, array){
        return await fs.writeFile(path, JSON.stringify(array, null, 2))
    }

    async getCartById(cid){
        const cartsJson = await this.readFile(filePath)
        const carts = JSON.parse(cartsJson)
        const cart = carts.find(c => c.id === cid)
        return cart
    }

    async addCart(cartProducts){
        const cartsJson = await this.readFile(filePath)
        const carts = JSON.parse(cartsJson)
        const newId = carts.length ? carts[carts.length - 1].id + 1 : 1
        const newCart = {
            id: newId,
            products: cartProducts
        }
        
        carts.push(newCart)
        this.writeFile(filePath, carts)
    }

}

module.exports = CartsManager