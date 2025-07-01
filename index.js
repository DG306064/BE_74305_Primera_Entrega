const express = require('express')
const APP = express()
const PORT = 8080
const productsManager = require('productsMaganer.js')
const cartsManager = require('cartsManager.js')

const products = new Product

//Products management routes

APP.get('/api/products', (req, res) =>{
    
    res.status(200)
})








APP.listen(PORT, () => {
    console.log('Escuchando el puerto 8080')
})