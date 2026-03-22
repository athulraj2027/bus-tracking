"use client";
import React, { useState, useRef, useEffect } from "react";

const stops = [
  "City Center",
  "Bus Stand",
  "Railway Station",
  "Airport",
  "Tech Park",
  "Main Market",
];

const Search = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const fromRef = useRef(null);
  const toRef = useRef(null);

  const filterStops = (value) => {
    return stops.filter((s) => s.toLowerCase().includes(value.toLowerCase()));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!fromRef.current?.contains(e.target)) setShowFrom(false);
      if (!toRef.current?.contains(e.target)) setShowTo(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="px-6 py-16 max-w-4xl mx-auto">
      <h3 className="text-xl text-primary text-center font-semibold mb-6 tracking-tight">
        Find your bus route
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        {/* FROM */}
        <div ref={fromRef} className="relative">
          <input
            type="text"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setShowFrom(true);
            }}
            placeholder="From"
            className="w-full bg-background border border-border px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />

          {showFrom && (
            <div className="absolute w-full bg-card border border-border rounded-md mt-1 max-h-44 overflow-y-auto z-20 shadow-sm">
              {filterStops(from).length > 0 ? (
                filterStops(from).map((stop, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setFrom(stop);
                      setShowFrom(false);
                    }}
                    className="px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                  >
                    {stop}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        {/* TO */}
        <div ref={toRef} className="relative">
          <input
            type="text"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setShowTo(true);
            }}
            placeholder="To"
            className="w-full bg-background border border-border px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />

          {showTo && (
            <div className="absolute w-full bg-card border border-border rounded-md mt-1 max-h-44 overflow-y-auto z-20 shadow-sm">
              {filterStops(to).length > 0 ? (
                filterStops(to).map((stop, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setTo(stop);
                      setShowTo(false);
                    }}
                    className="px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                  >
                    {stop}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        {/* BUTTON */}
        <button className="bg-primary text-primary-foreground px-4 py-3 rounded-md text-sm font-medium hover:opacity-90 transition">
          Search
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 mt-6 text-xs">
        {["Live Only", "Nearby", "Fastest Route"].map((filter, i) => (
          <button
            key={i}
            className="border border-border px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition"
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Search;
