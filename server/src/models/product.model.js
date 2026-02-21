import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    stock: { type: Number, required: true },
    description: { type: String },
    images: [{ type: String }],
    category: {
      type: String,
      enum: ["android", "ios"],
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
}
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);