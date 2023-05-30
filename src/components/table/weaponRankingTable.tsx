import { getWeaponSubAndSpecial, getWeaponImageFileName } from "@/utils/util";
import Image from "next/image";
import { useMemo } from "react";

export type TableData = {
    weapon: {
        maxRank: number;
        name: string;
        sub: string;
        sp: string;
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
            return datas.sort((a, b) => b.maxXPower - a.maxXPower);
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
                    key={`${info.weapon.maxRank}-${info.weapon.name}`}
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
    index: number;
};

const TableItem = ({ key, info, showXPower, index }: TableItemProps) => {
    const weaponIconFileName = useMemo(
        () => getWeaponImageFileName(info.weapon.name),
        [info]
    );
    return (
        <div key={key} className="w-full flex gap-x-3 bg-white px-4">
            <div className="flex flex-col justify-center items-center text-center min-w-[35px]">
                {/* <div className="text-sm">{`${info.rank}`}</div> */}
                <div className="text-sm">{`${index + 1}`}</div>
                <div className="opacity-70 text-xs">
                    {showXPower ? info.maxXPower.toFixed(1) : info.usageCount}
                </div>
            </div>
            <div className="flex justify-center items-center">
                <Image
                    src={`/weapons/main/2d/${weaponIconFileName}.webp`}
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
                    src={`/weapons/sub/${info.weapon.sub}.webp`}
                    alt={`${info.weapon.sub}`}
                    width={35}
                    height={35}
                    className="bg-gray-300 p-[6px] rounded-full"
                />
                <Image
                    src={`/weapons/sp/${info.weapon.sp}.webp`}
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
