const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  console.log(req.body);
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/:title", async (req, res) => {
//   const { title } = req.params;
//   console.log(title, "from my");
//   try {
//     // Use regex to search for products with titles containing the specified string (case-insensitive)
//     const products = await Product.find({
//       title: { $regex: new RegExp(title, "i") },
//     });

//     if (products.length === 0) {
//       return res.status(404).json({ message: "No products found" });
//     }

//     // If products found, return them
//     res.status(200).json(products);
//   } catch (error) {
//     // Handle errors
//     console.error("Error getting products:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.get("/hi", async (req, res, next) => {
  const { title, categories } = req.query;
  console.log(title, "from my", categories);

  try {
    let query = {};
    if (title) {
      query.title = { $regex: new RegExp(title, "i") };
    }

    if (categories) {
      query.categories = { $regex: new RegExp(categories, "i") };
    }

    console.log(query);

    const products = await Product.find(query);

    if (products.length === 0) {
      return res.status(200).json(products);
    }

    res.status(200).json(products);
  } catch (error) {
    // Handle errors
    console.error("Error getting products:", error);
    res.status(500).json({ message: "Server error" });
  }
  next();
});
module.exports = router;
