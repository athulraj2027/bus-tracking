import type { Request, Response, NextFunction } from "express";
import Route from "../models/route.model.js";

const createRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, stops } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Route name is required" });
    }

    if (!stops || !Array.isArray(stops) || stops.length === 0) {
      return res.status(400).json({ message: "Stops are required" });
    }

    // sort stops by order (important)
    const sortedStops = stops.sort((a: any, b: any) => a.order - b.order);

    const route = await Route.create({
      name,
      stops: sortedStops,
    });

    res.status(201).json({
      success: true,
      data: route,
    });
  } catch (error) {
    next(error);
  }
};

const getRoutes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const routes = await Route.find();

    res.status(200).json({
      success: true,
      count: routes.length,
      data: routes,
    });
  } catch (error) {
    next(error);
  }
};

const getRouteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const route = await Route.findById(id);

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.status(200).json({
      success: true,
      data: route,
    });
  } catch (error) {
    next(error);
  }
};

export default { createRoute, getRouteById, getRoutes };
