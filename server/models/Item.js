const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    _id : {id:false},
    url: {type: String},
    thumbnailUrl: {type: String}
})

const ItemSchema = new mongoose.Schema({
    key: {type: Number, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    images: [ImageSchema],
    categoryId: {type: Number, required: true},
    description: {type: String}
});

// ===========================================
// if you want to export all defined schemas
// ===========================================
// const imageModel = mongoose.model('Image', ImageSchema);
// const itemModel = mongoose.model('Item', ItemSchema, 'items');

// module.exports = {
//     Image: imageModel,
//     Item: itemModel
// }

module.exports = mongoose.model('Item', ItemSchema, 'items');
