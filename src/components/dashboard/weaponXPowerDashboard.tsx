import { Mode } from "@/utils/util";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import { readFileSync } from "fs";
import path from "path";

const WeaponXPowerDashboard = () => {
    if (process.env["NODE_ENV"] === "development") {
        for (const mode of Object.values(Mode)) {
            const p = path.join(
                process.cwd(),
                `testData/27-May-2023/${mode}/${mode}.27-May-2023.00.json`
            );

            const buf = readFileSync(p);
            const playerDatas: XRankingPlayerData[] = JSON.parse(
                buf.toString()
            );
        }
    }
};

export default WeaponXPowerDashboard;
