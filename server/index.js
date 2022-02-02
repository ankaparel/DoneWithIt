const express = require('express');
const mongoose = require('mongoose');

const { port, localDB, atlasDB  } = require('./config/config');
const items = require('./routes/items');
// const items = require('./data');
const auth = require('./routes/auth');
const verifyToken = require('./routes/verifyToken');

const app = express();

const db = localDB;
// const db = atlasDB;
const connectedOk = `${db === localDB ? 'Local':'Atlas'} server is running on port ${port}`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to express server');
})

app.use('/api/listings', verifyToken, items);
app.use('/api/auth', auth);

mongoose.connect(db)
    .then(result => {
        app.listen(port, () => 
            console.log(connectedOk))
    })
    .catch(err => console.log(err))

app.post('/api/auth', (req, res) => {
    const user = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYW5rYXBhcmVsQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNCJ9.2mPfanfj_CGk1JUcVeFgUn5YpXxXduaXTOGJn7NMgeg'

    res.send(user);
})

