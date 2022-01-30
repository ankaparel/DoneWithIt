const express = require('express');
const { check, validationResult } = require('express-validator');

const Item = require('../models/Item');
const response = require('../utility/response');

const router = express.Router();

const validate = [
    check('title')
        .isLength({min: 10})
        .withMessage('Title should have more than 10 characters'),
    check('price')
        .isNumeric()
        .withMessage('Price should be a number')
]

//  (GET) /api/listings
router.get('/', (req, res) => {
    Item.find()
        .then(items => {
            res.send( items ) // response('Ok', items) )
        })
        .catch(err => res.send( response('Error', err) )
        )
        
});

//  (GET) /api/listings/:1
router.get('/:id', (req, res) => {
    const itemId = req.params.id

    // προσοχή να μην χρησιμοποιηθεί 
    // πεδίο κλειδί με όνομα id

    Item.findOne({'key': parseInt(itemId)})
        .then(item => {
            if (!item) {
                res.status(404).send( response('Item not found' ) )
            } else 
                res.send( item )   // response('Ok', item) )
        })
        .catch(err => res.send( response('Error', err) )
        )

    // Item.findOne({'key': parseInt(itemId)}, (err, data) => {
    //     if (err) {
    //         res.send( response('Error', err) )
    //     }
    //     else if (!data) {
    //         res.status(404).send( response('Item not found') )
    //     } else 
    //         res.send( response('Ok', data) )
    // })
            
});

//  (PUT) /api/listings/:1
router.put('/:id', validate, (req, res) => {
    const itemId = req.params.id

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(
            response( 'Error', {errors: errors.array()} )
            )
    }

    Item.findOne({'key': parseInt(itemId)})
        .then(item => {
            if (!item) {
                res.status(404).send('Item not found')
            } else {
                item.title = req.body.title;
                item.key = req.body.key;
                item.title = req.body.title;
                item.price = req.body.price;
                item.images = req.body.images;
                item.categoryId = req.body.categoryId;
                item.description = req.body.description;

                return item.save();
            }
        })
        .then(result =>
            res.send( result )   //response('Item updated successfully', result) )
        )
        .catch(err => res.send( response('Error', err) )
        )
        
});

//  (DELETE) /api/listings/:1
router.delete('/:id', (req, res) => {
    const itemId = req.params.id

    Item.findOneAndDelete({'key': parseInt(itemId)})
        .then(item => {
            if (!item) {
                res.status(404).send('Item not found')
            } else {
                return res.send( item )  //response('Item deleted successfully', item) )
            }
        })
        .catch(err => res.send( response('Error', err) )
        )
        
});

//  (POST) /api/listings
router.post('/', validate, (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(
            response( 'Error', {errors: errors.array()} )
            )
    }

    const itemData = new Item({
        key: req.body.key,
        title: req.body.title,
        price: req.body.price,
        images: req.body.images,
        categoryId: req.body.categoryId,
        description: req.body.description
    });

    itemData.save()
        .then(result => {
            res.send( result )   //response( 'New item created succesfully', result ) )
        })
        .catch(err => res.send( response('Error', err) ))
});

module.exports = router;