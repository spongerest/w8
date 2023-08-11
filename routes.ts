import * as express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

interface Produk {
id: number;
nama: string;
hpp: number;
untung:number;
hargaJual:number;
stok:number;
kategori:string;
}

let products: Produk[] = [
    { id: 1, nama: 'Indomie',hpp : 5000,untung:20,hargaJual:6250,stok:10,kategori:'Makanan'},
    { id: 2, nama: 'Teh Pucuk',hpp : 3000,untung:20,hargaJual:3750,stok:20,kategori:'Minuman' },
    ];

router.get('/products', (req:Request, res:Response) => {
        res.json(products);
});

router.get('/products/:nama', (req:Request, res:Response) => {
    const nama = String(req.params.nama);
    const product = products.find((p) => p.nama === nama);
    if (product) {
    res.json(product);
    } else {
    res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
});

router.post('/products', (req:Request, res:Response) => {
    const newProduk: Produk = {
    id: products.length + 1,
    nama: req.body.nama,
    hpp: req.body.hpp,
    untung: req.body.untung,
    hargaJual: (req.body.hpp*100)/(100-req.body.untung),
    stok:req.body.stok,
    kategori:req.body.kategori,
    };
    
    products.push(newProduk);
    res.status(201).json(newProduk);
});

router.put('/products/:id', (req:Request, res:Response) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
    const updatedProduct: Produk = {
        id,
        nama: req.body.name,
        hpp: req.body.price,
        untung: req.body.untung,
        hargaJual:req.body.hargaJual,
        stok:req.body.stok,
        kategori:req.body.kategori,
    };
    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
    } else {
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

router.delete('/products/:id', (req:Request, res:Response) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1)[0];
    res.json(deletedProduct);
    } else {
    res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
});





export default router;
