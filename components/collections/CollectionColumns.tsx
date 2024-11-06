"use client";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom_ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/collections/${row.original._id}`} className="hover:text-pink-400">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "action",
    cell: ({ row }) => <Delete id={row.original._id} />,
  },
];
