"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

const RouteCreate = () => {
  const mapRef = useRef<any>(null);
  const mapInstance = useRef<any>(null);
  const routingRef = useRef<any>(null);
  const [name, setName] = useState("");
  const [stops, setStops] = useState<any[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Temporary state for adding stop name
  const [pendingLocation, setPendingLocation] = useState<any>(null);
  const [stopNameInput, setStopNameInput] = useState("");

  const updateRoute = useCallback(async () => {
    if (!mapInstance.current) return;

    const L = (await import("leaflet")).default;

    if (routingRef.current) {
      mapInstance.current.removeControl(routingRef.current);
    }

    if (stops.length > 1) {
      routingRef.current = L.Routing.control({
        waypoints: stops.map((s) =>
          L.latLng(s.location.coordinates[1], s.location.coordinates[0]),
        ),
        addWaypoints: false,
        // draggableWaypoints: false,
        show: false,
        routeWhileDragging: true,
      }).addTo(mapInstance.current);
    }
  }, [stops]);

  useEffect(() => {
    updateRoute();
  }, [stops, updateRoute]);
  // ✅ Initialize map ONLY ONCE
  useEffect(() => {
    if (mapInstance.current) return;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      await import("leaflet-routing-machine");
      await import("leaflet-routing-machine/dist/leaflet-routing-machine.css");
      // Fix marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current).setView([11.0168, 76.9558], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "BusTrack",
      }).addTo(map);

      // 📍 Map click → set pending location
      map.on("click", (e: any) => {
        setPendingLocation(e.latlng);
      });

      mapInstance.current = map;
    })();
  }, []);

  // ✅ Add stop after entering name
  const addStop = async () => {
    if (!pendingLocation || !stopNameInput.trim()) return;

    const L = (await import("leaflet")).default;

    const { lat, lng } = pendingLocation;

    const marker = L.marker([lat, lng], { draggable: true }).addTo(
      mapInstance.current,
    );

    const newStop = {
      name: stopNameInput,
      order: stops.length + 1,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    };

    const newIndex = stops.length;

    setStops((prev) => [...prev, newStop]);
    setMarkers((prev) => [...prev, marker]);

    // 🔥 Drag update (correct index)
    marker.on("dragend", (e: any) => {
      const pos = e.target.getLatLng();

      setStops((prev: any[]) =>
        prev.map((s, i) =>
          i === newIndex
            ? {
                ...s,
                location: {
                  type: "Point",
                  coordinates: [pos.lng, pos.lat],
                },
              }
            : s,
        ),
      );
    });

    // ❌ Remove on click
    marker.on("click", () => {
      mapInstance.current.removeLayer(marker);

      setMarkers((prev: any[]) => prev.filter((m) => m !== marker));

      setStops((prev: any[]) =>
        prev
          .filter((_, i) => i !== newIndex)
          .map((s, i) => ({ ...s, order: i + 1 })),
      );
    });

    // Reset input
    setPendingLocation(null);
    setStopNameInput("");
  };

  // 🧾 Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name.trim()) return alert("Route name required");
    if (stops.length < 2) return alert("Add at least 2 stops");

    const names = stops.map((s) => s.name.trim().toLowerCase());
    if (new Set(names).size !== names.length) {
      return alert("Duplicate stops not allowed");
    }

    setLoading(true);

    try {
      const payload = {
        name,
        stops,
      };

      console.log("REQUEST BODY:", payload);

      alert("Check console");

      setName("");
      setStops([]);

      markers.forEach((m) => mapInstance.current.removeLayer(m));
      setMarkers([]);
    } catch (err) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex justify-center py-10 px-3">
      <div className="w-full max-w-3xl space-y-6">
        <div>
          <h1 className="text-xl font-semibold">Create route</h1>
          <p className="text-sm text-gray-500">
            Click map → enter stop name → add stop
          </p>
        </div>

        {/* Map */}
        <div ref={mapRef} className="w-full h-[400px] rounded border" />

        {/* 🔥 Stop Name Input (appears after click) */}
        {pendingLocation && (
          <div className="p-3 bg-white border rounded">
            <p className="text-sm mb-2">
              Add stop at ({pendingLocation.lat.toFixed(4)},{" "}
              {pendingLocation.lng.toFixed(4)})
            </p>
            <input
              type="text"
              placeholder="Stop name"
              value={stopNameInput}
              onChange={(e) => setStopNameInput(e.target.value)}
              className="border px-2 py-1 mr-2"
            />
            <button
              onClick={addStop}
              className="bg-black text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Route name"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Stops Preview */}
          <div className="space-y-2">
            {stops.map((stop, i) => (
              <div key={i} className="border p-2 rounded bg-white text-sm">
                #{i + 1} — {stop.name}
                <div className="text-xs text-gray-500">
                  {stop.location.coordinates[1].toFixed(4)},
                  {stop.location.coordinates[0].toFixed(4)}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded"
          >
            {loading ? "Creating..." : "Create Route"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RouteCreate;
