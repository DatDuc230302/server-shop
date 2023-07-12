import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from './routers/users.js';
import productsRouter from './routers/products.js';
import cartsRouter from './routers/carts.js';
import ordersRouter from './routers/orders.js';

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

// Router Default
app.get('', (req, res, next) => {
    res.send('This my server');
});

// Routers
app.use('/', usersRouter);
app.use('/', productsRouter);
app.use('/', cartsRouter);
app.use('/', ordersRouter);

// Test

app.get('/test', (req, res) => {
    res.send('Test');
});

//Connect To Database
const URI = 'mongodb+srv://admin:datyeudat2303@shopdb.psaacia.mongodb.net/ShopDB';
mongoose
    .connect(URI)
    .then(() => {
        console.log('Success connect to DB');
        app.listen(PORT, () => console.log('App started at PORT: ', PORT));
    })
    .catch(() => {
        console.log('Failure connect to DB');
    });
