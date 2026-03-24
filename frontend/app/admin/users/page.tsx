"use client";

import { Button } from "@/components/ui/button";
import DataTable from "../_components/Table";
import { useRouter } from "next/navigation";
import { usersColumns } from "@/constants/dashboard";
import { useGetUsersQuery } from "@/queries/user.queries";

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

export default function AdminUsersPage() {
  const { data, isLoading, error } = useGetUsersQuery();

  if (isLoading) return null;
  if (error) return null;

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-primary font-semibold text-2xl tracking-tight">
          Users
        </h1>
      </div>

      {/* TABLE */}
      <DataTable
        columns={usersColumns}
        data={data}
        renderActions={(row) => <TableOptions row={row} />}
      />
    </div>
  );
}
