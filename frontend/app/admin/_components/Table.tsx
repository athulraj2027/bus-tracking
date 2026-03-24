"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const DataTable = ({ columns, data, renderActions }) => {
  const [search, setSearch] = useState("");

  // Filter logic
  const filteredData = data.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* SEARCH */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search..."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          {/* HEADER */}
          <TableHeader className="bg-muted/50">
            <TableRow>
              {/* S.NO */}
              <TableHead className="text-center text-sm text-primary">
                S.No
              </TableHead>

              {/* DYNAMIC COLUMNS */}
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="text-sm text-primary text-center"
                >
                  {col.label}
                </TableHead>
              ))}

              {/* ACTIONS */}
              <TableHead className="text-sm text-primary text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, i) => (
                <TableRow key={i}>
                  {/* SERIAL NUMBER */}
                  <TableCell className="text-center text-xs text-muted-foreground">
                    {i + 1}
                  </TableCell>

                  {/* DATA */}
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className="text-xs text-muted-foreground text-center"
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}

                  {/* ACTIONS */}
                  <TableCell className="text-center space-x-2">
                    {renderActions ? renderActions(row) : null}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  className="text-center text-muted-foreground py-6"
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
