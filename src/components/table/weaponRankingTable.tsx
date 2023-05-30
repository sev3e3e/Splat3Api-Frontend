import Image from "next/image";
import { useMemo } from "react";

export type TableData = {
    rank: number;
    weapon: {
        name: string;
        sub: string;
        sp: string;
        mainIconPath: string;
        subIconPath: string;
        spIconPath: string;
    };
    usageRate: number;
    usageCount: number;
    maxXPower: number;
};

type Props = {
    datas: TableData[];
    showXPower?: boolean;
};

const WeaponXPowerRankingTable = ({ datas, showXPower }: Props) => {
    const infos = useMemo(() => {
        if (showXPower) {
            // datasをrank順にsort
            return datas.sort((a, b) => a.rank - b.rank);
        } else {
            // datasをusageCount順にsort
            const sortedDatas = datas.sort(
                (a, b) => b.usageCount - a.usageCount
            );
            return sortedDatas;
        }
    }, [datas, showXPower]);

    return (
        <>
            {infos.map((info, index) => (
                <div
                    key={`${info.rank}-${info.weapon.name}`}
                    className="py-[3px] overflow-hidden rounded-full drop-shadow-md"
                >
                    <TableItem
                        info={info}
                        showXPower={showXPower}
                        index={index}
                    />
                </div>
            ))}
        </>
    );
};

type TableItemProps = {
    key?: string;
    info: TableData;
    showXPower?: boolean;
    index?: number;
};

const TableItem = ({ key, info, showXPower, index }: TableItemProps) => {
    return (
        <div key={key} className="w-full flex gap-x-3 bg-white px-4">
            <div className="flex flex-col justify-center items-center text-center min-w-[35px]">
                {/* <div className="text-sm">{`${info.rank}`}</div> */}
                <div className="text-sm">{`${
                    index ? index + 1 : info.rank
                }`}</div>
                <div className="opacity-70 text-xs">
                    {showXPower ? info.maxXPower.toFixed(1) : info.usageCount}
                </div>
            </div>
            <div className="flex justify-center items-center">
                <Image
                    src={info.weapon.mainIconPath}
                    alt={`${info.weapon}`}
                    width={40}
                    height={40}
                />
                <div className="text-xs tracking-tight font-medium py-1 px-[6px]">
                    {info.weapon.name}
                </div>
            </div>
            <div className="flex ml-auto justify-center items-center gap-x-1">
                <Image
                    src={info.weapon.subIconPath}
                    alt={`${info.weapon.sub}`}
                    width={35}
                    height={35}
                    className="bg-gray-300 p-[6px] rounded-full"
                />
                <Image
                    src={info.weapon.spIconPath}
                    alt={info.weapon.sp}
                    width={35}
                    height={35}
                    className="bg-gray-300 p-[6px] rounded-full"
                />
            </div>
        </div>
    );
};

export default WeaponXPowerRankingTable;
