import WeaponXPowerBarChart from "@/components/charts/weaponXPowerChart";
import { convertToWeaponData } from "@/components/table/utils";
import WeaponXPowerTable from "@/components/table/weaponXPowerTable";
import { Modes } from "@/utils/util";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import { readFileSync } from "fs";
import path from "path";
import WeaponXPDashBoard from "./dashboard";

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

        return (
            <div>
                <div>{mode}</div>
                {/* <div className="text-sm ">
                    {"Click (tap) on the header to sort."}
                </div>*/}
                <WeaponXPDashBoard datas={weaponDatas} />
            </div>
        );
    }
};

export default Page;
