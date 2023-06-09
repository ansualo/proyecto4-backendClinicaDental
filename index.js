const express = require('express');

const app = express();

const PORT = 3000;

const db = require('./db');

const router = require('./router');

const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use(router);



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


