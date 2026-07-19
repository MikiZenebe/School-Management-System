import React from "react";
import { DataTable } from "@/components/data-table";
import { columns, Teacher } from "./columns";
import { role, teachersData } from "@/lib/data";

export default async function TeachersListPage() {
  const data: Teacher[] = teachersData.map((teacher) => ({
    ...teacher,
    id: String(teacher.id),
  }));

  return (
    <div className="container mx-auto  py-10 ">
      <div className="bg-white px-8 py-6 rounded-lg flex flex-col gap-5">
        <DataTable columns={columns} data={data} tableTitle="All Teachers" />
      </div>
    </div>
  );
}
