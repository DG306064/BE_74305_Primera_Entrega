const ProductsManager = require('./productsManager.js')
const CartsManager = require('./cartsManager.js')
const express = require('express')
const APP = express()
const PORT = 8080
const productsManager = new ProductsManager()
const cartsManager = new CartsManager()

//Middleware JSON

APP.use(express.json())

//Products management routes

APP.get('/api/products', async (req, res) =>{
    const products = await productsManager.getProducts()
    res.status(200).json(products);
})

APP.get('/api/products/:id', async (req, res) =>{
    const id = parseInt(req.params.id)
    const product = await productsManager.getProductById(id)
    res.status(201).json(product)
})

APP.post('/api/products', async (req, res) =>{
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    
    if(typeof title !== 'string' || title.trim().length === 0 ){
        res.status(404).json("El titulo no es valido")
    }

    if(typeof description !== 'string' || description.trim().length === 0 ){
        res.status(404).json("La descripcion no es valida")
    }
    
    if(typeof code !== 'string' || code.trim().length === 0 ){
        res.status(404).json("El codigo no es valido")
    }

    if(typeof price !== 'number' || price <= 0){
        res.status(404).json("El precio debe ser mayor a 0")
    }

    if(typeof status !== 'boolean'){
        res.status(404).json("El status debe ser verdadero o falso")
    }

    if(typeof stock !== 'number' || stock < 0){
        res.status(404).json("El precio debe ser mayor o igual a 0")
    }

    if(typeof category !== 'string' || category.trim().length === 0 ){
        res.status(404).json("La categoria no es valida")
    }

    if(typeof thumbnails !== 'string' || thumbnails.trim().length === 0 ){
        res.status(404).json("La categoria no es valida")
    }

    const newProduct = {
        title: title,
        description: description,
        code: code,
        price: price,
        status: status,
        stock: stock,
        category: category,
        thumbnails: thumbnails
    }

    productsManager.addProduct(newProduct)

    res.status(201).json("Producto agregado correctamente")

})

APP.put('/api/products/:id', async (req, res) => {
    const pid = parseInt(req.params.id)
    const productData = req.body;
    const updatedProduct = await productsManager.updateProduct(pid, productData);
    return res.status(200).json(updatedProduct);
})

APP.delete('/api/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await productsManager.deleteProduct(id)
    return res.status(204)
})

//Carts management routes

APP.get('/api/carts/:cid', async (req, res) =>{
    const cid = parseInt(req.params.cid)
    const cart = await cartsManager.getCartById(cid)
    res.status(200).json(cart)
})

APP.post('/api/carts', async (req, res) =>{
    
    const cartProducts = req.body.products
    console.log(cartProducts)

    if(Array.isArray(cartProducts) && cartProducts.length > 0){
        const products = await productsManager.getProducts()
        cartProducts.forEach(cartProduct => {
            console.log(cartProduct)
            
            if(typeof cartProduct.id !== 'number' || typeof cartProduct.quantity !== 'number'){
                return res.status(404).json('El id y la cantidad de cada productos deben ser un numero')
            }

            if(!products.some(p => p.id === cartProduct.id)){
                return res.status(404).json('Alguno de los productos tiene un id que no existe')
            }

            if(cartProduct.quantity <= 0){
                return res.status(404).json('Las cantidades no pueden ser menores o iguales a 0')
            }
        });
            
    }else{
        return res.status(404).json('Products no es un Array o esta vacio')
    }
    
    cartsManager.addCart(cartProducts)

    res.status(201).json("Carrito agregado correctamente")

})

APP.post('/api/carts/:cid/product/:pid', async (req, res) =>{
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const {quantity} = req.body

    if(typeof quantity === 'number' && quantity > 0){
        const cart = await cartsManager.addProductToCart(cid, pid, quantity)
        return res.status(200).json(cart)
    }else{
        return res.status(404).json("Ocurrio un error")
    }
    
    

})



APP.listen(PORT, () => {
    console.log('Escuchando el puerto 8080')
})