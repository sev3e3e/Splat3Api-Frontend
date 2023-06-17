"use client";

import { Weapons } from "@/utils/weaponName";
import { ColumnDef, getSortedRowModel } from "@tanstack/react-table";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import Image from "next/image";
import { XRankingWeaponData } from "@/utils/types";
import { classNames } from "@/utils/util";

type Props = {
    datas: XRankingWeaponData[];
};

const WeaponXPowerTable = ({ datas }: Props) => {
    const columns: ColumnDef<XRankingWeaponData>[] = useMemo(
        () => [
            {
                header: "Name",
                accessorKey: "name",
                cell: (info) => {
                    const name = info.getValue() as string;
                    const weaponFileName = Weapons[name]
                        ? Weapons[name].replace(/\s/g, "_")
                        : undefined;
                    return (
                        <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-x-1 max-w-[170px]">
                            <Image
                                src={`/weapons/main/2d/${weaponFileName}.webp`}
                                width={70}
                                height={70}
                                alt={name}
                            />
                            <div className="text-xs whitespace-nowrap">
                                {info.getValue() as string}
                            </div>
                        </div>
                    );
                },
                size: 170,
                meta: {
                    width: "180px",
                    maxWidth: "180px",
                    minWidth: "180px",
                },
            },
            {
                header: "Count",
                accessorKey: "count",
                meta: {
                    width: "60px",
                    maxWidth: "130px",
                },
                cell: (info) => (
                    <div className="flex justify-center items-center">
                        {info.getValue() as string}
                    </div>
                ),
            },
            {
                header: "XPower",
                accessorKey: "MaxXPower",
                cell: (info) => {
                    const pct = info.row.original.MaxXPowerAsPercent;
                    return (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: `${pct}% ${1}%`,
                            }}
                        >
                            <div
                                className={`bg-gray-500 rounded-sm`}
                                // style={{
                                //     backgroundImage: `linear-gradient(to right, red 0% ${info.row.original.MaxXPowerAsPercent}%, black ${info.row.original.MaxXPowerAsPercent}% 100%)`,
                                // }}
                            >
                                {" "}
                            </div>
                            <div className="text-start pl-1">
                                {(info.getValue() as number).toFixed(1)}
                            </div>
                        </div>
                    );
                },
                meta: {
                    width: "70%",
                    maxWidth: "70%",
                },
            },
        ],
        []
    );
    const data = useMemo(() => datas, [datas]);

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <table className="text-center table-fixed">
            <thead className="">
                {table.getHeaderGroups().map((group) => (
                    <tr key={group.id}>
                        {group.headers.map((header) => (
                            <th
                                key={header.id}
                                colSpan={header.colSpan}
                                className=""
                                style={{
                                    width: header.column.columnDef.meta.width,
                                    maxWidth:
                                        header.column.columnDef.meta.maxWidth,
                                    minWidth:
                                        header.column.columnDef.meta.minWidth,
                                }}
                            >
                                {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                            className: classNames(
                                                header.column.getCanSort()
                                                    ? "cursor-pointer select-none"
                                                    : "",
                                                "flex flex-col justify-content items-center"
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
            <tbody className="">
                {table.getRowModel().rows.map((row) => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <td
                                        key={cell.id}
                                        className=""
                                        style={{
                                            width: cell.column.columnDef.meta
                                                .width,
                                            maxWidth:
                                                cell.column.columnDef.meta
                                                    .maxWidth,
                                        }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default WeaponXPowerTable;
