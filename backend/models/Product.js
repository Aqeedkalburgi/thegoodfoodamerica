const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [String],
    nutrition: {
      calories: Number,
      protein: String,
      carbs: String,
      fat: String,
      fiber: String,
      sugar: String,
      servingSize: String,
    },
    brand: {
      type: String,
      required: true,
      default: 'The Good Food America'
    },
    category: {
      type: String,
      required: true,
      default: 'Energy Bars'
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
