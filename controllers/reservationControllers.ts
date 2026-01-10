import { Request, Response } from "express";
import reservationModels from "../models/reservationModels";

// ================= CREATE RESERVATION =================
export const createReservation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, phone, date, time, guests } = req.body;

    // ✅ Validate all fields
    if (!name || !email || !phone || !date || !time || !guests) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    const newReservation = new reservationModels({
      name,
      email,
      phone,
      date,
      time,
      guests,
    });

    await newReservation.save();

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      reservation: newReservation,
    });
  } catch (error) {
    console.error(error);

    // ✅ Type-safe error handling
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to create reservation",
    });
  }
};


// ================= GET ALL RESERVATIONS =================
export const getAllReservation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reservations = await reservationModels.find({});

    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch reservations",
    });
  }
};

// ================= DELETE RESERVATION =================
export const deleteReservation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await reservationModels.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete reservation",
    });
  }
};
