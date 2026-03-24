"use client";
import React from "react";

const mockRoute = {
  name: "Calicut → Kochi Express",
  stops: [
    { name: "Calicut Beach", order: 1 },
    { name: "Malappuram", order: 2 },
    { name: "Thrissur", order: 3 },
    { name: "Kochi", order: 4 },
  ],
};

export default function ViewRoutePage() {
  const route = mockRoute; // replace with API later

  if (!route) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex justify-center py-10 px-3">
      <div className="w-full max-w-xl">
        {/* Header */}
        <h1 className="text-xl font-semibold text-primary">{route.name}</h1>
        <p className="text-xs text-gray-500 mt-1 mb-6">Route overview</p>

        {/* Stops List */}
        <div className="space-y-2">
          {route.stops
            .sort((a, b) => a.order - b.order)
            .map((stop, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border border-gray-200 bg-white rounded-md px-3 py-2"
              >
                {/* Number */}
                <div className="text-xs text-gray-400 w-5">{index + 1}</div>

                {/* Line connector */}
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {index !== route.stops.length - 1 && (
                    <div className="w-px h-6 bg-gray-300" />
                  )}
                </div>

                {/* Stop Name */}
                <div className="text-sm text-primary">{stop.name}</div>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="mt-6 text-xs text-gray-400">
          {route.stops.length} stops
        </div>
      </div>
    </div>
  );
}
