import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

dotenv.config();
await connectDB();

const seedData = async () => {
  try {
    console.log("Clearing old data...");

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Creating users...");

    // Hash passwords before creating users
    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@mobilestore.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "Test User",
        email: "user@mobilestore.com",
        password: hashedPassword,
        role: "user",
      },
    ]);

    const adminUser = users[0]._id;

    console.log("Creating products...");

    const products = await Product.insertMany([
      {
        name: "iPhone 15",
        brand: "Apple",
        price: 80000,
        stock: 10,
        description: "Latest Apple iPhone 15",
        images: ["https://via.placeholder.com/150"],
        category: "ios",
        user: adminUser,
      },
      {
        name: "Samsung Galaxy S24",
        brand: "Samsung",
        price: 70000,
        stock: 15,
        description: "Latest Samsung flagship phone",
        images: ["https://via.placeholder.com/150"],
        category: "android",
        user: adminUser,
      },
      {
        name: "OnePlus 12",
        brand: "OnePlus",
        price: 60000,
        stock: 20,
        description: "Fast and smooth Android phone",
        images: ["https://via.placeholder.com/150"],
        category: "android",
        user: adminUser,
      },
    ]);

    console.log("Creating sample order...");

    await Order.create({
      user: users[1]._id,
      orderItems: [
        {
          product: products[0]._id,
          name: products[0].name,
          quantity: 1,
          price: products[0].price,
          image: products[0].images[0],
        },
      ],
      shippingAddress: {
        address: "Mumbai Street 1",
        city: "Mumbai",
        postalCode: "400001",
        country: "India",
      },
      paymentMethod: "COD",
      totalPrice: products[0].price,
      isPaid: false,
      isDelivered: false,
    });

    console.log("✅ Data Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeder Error:", error);
    process.exit(1);
  }
};

seedData();