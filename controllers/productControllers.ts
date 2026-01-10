import { Request, Response } from "express";
import productModel from "../models/productModels";
// import cloudinary from "../config/cloudinary";
import {v2 as cloudinary} from "cloudinary"

/* ================= ADD PRODUCT ================= */
export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, description, category } = req.body;

    let imageUrl: string;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    } else {
      imageUrl = "https://via.placeholder.com/150";
    }

    const product = new productModel({
      name,
      description,
      category,
      price: Number(price),
      image: imageUrl,
      date: Date.now(),
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Cannot add product",
    });
  }
};


/* ================= LIST PRODUCTS ================= */
export const listProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productModel.find({});

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

/* ================= REMOVE PRODUCT ================= */

export const removeProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await productModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product removed",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to remove product",
    });
  }
};


/* ================= SINGLE PRODUCT ================= */
export const singleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
