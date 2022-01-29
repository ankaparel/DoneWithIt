const express = require('express');
const dbitems = require('./data.js');

const app = express();

app.use(express.json());

require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Welcome to express server');
})

app.get('/api/listings', (req, res) => {
    res.send(dbitems);
})

app.post('/api/auth', (req, res) => {
    const user = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYW5rYXBhcmVsQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNCJ9.2mPfanfj_CGk1JUcVeFgUn5YpXxXduaXTOGJn7NMgeg'

    res.send(user);
})

// app.get('/api/listing/:id', (req, res) => {
//     const home = homes.find(home => home.id === parseInt(req.params.id));

//     if(!home) {
//         res.status(404).send('The home with given ID is not found')
//     }

//     res.send(home);
// })

// app.post('/api/listing', (req, res) => {

//     if(!req.body.type || !req.body.description) {
//         return res.status(400).send('Title and description is required')
//     }

//     const home = {
//         id: homes.length + 1,
//         type: req.body.type,
//         description: req.body.description,
//     }

//     homes.push(home);
//     res.send(home);
// })

// app.put('/api/listing/:id', (req, res) => {
//     const home = homes.find(home => home.id === parseInt(req.params.id));

//     if(!home) {
//         return res.status(404).send('The home with given ID is not found')
//     }

//     home.type = req.body.type;
//     home.description = req.body.description;

//     res.send(home);
    
// })

// app.delete('/api/listing/:id', (req, res) => {
//     const home = homes.find(home => home.id === parseInt(req.params.id));

//     if(!home) {
//         return res.status(404).send('The home with given ID is not found')
//     }

//     const index = homes.indexOf(home);
//     homes.splice(index, 1);
//     res.send(home);
// })

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`))