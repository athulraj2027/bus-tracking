"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ------------------ DUMMY DATA ------------------ */

const bus = {
  number: "KL-07-1234",
};

const route = {
  name: "City Loop",
  stops: [
    { name: "City Center" },
    { name: "Bus Stand" },
    { name: "Railway Station" },
    { name: "Airport" },
  ],
};

const MainPage = () => {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="min-h-screen mt-10 bg-background px-6 py-10">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Driver Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your assigned bus and trip
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {/* LEFT SIDEBAR */}
        <div className="space-y-6">
          {/* BUS CARD */}
          <Card className="border border-border shadow-sm">
            <CardContent className="p-5 space-y-3">
              <h3 className="text-sm text-muted-foreground">Assigned Bus</h3>

              <p className="text-lg font-medium">{bus.number}</p>

              <Badge variant={isRunning ? "default" : "secondary"}>
                {isRunning ? "RUNNING" : "STOPPED"}
              </Badge>
            </CardContent>
          </Card>

          {/* CONTROLS */}
          <Card className="border border-border shadow-sm">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm text-muted-foreground">Trip Controls</h3>

              {!isRunning ? (
                <Button className="w-full" onClick={() => setIsRunning(true)}>
                  Start Trip
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setIsRunning(false)}
                >
                  Stop Trip
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-2 space-y-6">
          {/* MAP */}
          <Card className="border border-border shadow-sm">
            <CardContent className="p-0">
              <div className="h-87.5 flex items-center justify-center text-sm text-muted-foreground">
                Map will appear here (Leaflet / Google Maps)
              </div>
            </CardContent>
          </Card>

          {/* ROUTE */}
          <Card className="border border-border shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold tracking-tight mb-4">
                {route.name}
              </h3>

              <div className="space-y-4">
                {route.stops.map((stop, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 bg-primary rounded-full mt-1" />
                      {index !== route.stops.length - 1 && (
                        <div className="w-px h-6 bg-border mt-1" />
                      )}
                    </div>

                    <p className="text-sm">{stop.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
