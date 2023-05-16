import React, { useState } from "react";

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import styles from "../styles/components/table.module.css";

type TableData = {
    rank: number;
    name: string;
    nameId: number;
    xPower: number;
    weapon: string;
};

const Data: TableData[] = [
    {
        rank: 1,
        name: "Player 1",
        nameId: 1111,
        xPower: 3100,
        weapon: "Splattershot Jr.",
    },
    {
        rank: 2,
        name: "Player 2",
        nameId: 2222,
        xPower: 3000,
        weapon: "Splattershot Jr.",
    },
];

const columnHelper = createColumnHelper<TableData>();

const columns = [
    columnHelper.accessor("rank", {}),
    // columnHelper.accessor((row) => `${row.name} #${row.nameId}`, {
    //     id: "fullName",
    // }),

    columnHelper.accessor("name", {}),
    columnHelper.accessor("nameId", {}),
    columnHelper.accessor("weapon", {}),
    columnHelper.accessor("xPower", {}),
];

// TableData[]を任意のpropsとして受け取る

export const Table = ({ initialData }: { initialData: TableData[] }) => {
    const [data, setData] = useState(() => [...initialData]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <table className={styles.table}>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td className={styles.border} key={cell.id}>
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
        </>
    );
};
