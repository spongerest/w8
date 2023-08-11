"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var products = [
    { id: 1, nama: 'Indomie', hpp: 5000, untung: 20, hargaJual: 6250, stok: 10, kategori: 'Makanan' },
    { id: 2, nama: 'Teh Pucuk', hpp: 3000, untung: 20, hargaJual: 3750, stok: 20, kategori: 'Minuman' },
];
router.get('/products', function (req, res) {
    res.json(products);
});
router.get('/products/:nama', function (req, res) {
    var nama = String(req.params.nama);
    var product = products.find(function (p) { return p.nama === nama; });
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
});
router.post('/products', function (req, res) {
    var newProduk = {
        id: products.length + 1,
        nama: req.body.nama,
        hpp: req.body.hpp,
        untung: req.body.untung,
        hargaJual: (req.body.hpp * 100) / (100 - req.body.untung),
        stok: req.body.stok,
        kategori: req.body.kategori,
    };
    products.push(newProduk);
    res.status(201).json(newProduk);
});
router.put('/products/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var productIndex = products.findIndex(function (p) { return p.id === id; });
    if (productIndex !== -1) {
        var updatedProduct = {
            id: id,
            nama: req.body.name,
            hpp: req.body.price,
            untung: req.body.untung,
            hargaJual: req.body.hargaJual,
            stok: req.body.stok,
            kategori: req.body.kategori,
        };
        products[productIndex] = updatedProduct;
        res.json(updatedProduct);
    }
    else {
        res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
});
// router.patch('/products/:id', (req:Request, res:Response) => {
//     const id = parseInt(req.params.id);
//     const productIndex = products.findIndex((p) => p.id === id);
//     if (productIndex !== -1) {
//         const updatedProduct: Produk = {
//         ...products[productIndex],
//         ...req.body,
//         };
//         products[productIndex] = updatedProduct;
//         res.json(updatedProduct);
//     } else {
//         res.status(404).json({ message: 'Produk tidak ditemukan' });
//     }
//     });  
router.delete('/products/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var productIndex = products.findIndex(function (p) { return p.id === id; });
    if (productIndex !== -1) {
        var deletedProduct = products.splice(productIndex, 1)[0];
        res.json(deletedProduct);
    }
    else {
        res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
});
exports.default = router;
