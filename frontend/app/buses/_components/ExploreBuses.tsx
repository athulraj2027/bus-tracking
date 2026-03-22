"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

/* ------------------ DUMMY DATA ------------------ */

// Routes (based on your schema)
const routes = [
  {
    _id: "r1",
    name: "City Loop",
    stops: [
      { name: "City Center", order: 1 },
      { name: "Bus Stand", order: 2 },
      { name: "Railway Station", order: 3 },
    ],
  },
  {
    _id: "r2",
    name: "Airport Express",
    stops: [
      { name: "Main Market", order: 1 },
      { name: "Tech Park", order: 2 },
      { name: "Airport", order: 3 },
    ],
  },
];

// Buses (based on your schema)
const buses = [
  {
    _id: "b1",
    number: "KL-07-1234",
    driverId: "d1",
    routeId: "r1",
    status: "ACTIVE",
  },
  {
    _id: "b2",
    number: "KL-07-5678",
    driverId: "d2",
    routeId: "r2",
    status: "ACTIVE",
  },
  {
    _id: "b3",
    number: "KL-07-9999",
    driverId: null,
    routeId: "r1",
    status: "INACTIVE",
  },
];

/* ------------------ PAGE ------------------ */

export default function ExploreBuses() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Filter buses based on route stops
  const filteredBuses = buses.filter((bus) => {
    const route = routes.find((r) => r._id === bus.routeId);
    if (!route) return false;

    const stopNames = route.stops.map((s) => s.name.toLowerCase());

    return (
      (!from || stopNames.includes(from.toLowerCase())) &&
      (!to || stopNames.includes(to.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-background ">
      {/* SEARCH */}
      <SearchWrapper setFrom={setFrom} setTo={setTo} />

      {/* RESULTS */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h3 className="text-lg font-semibold tracking-tight mb-6">
          Available buses
        </h3>

        <div className="space-y-4">
          {filteredBuses.length > 0 ? (
            filteredBuses.map((bus) => {
              const route = routes.find((r) => r._id === bus.routeId);

              return (
                <Card key={bus._id} className="border border-border shadow-sm">
                  <CardContent className="p-5 flex justify-between items-center">
                    {/* Left */}
                    <div>
                      <p className="text-base font-medium">{bus.number}</p>

                      <p className="text-sm text-muted-foreground mt-1">
                        {route?.name}
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        {route?.stops.map((s) => s.name).join(" → ")}
                      </p>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          bus.status === "ACTIVE" ? "default" : "secondary"
                        }
                      >
                        {bus.status}
                      </Badge>
                      <Link href={`/buses/${bus._id}`}>
                        <Button size="sm">View</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">
              No buses found for selected route
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

/* ------------------ SEARCH WRAPPER ------------------ */
/* connects your existing Search UI with state */

const SearchWrapper = ({ setFrom, setTo }) => {
  const [localFrom, setLocalFrom] = useState("");
  const [localTo, setLocalTo] = useState("");

  return (
    <div>
      <SearchInternal
        from={localFrom}
        to={localTo}
        setFrom={setLocalFrom}
        setTo={setLocalTo}
        onSearch={() => {
          setFrom(localFrom);
          setTo(localTo);
        }}
      />
    </div>
  );
};

/* ------------------ MODIFIED SEARCH ------------------ */
/* your UI but controllable */

const stops = [
  "City Center",
  "Bus Stand",
  "Railway Station",
  "Airport",
  "Tech Park",
  "Main Market",
];

const SearchInternal = ({ from, to, setFrom, setTo, onSearch }) => {
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const filterStops = (value) => {
    return stops.filter((s) => s.toLowerCase().includes(value.toLowerCase()));
  };

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto mt-5">
      <h3 className="text-xl text-primary text-center font-semibold mb-6 tracking-tight">
        Find your bus route
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        {/* FROM */}
        <div className="relative">
          <input
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setShowFrom(true);
            }}
            placeholder="From"
            className="w-full bg-background border border-border px-4 py-3 rounded-md text-sm"
          />

          {showFrom && (
            <div className="absolute w-full bg-card border border-border rounded-md mt-1">
              {filterStops(from).map((s, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setFrom(s);
                    setShowFrom(false);
                  }}
                  className="px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TO */}
        <div className="relative">
          <input
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setShowTo(true);
            }}
            placeholder="To"
            className="w-full bg-background border border-border px-4 py-3 rounded-md text-sm"
          />

          {showTo && (
            <div className="absolute w-full bg-card border border-border rounded-md mt-1">
              {filterStops(to).map((s, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setTo(s);
                    setShowTo(false);
                  }}
                  className="px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={onSearch}
          className="bg-primary text-primary-foreground px-4 py-3 rounded-md text-sm font-medium"
        >
          Search
        </button>
      </div>
    </section>
  );
};
