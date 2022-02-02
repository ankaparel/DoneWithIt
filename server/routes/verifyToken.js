const jwt = require('jsonwebtoken');

const { secretkey  } = require('../config/config');

module.exports = function(req, res, next) {

    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('Access denied');

    // verify the token
    try {
        const verified = jwt.verify(token, secretkey)
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token')
    }
}