"use client";

import { classNames } from "@/utils/util";
import { Weapons } from "@/utils/weaponName";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import { ColumnDef, getSortedRowModel } from "@tanstack/react-table";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

const PlayerTable = ({ datas }: { datas: XRankingPlayerData[] }) => {
    const data = useMemo(() => {
        // dataの
        return datas;
    }, [datas]);

    const columns: ColumnDef<XRankingPlayerData>[] = useMemo(
        () => [
            {
                header: "Rank",
                accessorKey: "rank",
                cell: (info) => (
                    <div className="text-center">
                        {info.getValue() as number}
                    </div>
                ),
                meta: {},
            },
            {
                header: "Name",
                accessorKey: "name",
                cell: (info) => (
                    <div className="text-sm">{info.getValue() as string}</div>
                ),
            },
            {
                header: "Weapon",
                accessorKey: "weapon",
                cell: (info) => {
                    const name = info.getValue() as string;
                    const weaponFileName = Weapons[name]
                        ? Weapons[name].replace(/\s/g, "_")
                        : undefined;

                    return (
                        <div className="flex items-center ">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`/weapons/main/2d/${weaponFileName}.webp`}
                                width={40}
                                height={40}
                                alt={name}
                            />
                            <p className="text-xs tracking-wide leading-normal">
                                {info.getValue() as string}
                            </p>
                        </div>
                    );
                },
            },
            {
                header: "XPower",
                accessorKey: "xPower",
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

export default PlayerTable;
