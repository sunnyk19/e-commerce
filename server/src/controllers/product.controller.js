import Product from "../models/product.model.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  res.json(product);
};

// CREATE PRODUCT (Admin)
export const createProduct = async (req, res) => {
  const product = await Product.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(product);
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  Object.assign(product, req.body);
  await product.save();

  res.json(product);
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  await product.deleteOne();

  res.json({ message: "Product deleted" });
};