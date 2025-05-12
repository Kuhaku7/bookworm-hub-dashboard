
// src/components/data-table/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { MostBorrowedBook } from "@/types";

export const columns: ColumnDef<MostBorrowedBook>[] = [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "author",
    header: "Autor",
  },
  {
    accessorKey: "borrowCount",
    header: "Empréstimos",
    cell: ({ row }) => {
      const count = row.getValue("borrowCount") as number;
      return <div className="font-medium">{count}</div>;
    },
  },
];
