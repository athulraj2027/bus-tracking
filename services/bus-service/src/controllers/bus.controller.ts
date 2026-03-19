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

    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const alreadyAssignedBus = await Bus.findOne({ driverId });
    if (alreadyAssignedBus) {
      alreadyAssignedBus.driverId = null;
      await alreadyAssignedBus.save();
    }

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

const getAssignedBus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;

    const assignedBus = await Bus.findOne({ driverId: userId });

    if (!assignedBus) {
      return res.status(404).json({
        success: false,
        message: "No bus assigned to this driver",
      });
    }

    return res.status(200).json({
      success: true,
      data: assignedBus,
    });
  } catch (error) {
    next(error);
  }
};

const startJourney = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { busId } = req.params;
    const { userId } = req.user;

    // 1. Find bus
    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    // 2. Check if this driver owns the bus
    if (!bus.driverId || bus.driverId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not assigned to this bus",
      });
    }

    // 3. Check if already active
    if (bus.status === "ACTIVE") {
      return res.status(400).json({
        success: false,
        message: "Journey already started",
      });
    }

    // 4. Update status
    bus.status = "ACTIVE";
    await bus.save();

    return res.status(200).json({
      success: true,
      message: "Journey started successfully",
      data: bus,
    });
  } catch (error) {
    next(error);
  }
};

const markInactive = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { busId } = req.params;
    const { userId } = req.user;

    // 1. Find bus
    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    // 2. Check if this driver owns the bus
    if (!bus.driverId || bus.driverId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not assigned to this bus",
      });
    }

    // 3. Check if already active
    if (bus.status === "INACTIVE") {
      return res.status(400).json({
        success: false,
        message: "Journey not active",
      });
    }

    // 4. Update status
    bus.status = "INACTIVE";
    await bus.save();

    return res.status(200).json({
      success: true,
      message: "Journey made inactive successfully",
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
  getAssignedBus,
  startJourney,
  markInactive,
};
