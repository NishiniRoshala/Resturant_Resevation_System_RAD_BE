import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Number, required: true },
});

const productModel =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);

export default productModel;
