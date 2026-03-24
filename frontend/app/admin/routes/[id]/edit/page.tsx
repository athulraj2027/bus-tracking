"use client";
import React, { useEffect, useState } from "react";

export default function EditRoutePage() {
  const [name, setName] = useState("");
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Mock fetch (replace with API)
  useEffect(() => {
    const data = {
      name: "Calicut → Kochi Express",
      stops: [
        { name: "Calicut Beach", order: 1 },
        { name: "Malappuram", order: 2 },
        { name: "Thrissur", order: 3 },
        { name: "Kochi", order: 4 },
      ],
    };

    setName(data.name);
    setStops(data.stops);
  }, []);

  const addStop = () => {
    setStops([...stops, { name: "", order: stops.length + 1 }]);
  };

  const removeStop = (index) => {
    const updated = stops.filter((_, i) => i !== index);
    setStops(updated.map((s, i) => ({ ...s, order: i + 1 })));
  };

  const handleChange = (index, value) => {
    const updated = [...stops];
    updated[index].name = value;
    setStops(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Route name required");

    const names = stops.map((s) => s.name.trim().toLowerCase());
    if (new Set(names).size !== names.length) {
      return alert("Duplicate stops not allowed");
    }

    setLoading(true);

    try {
      const payload = {
        name,
        stops: stops.map((s, i) => ({
          name: s.name,
          order: i + 1,
          location: {
            type: "Point",
            coordinates: [0, 0], // temp
          },
        })),
      };

      console.log("Updated:", payload);

      // await fetch(`/api/routes/${id}`, { method: "PUT", ... })

      alert("Route updated");
    } catch (err) {
      alert("Error updating route");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex justify-center py-10 px-3">
      <div className="w-full max-w-xl">
        {/* Header */}
        <h1 className="text-xl font-semibold text-primary">Edit route</h1>
        <p className="text-xs text-gray-500 mt-1 mb-6">
          Update route details and stops
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Route Name */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Route name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 bg-white rounded-md px-2.5 py-1.5 text-sm text-primary focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Stops */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-gray-500">Stops</label>
              <button
                type="button"
                onClick={addStop}
                className="text-xs text-gray-600 hover:underline"
              >
                + Add
              </button>
            </div>

            <div className="space-y-2">
              {stops.map((stop, index) => (
                <div
                  key={index}
                  className="border border-gray-200 bg-white rounded-md px-3 py-2"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">#{index + 1}</span>

                    {stops.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStop(index)}
                        className="text-xs text-red-500"
                      >
                        remove
                      </button>
                    )}
                  </div>

                  {/* Input */}
                  <input
                    type="text"
                    className="w-full text-sm text-primary border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-300"
                    value={stop.name}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white text-sm py-2 rounded-md hover:bg-black transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
