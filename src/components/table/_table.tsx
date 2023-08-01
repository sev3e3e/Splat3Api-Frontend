"use client";

import { Edge, Weapon } from "@/types/DetailTabViewXRankingRefetchQuery";
import { classNames } from "@/utils/util";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import { useMemo } from "react";

const InnerTable = ({ data }: { data: Edge[] }) => {
    const columns: ColumnDef<Edge>[] = useMemo(
        () => [
            {
                header: "Rank",
                accessorKey: "node.rank",
                cell: (info) => (
                    <div className="text-center">
                        {info.getValue() as number}
                    </div>
                ),
            },
            {
                header: () => (
                    <div className="md:text-start md:text-lg">{"Name"}</div>
                ),
                accessorKey: "node.name",
                cell: (info) => (
                    <div className="text-sm">{info.getValue() as string}</div>
                ),
            },
            {
                header: () => (
                    <div className="md:text-start md:text-lg">{"Weapon"}</div>
                ),
                accessorKey: "node.weapon",
                cell: (info) => {
                    const weapon = info.getValue() as Weapon;
                    const name = weapon.name;

                    return (
                        <div className="flex items-center ">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`/weapons/main/2d/${weapon.id}.webp`}
                                width={40}
                                height={40}
                                alt={name}
                            />
                            <p className="text-xs tracking-wide leading-normal">
                                {name}
                            </p>
                        </div>
                    );
                },
            },
            {
                header: () => (
                    <div className="md:text-start md:text-lg">{"XPower"}</div>
                ),
                accessorKey: "node.xPower",
                cell: (info) => (
                    <div>{(info.getValue() as number).toFixed(1)}</div>
                ),
            },
        ],
        []
    );

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <table className="w-full">
            <thead>
                {table.getHeaderGroups().map((group) => (
                    <tr key={group.id}>
                        {group.headers.map((header) => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                            className: classNames(
                                                header.column.getCanSort()
                                                    ? "cursor-pointer select-none"
                                                    : "",
                                                ""
                                            ),
                                            onClick:
                                                header.column.getToggleSortingHandler(),
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: "↑",
                                            desc: "↓",
                                        }[
                                            header.column.getIsSorted() as string
                                        ] ?? null}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InnerTable;
