const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productosRouter = require('./routes/productos.routes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/productos', productosRouter);

app.get('/', (req, res) => {
    res.send('Hola desde mi servidor 🚀');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
