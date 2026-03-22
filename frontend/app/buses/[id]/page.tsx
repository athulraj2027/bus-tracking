"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ------------------ DUMMY DATA ------------------ */

const bus = {
  number: "KL-07-1234",
  status: "ACTIVE",
  driverId: "d1",
};

const route = {
  name: "City Loop",
  stops: [
    { name: "City Center" },
    { name: "Bus Stand" },
    { name: "Railway Station" },
  ],
};

/* ------------------ PAGE ------------------ */

export default function BusPage() {
  return (
    <div className="min-h-screen mt-10 bg-background px-6 py-10">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {bus.number}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{route.name}</p>
        </div>

        <Badge variant={bus.status === "ACTIVE" ? "default" : "secondary"}>
          {bus.status}
        </Badge>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {/* MAP */}
        <div className="md:col-span-2">
          <Card className="border border-border shadow-sm">
            <CardContent className="p-0">
              {/* Map Placeholder */}
              <div className="h-100 flex items-center justify-center text-sm text-muted-foreground">
                Map will appear here (Leaflet / Google Maps)
              </div>
            </CardContent>
          </Card>
        </div>

        {/* DETAILS */}
        <div className="space-y-6">
          {/* Bus Info */}
          <Card className="border border-border shadow-sm">
            <CardContent className="p-5 space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                Bus Info
              </h3>

              <p className="text-sm">
                <span className="text-muted-foreground">Number:</span>{" "}
                {bus.number}
              </p>

              <p className="text-sm">
                <span className="text-muted-foreground">Driver ID:</span>{" "}
                {bus.driverId || "Not assigned"}
              </p>

              <p className="text-sm">
                <span className="text-muted-foreground">Status:</span>{" "}
                {bus.status}
              </p>
            </CardContent>
          </Card>

          {/* Route */}
          <Card className="border border-border shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Route Stops
              </h3>

              <div className="space-y-3">
                {route.stops.map((stop, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {/* Dot */}
                    <div className="w-2 h-2 bg-primary rounded-full" />

                    {/* Line */}
                    <p className="text-sm">{stop.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action */}
          <Button className="w-full">Track Live</Button>
          <Button className="w-full">Mark as waiting</Button>
        </div>
      </div>
    </div>
  );
}
