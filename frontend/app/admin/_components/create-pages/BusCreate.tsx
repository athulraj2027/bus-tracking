"use client";

import React, { useState } from "react";

const dummyRoutes = [
  { id: "r1", name: "City Center → Airport" },
  { id: "r2", name: "Bus Stand → Railway Station" },
  { id: "r3", name: "Tech Park → Downtown" },
];

const BusCreate = () => {
  const [form, setForm] = useState({
    number: "",
    driverId: "",
    routeId: "",
    status: "INACTIVE",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Bus Data:", form);

    // later → call your API
    // await axios.post("/bus", form)
  };

  return (
    <div className=" flex items-center justify-center  text-black">
      <form
        onSubmit={handleSubmit}
        className=" p-8  w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">Create Bus</h2>

        {/* Bus Number */}
        <div>
          <label className="block mb-1 text-sm">Bus Number</label>
          <input
            type="text"
            name="number"
            value={form.number}
            onChange={handleChange}
            className="w-full p-2 rounded border border-neutral-700 focus:outline-none"
            placeholder="Enter bus number"
            required
          />
        </div>

        {/* Driver ID */}
        <div>
          <label className="block mb-1 text-sm">Driver ID</label>
          <input
            type="text"
            name="driverId"
            value={form.driverId}
            onChange={handleChange}
            className="w-full p-2 rounded border-neutral-700 focus:outline-none"
            placeholder="Enter driver ID"
          />
        </div>

        {/* Route Dropdown */}
        <div>
          <label className="block mb-1 text-sm">Select Route</label>
          <select
            name="routeId"
            value={form.routeId}
            onChange={handleChange}
            className="w-full p-2 rounded border border-neutral-700"
            required
          >
            <option value="">-- Select Route --</option>
            {dummyRoutes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block mb-1 text-sm">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 rounded border border-neutral-700"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          Create Bus
        </button>
      </form>
    </div>
  );
};

export default BusCreate;
