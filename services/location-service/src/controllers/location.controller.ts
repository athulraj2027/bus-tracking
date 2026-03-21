import type { NextFunction, Request, Response } from "express";
import { getLocation, updateLocation } from "../services/redis.services.js";

const getLocationByBusId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { busId, lat, lng } = req.body;

    if (!busId || lat === undefined || lng === undefined) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const data = await updateLocation(busId, lat, lng);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const updateLocationByBusId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { busId } = req.params;
    const data = await getLocation(busId as string);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export default { getLocationByBusId, updateLocationByBusId };
