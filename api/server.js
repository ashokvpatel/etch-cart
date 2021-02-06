'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require("multer");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let data = {};
try {
  data = JSON.parse(fs.readFileSync('data.json'));
} catch (err) {
  data = { products: [] };
}

app.get('/api/products', (req, res) => {
  return res.json(data.products);
});

app.post('/api/cartproducts', (req, res) => {
  let products = [], id = null;
  let cart = JSON.parse(req.body.cart);
  if (!cart) return res.json(products)
  for (var i = 0; i < data.products.length; i++) {
    id = data.products[i].id.toString();
    if (cart.hasOwnProperty(id)) {
      data.products[i].qty = cart[id]
      products.push(data.products[i]);
    }
  }
  return res.json(products);
});

app.post('/api/product', (req, res) => {
  if (req.body.name && req.body.price && req.body.image) {
    if (data.products.find(product => product.name.toLowerCase() === req.body.name.toLowerCase()))
      res.status(403).send("Duplicate Product Details!!!");
    else {
      req.body.id = data.products.length + 1;
      data.products.push(req.body);
      fs.writeFileSync('data.json', JSON.stringify(data));
      return res.json(data.products);
    }
  }
  else {
    res.status(400).send("Invalid Product Details!!!")
  }
});


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg")
  }
})

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {

    // Set the filetypes, it is optional 
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(
      file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("Error: File upload only supports the " + "following filetypes - " + filetypes);
  }

}).single("productImage");

app.post("/api/uploadfile", function (req, res, next) {

  upload(req, res, function (err) {

    if (err) {
      res.send(err)
    }
    else {
      res.send({ message: "Success, Image uploaded!", filename: res.req.file.filename })
    }
  })
})

const PORT = 5000;

app.listen(PORT);
console.log('api runnging on port ' + PORT);