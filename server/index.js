const express = require('express');
const mongoose = require('mongoose');

const items = require('./routes/items');
// const items = require('./data');

const app = express();

let localDB, atlasDB;
localDB = 'mongodb://localhost:27017/donewithit?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
// atlasDB = 'mongodb+srv://dwi_master:nWCizgbpaXoIxTSQ@cluster0.swybl.mongodb.net/dwi_db?retryWrites=true&w=majority';

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to express server');
})

app.use('/api/listings', items);

require('dotenv').config();

const port = process.env.PORT || 3000;

mongoose.connect(localDB ? localDB : atlasDB)
    .then(result => {
        app.listen(port, () => 
            console.log(`${localDB ? 'Local':'Atlas'} server is running on port ${port}`))
    })
    .catch(err => console.log(err))

app.post('/api/auth', (req, res) => {
    const user = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYW5rYXBhcmVsQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNCJ9.2mPfanfj_CGk1JUcVeFgUn5YpXxXduaXTOGJn7NMgeg'

    res.send(user);
})

