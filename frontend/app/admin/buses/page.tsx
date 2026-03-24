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
        onClick={() => router.push(`/admin/buses/${row.id}`)}
      >
        View
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push(`/admin/buses/edit/${row.id}`)}
      >
        Assign driver
      </Button>
      {/* <Button
        size="sm"
        variant="outline"
        onClick={() => router.push(`/admin/buses/${row.id}/edit`)}
      >
        Edit
      </Button> */}

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

export default function AdminBusesPage() {
  const router = useRouter();

  const columns = [
    {
      key: "number",
      label: "Bus Number",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge variant={row.status === "ACTIVE" ? "default" : "secondary"}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "route",
      label: "Route Assigned",
      render: (row) => (
        <span className="text-xs text-muted-foreground">
          {row.routeId ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  /* ------------------ DUMMY DATA ------------------ */
  const data = [
    {
      id: "1",
      number: "KL-07-1234",
      status: "ACTIVE",
      routeId: "route1",
    },
    {
      id: "2",
      number: "KL-07-5678",
      status: "INACTIVE",
      routeId: null,
    },
  ];

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-primary font-semibold text-2xl tracking-tight">
          Buses
        </h1>

        <Button onClick={() => router.push(`/admin/buses/create`)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Bus
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
