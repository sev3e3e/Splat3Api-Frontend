import WeaponXPowerTable from "@/components/table/weaponXPowerTable";
import { Modes } from "@/utils/util";
import { Weapons } from "@/utils/weaponName";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import { readFileSync } from "fs";
import path from "path";

type Props = {
    params: {
        mode: string;
    };
};

export type XRankingWeaponData = {
    name: string;
    count: number;
    MaxXPower: number;
    MinXPower: number;
    MeanXPower: number;
    MedianXPower: number;
};

export async function generateStaticParams() {
    return Modes.map((mode) => mode);
}

const Page = async ({ params }: Props) => {
    const { mode } = params;

    if (process.env["NODE_ENV"] === "development") {
        const p = path.join(
            process.cwd(),
            `testData/27-May-2023/${mode}/${mode}.27-May-2023.00.json`
        );

        const buf = readFileSync(p);
        const playerDatas: XRankingPlayerData[] = JSON.parse(buf.toString());

        return (
            <div>
                <div>{mode}</div>
                <div className="text-sm ">
                    {"Click (tap) on the header to sort."}
                </div>
                <WeaponXPowerTable datas={playerDatas} />
            </div>
        );
    }
};

export default Page;
