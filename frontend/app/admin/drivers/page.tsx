"use client";

import { Button } from "@/components/ui/button";
import DataTable from "../_components/Table";
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
        onClick={() => router.push(`/admin/users/${row.id}`)}
      >
        View
      </Button>

      <Button
        size="sm"
        variant="destructive"
        onClick={() => console.log("Delete", row)}
      >
        Block
      </Button>
    </div>
  );
};

/* ------------------ PAGE ------------------ */

export default function AdminUsersPage() {
  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },

    {
      key: "isVerified",
      label: "Verified",
      render: (row) => (
        <Badge variant={row.isVerified ? "default" : "secondary"}>
          {row.isVerified ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <Badge variant={row.isActive ? "default" : "destructive"}>
          {row.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ];

  /* ------------------ DUMMY DATA ------------------ */
  const data = [
    {
      id: "1",
      name: "Athul",
      email: "athul@gmail.com",
      role: "ADMIN",
      isVerified: true,
      isActive: true,
    },
    {
      id: "2",
      name: "Rahul",
      email: "rahul@gmail.com",
      role: "DRIVER",
      isVerified: false,
      isActive: true,
    },
    {
      id: "3",
      name: "Anu",
      email: "anu@gmail.com",
      role: "PASSENGER",
      isVerified: true,
      isActive: false,
    },
  ];

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-primary font-semibold text-2xl tracking-tight">
          Drivers
        </h1>
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
