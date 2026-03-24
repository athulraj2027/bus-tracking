"use client";

import { Button } from "@/components/ui/button";
import DataTable from "../_components/Table";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

/* ------------------ TABLE OPTIONS ------------------ */

const TableOptions = ({ row }) => {
  const router = useRouter();

  return (
    <div className="flex justify-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push(`/admin/routes/${row.id}`)}
      >
        View
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push(`/admin/routes/${row.id}/edit`)}
      >
        Edit
      </Button>

      <Button
        size="sm"
        variant="destructive"
        onClick={() => console.log("Delete", row)}
      >
        Delete
      </Button>
    </div>
  );
};

/* ------------------ PAGE ------------------ */

export default function AdminRoutesPage() {
  const router = useRouter();

  const columns = [
    {
      key: "name",
      label: "Route Name",
    },
    {
      key: "stopsCount",
      label: "Stops",
      render: (row) => <Badge variant="secondary">{row.stops.length}</Badge>,
    },
    {
      key: "preview",
      label: "Stops Preview",
      render: (row) => (
        <div className="flex flex-wrap gap-1 justify-center">
          {row.stops.slice(0, 3).map((stop, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
            >
              {stop.name}
            </span>
          ))}
          {row.stops.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{row.stops.length - 3} more
            </span>
          )}
        </div>
      ),
    },
  ];

  /* ------------------ DUMMY DATA ------------------ */
  const data = [
    {
      id: "1",
      name: "City Loop",
      stops: [
        { name: "City Center", lat: 11.25, lng: 75.78, order: 1 },
        { name: "Bus Stand", lat: 11.26, lng: 75.79, order: 2 },
        { name: "Railway Station", lat: 11.27, lng: 75.8, order: 3 },
        { name: "Airport", lat: 11.28, lng: 75.81, order: 4 },
      ],
    },
    {
      id: "2",
      name: "Tech Route",
      stops: [
        { name: "Tech Park", lat: 11.3, lng: 75.82, order: 1 },
        { name: "Main Market", lat: 11.31, lng: 75.83, order: 2 },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-primary font-semibold text-2xl tracking-tight">
          Routes
        </h1>

        <Button onClick={() => router.push(`/admin/routes/create`)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Route
        </Button>
      </div>

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={data}
        renderActions={(row) => <TableOptions row={row} />}
      />
    </div>
  );
}
