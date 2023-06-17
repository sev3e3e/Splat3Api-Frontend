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
                        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-x-1 md:max-w-[170px] ">
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
                    minWidth: "80px",
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
                    <div className="flex flex-col justify-center items-center">
                        <div className="text-lg font-semibold">{`${
                            info.getValue() as string
                        }`}</div>
                        <div className="flex self-center items-center">
                            <div className="text-sm">{`${info.row.original.countRank}`}</div>
                            <div className="text-xs">{`位`}</div>
                        </div>
                    </div>
                ),
            },
            {
                header: "XPower",
                accessorKey: "MaxXPower",
                cell: (info) => {
                    const pct = info.row.original.MaxXPowerAsPercent;
                    const labelPct = 37;

                    return (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: `${
                                    pct > 37 ? pct - labelPct : pct / labelPct
                                }% ${labelPct}%`,
                            }}
                            className="h-full"
                        >
                            <div
                                className={`bg-gray-500 rounded-sm h-1/2 self-center`}
                                // style={{
                                //     backgroundImage: `linear-gradient(to right, red 0% ${info.row.original.MaxXPowerAsPercent}%, black ${info.row.original.MaxXPowerAsPercent}% 100%)`,
                                // }}
                            >
                                {" "}
                            </div>
                            <div className="self-start items-start justify-start text-start pl-1 flex">
                                <div>
                                    <div className="text-sm md:text-base">
                                        {(info.getValue() as number).toFixed(1)}
                                    </div>
                                    <div className="flex pl-[2px] text-center justify-center self-center">
                                        <div className="text-xs self-center">{`(`}</div>
                                        <div className="text-md self-center">{`${info.row.original.MaxXPowerRank}`}</div>
                                        <div className="text-xs self-center">{`位`}</div>
                                        <div className="text-xs self-center">{`)`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                },
                meta: {
                    width: "70%",
                    maxWidth: "90%",
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
