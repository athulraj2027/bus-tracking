import type { Request, Response, NextFunction } from "express";
import Bus from "../models/bus.models.js";

export const createBus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { number, driverId, routeId } = req.body;

    if (!number)
      return res.status(400).json({ message: "Bus number is required" });

    const existingBus = await Bus.findOne({ number });

    if (existingBus)
      return res.status(400).json({ message: "Bus already exists" });

    const bus = await Bus.create({
      number,
      driverId,
      routeId,
    });

    res.status(201).json({
      success: true,
      data: bus,
    });
  } catch (error) {
    next(error);
  }
};

export const getBuses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const buses = await Bus.find();

    res.status(200).json({
      success: true,
      count: buses.length,
      data: buses,
    });
  } catch (error) {
    next(error);
  }
};

export const getBus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const bus = await Bus.findById(id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json({
      success: true,
      data: bus,
    });
  } catch (error) {
    next(error);
  }
};

export const editBus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const bus = await Bus.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json({
      success: true,
      data: bus,
    });
  } catch (error) {
    next(error);
  }
};

const assignDriver = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { busId } = req.params;
    const { driverId } = req.body;

    if (!driverId) {
      return res.status(400).json({ message: "driverId is required" });
    }

    // OPTIONAL (recommended): ensure bus exists
    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // assign driver
    bus.driverId = driverId;
    await bus.save();

    res.status(200).json({
      success: true,
      data: bus,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createBus,
  getBus,
  editBus,
  getBuses,
  assignDriver,
};
