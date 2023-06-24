import WeaponXPowerBarChart from "@/components/charts/weaponXPowerChart";
import { convertToWeaponData } from "@/components/table/utils";
import WeaponXPowerTable from "@/components/table/weaponXPowerTable";
import { ModeByID, Modes } from "@/utils/util";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import { readFileSync, readdirSync } from "fs";
import path from "path";
import WeaponXPDashBoard from "./dashboard";
import Image from "next/image";

import { Storage } from "@google-cloud/storage";

type Props = {
    params: {
        mode: string;
    };
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

        const weaponDatas = convertToWeaponData(playerDatas);

        // combobox用Dates
        const files = readdirSync(
            path.join(process.cwd(), `testData/27-May-2023/${mode}`)
        );

        const dates = files.map((file) => {
            return path
                .basename(file)
                .replace(`${mode}.`, "")
                .replace(".json", "");
        });

        // xRankingAr.27-May-2023.00

        return (
            <div className="m-auto">
                <div className="flex flex-col justify-center items-center p-1">
                    <Image
                        src={`/modes/game/${ModeByID[mode].icon}`}
                        width={100}
                        height={100}
                        alt={ModeByID[mode].name}
                    />
                </div>
                <div className="text-2xl sticky top-0 text-center m-auto tracking-wid">
                    ガチ{ModeByID[mode].name}
                </div>

                {/* <div className="text-sm ">
                    {"Click (tap) on the header to sort."}
                </div>*/}
                <div className="m-auto">
                    <WeaponXPDashBoard datas={weaponDatas} dates={dates} />
                </div>
            </div>
        );
    }

    // production.
    // get datas from gcs
};

export default Page;
