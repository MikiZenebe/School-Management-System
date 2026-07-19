"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Teacher = {
  id: string;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

export const columns: ColumnDef<Teacher>[] = [
  {
    id: "info",
    header: "Info",
    cell: ({ row }) => {
      const teacher = row.original;
      const initials = teacher.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      return (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
            {teacher.photo ? (
              <Avatar>
                <AvatarImage src={teacher.photo} alt={teacher.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{teacher.name}</p>
            <p className="truncate text-sm text-slate-500">{teacher.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "teacherId",
    header: "Teacher ID",
  },
  {
    accessorKey: "subjects",
    header: "Subjects",
  },
  {
    accessorKey: "classes",
    header: "Classes",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    header: "Actions",
    id: "actions",
    meta: { sticky: true },
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0" type="button">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem className={"text-red-500"}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
