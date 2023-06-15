"use client";

import { Weapons } from "@/utils/weaponName";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import { ColumnDef, getSortedRowModel } from "@tanstack/react-table";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import Image from "next/image";

type Props = {
    datas: XRankingPlayerData[];
};

type XRankingWeaponData = {
    name: string;
    count: number;
    MaxXPower: number;
    MinXPower: number;
    MeanXPower: number;
    MedianXPower: number;
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
                        <div className="flex justify-center items-center gap-x-1">
                            <Image
                                src={`/weapons/main/2d/${weaponFileName}.webp`}
                                width={66}
                                height={66}
                                alt={name}
                            />
                            <div className="text-xs">
                                {info.getValue() as string}
                            </div>
                        </div>
                    );
                },
            },
            {
                header: "Count",
                accessorKey: "count",
            },
            {
                header: "Max",
                accessorKey: "MaxXPower",
                cell: (info) => (info.getValue() as number).toFixed(1),
            },
            {
                header: "Min",
                accessorKey: "MinXPower",
                cell: (info) => (info.getValue() as number).toFixed(1),
            },
            {
                header: "Mean",
                accessorKey: "MeanXPower",
                cell: (info) => (info.getValue() as number).toFixed(1),
            },
            {
                header: "Median",
                accessorKey: "MedianXPower",
                cell: (info) => {
                    return (info.getValue() as number).toFixed(1);
                },
            },
        ],
        []
    );
    const data = useMemo(() => {
        // weaponデータへ変換
        const weaponData: { [weapon: string]: XRankingWeaponData } = {};
        const temp: { [weapon: string]: number[] } = {};

        for (const playerData of datas) {
            const name = playerData.weapon;
            const xp = playerData.xPower;

            if (!temp[name]) temp[name] = [];
            if (!weaponData[name]) {
                weaponData[name] = {
                    name: name,
                    count: 0,
                    MaxXPower: 0,
                    MinXPower: 9999,
                    MeanXPower: 0,
                    MedianXPower: 0,
                };
            }

            temp[name].push(xp);

            if (!weaponData[name].count) {
                weaponData[name].count = 0;
            }
            weaponData[name].count++;

            if (!weaponData[name].MaxXPower || weaponData[name].MaxXPower < xp)
                weaponData[name].MaxXPower = xp;

            if (
                !weaponData[name].MinXPower ||
                weaponData[name].MinXPower > xp
            ) {
                weaponData[name].MinXPower = xp;
            }
        }

        for (const weapon of Object.keys(temp)) {
            // temp[weapon]の平均を求める
            const mean =
                temp[weapon].reduce((a, b) => a + b, 0) / temp[weapon].length;

            // temp[weapon]の中央値を求める
            const median = temp[weapon].sort((a, b) => a - b)[
                Math.floor(temp[weapon].length / 2)
            ];

            // weaponData[weapon].MeanXPower =
            //     weaponData[weapon].count > 5 ? mean : Number.NaN;
            // weaponData[weapon].MedianXPower =
            //     weaponData[weapon].count > 5 ? median : Number.NaN;
            weaponData[weapon].MeanXPower = mean;
            weaponData[weapon].MedianXPower = median;
        }
        return Object.values(weaponData);
    }, [datas]);

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <table className="text-center">
            <thead>
                {table.getHeaderGroups().map((group) => (
                    <tr key={group.id}>
                        {group.headers.map((header) => (
                            <th
                                key={header.id}
                                colSpan={header.colSpan}
                                className="px-10"
                            >
                                {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                            className:
                                                header.column.getCanSort()
                                                    ? "cursor-pointer select-none"
                                                    : "",
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
                {table.getRowModel().rows.map((row) => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <td key={cell.id}>
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
