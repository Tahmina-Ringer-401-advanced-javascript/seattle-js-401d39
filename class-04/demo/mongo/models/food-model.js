'use strict';

const mongoose = require('mongoose');

// 1. make a schema
const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  calories: {type: Number, required: true},
  type: { type: String, uppercase: true, enum: ['FRUIT', 'VEGETABLE', 'PROTEIN', 'CARB', 'SWEEET']}
});

// 2. export this schema as a model
const foodModel = mongoose.model('food', foodSchema);

module.exports = foodModel;