const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const sizeOf = require('image-size');
const router = express.Router();
const productSchema = require("../schemas/productsSchema");
const Product = new mongoose.model("Product", productSchema);


//multer middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


//img spec
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500000, // limit the file size to 500KB
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, and PNG file types are allowed'));
    }
  },
});



/// define a route for uploading a product image
router.post('/upload', upload.single('img'), (req, res, next) => {
  try {
    // encode the image file as a base64 string
    const img = fs.readFileSync(req.file.path, { encoding: 'base64' });
    // delete the uploaded image file from the server
    fs.unlinkSync(req.file.path);
    // create a new product document
    const product = new Product({
      name: req.body.name,
      company: req.body.company,
      quantity: req.body.quantity,
      img: img,
    });
    // save the product document to the database
    product.save()
      .then(() => {
        res.status(200).json({
          message: 'Product image uploaded successfully',
          product: product,
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});


// define a route for getting a product image
router.get('/products/:id/img', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }
      // send the product image as a response
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(Buffer.from(product.img, 'base64'));
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
  })


//get all the products
//find({supports query like active: "active"})
//.limit(n) n= # selects n amount of data
router.get("/", async (req, res) => {
  try {
    //selects with Date field, select take 0=false, 1=true
    const result = await Product.find({});
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
})

//returns all matches with query search
router.get("/search", async (req, res) => {
  try {
    const query = req.body.search;
    const regex = new RegExp(query, "i");
    const result = await Product.find({ name: regex });
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});

//get a single product
router.get("/:id", async (req, res) => {
  try {
    const result = await Product.find({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    console.error(error.message);
  }
});

//post product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
  } catch (error) {
    console.log(error.message);
  }
});

//post multiple product
router.post("/all", async (req, res) => {
  try {
    const result = await Product.insertMany(req.body);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
});

//put product
//updateOne works similar way with the third parameter
router.put("/:id", async (req, res) => {
  const updatedData = req.body;

  try {
    const result = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: updatedData,
      },
      {
        //third parameter
        new: true,
        useFindAndModify: false,
      }
    );
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
});

//delete product
router.delete("/:id", async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
});

//deleteMany by id
router.delete("/", async (req, res) => {
  try {
    const idsToDelete = req.body.ids;
    const result = await Product.deleteMany({ _id: { $in: idsToDelete } });
    console.log(result)
    res.send(result);
  } 
  catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
