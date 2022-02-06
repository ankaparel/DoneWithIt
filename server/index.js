const express = require('express');
const mongoose = require('mongoose');

const { port, localDB, atlasDB, dbUser, dbPwd, dbName } = require('./config/config');
const items = require('./routes/items');
// const items = require('./data');
const auth = require('./routes/auth');
const verifyToken = require('./routes/verifyToken');

const app = express();

const db = localDB;
// const db = atlasDB;

const targetDB = db
    .replace('<user>', `${dbUser}`)
    .replace('<pwd>', `${dbPwd}`)
    .replace('<db>', `${dbName}`);
// console.log('targetDB => ' + targetDB)

const connectedOk = `${targetDB === localDB ? 'Local':'Atlas'} server is running on port ${port}`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to express server');
})
app.use('/api/listings', verifyToken, items);
app.use('/api/auth', auth);

mongoose.connect(targetDB)
    .then(result => {
        app.listen(port, () => console.log(connectedOk))
    })
    .catch(err => console.log(err))


