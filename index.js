const express = require('express');

const app = express();

const PORT = 3000;

const db = require('./db');

app.use(express.json());

app.get('/health', (req, res) => {
    return res.send('healthy');
});


db.then(() => {
        app.listen(PORT, () => {
            console.log(`Server up and running on the port ${PORT}`)
        })
    }
)
.catch((error) => {
    console.error('Error starting server', error.message)
})


