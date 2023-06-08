const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/health', (req, res) => {
    return res.send('healthy');
});

app.listen(PORT, () => {
    console.log(`Servidor levantado correctamente en el puerto ${PORT}`)
})