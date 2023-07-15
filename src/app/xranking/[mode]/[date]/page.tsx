import { readFileFromGCS } from "@/utils/gcs";

import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import PlayerTable from "@/components/table/playerTable";
import { readFileSync } from "fs";
import path from "path";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { cache } from "react";
import { ModeByID } from "@/utils/util";

import Image from "next/image";

dayjs.locale("ja");
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = { mode: string; date: string };
export async function generateStaticParams() {
    const params: Array<Props> = [];

    // if env is dev
    if (process.env["NODE_ENV"] === "development") {
        console.log("page set dates. on dev.");
        const bufDates = readFileSync(
            path.join(process.cwd(), `testData/dates.json`)
        );

        const rawDates = JSON.parse(bufDates.toString()) as {
            xRankingAr: string[];
            xRankingGl: string[];
            xRankingCl: string[];
            xRankingLf: string[];
        };

        for (const mode of Object.keys(rawDates)) {
            for (const date of rawDates[mode]) {
                params.push({
                    mode: mode,
                    date: date,
                });
            }
        }
    } else if (process.env["NODE_ENV"] === "production") {
        const util = await import("./util");
        for (const mode of Object.keys(util.xRankingDates)) {
            for (const date of util.xRankingDates[mode]) {
                params.push({
                    mode: mode,
                    date: date,
                });
            }
        }
    }
    // console.log(xRankingDates);

    return params;
}

const Page = async ({ params }: { params: Props }) => {
    const { mode, date } = params;
    let playerDatas: XRankingPlayerData[] = [];
    // if env is dev
    if (process.env["NODE_ENV"] === "development") {
        console.log("on dev.");
        const rawData = readFileSync(
            path.join(
                process.cwd(),
                `testData/27-May-2023/${mode}/${mode}.27-May-2023.00.json`
            )
        );

        playerDatas = JSON.parse(rawData.toString()) as XRankingPlayerData[];
    } else if (process.env["NODE_ENV"] === "production") {
        const rawData = await readFileFromGCS(
            `jsons/${date}/${mode}/${mode}.${date}.10.json`
        );

        playerDatas = JSON.parse(rawData[0].toString()) as XRankingPlayerData[];
    }

    if (playerDatas.length <= 0) return "something wrong";

    return (
        <div>
            <div className="flex flex-col items-center gap-x-2 justify-center pt-2 pb-4">
                {/* game mode */}
                <div className="flex items-center gap-x-1">
                    <Image
                        src={`/modes/game/${ModeByID[mode].icon}`}
                        alt={ModeByID[mode].icon}
                        width={60}
                        height={60}
                    />
                    {/* <div>{ModeByID[mode].name}</div> */}
                </div>
                {/* date */}
                <div>{getFormatedDate(date).add(10, "hour").format()}</div>
            </div>
            <div className="max-w-xl mx-auto">
                <PlayerTable datas={playerDatas} />
            </div>
        </div>
    );
};

const getFormatedDate = cache((date: string) => {
    return dayjs(date, "DD-MMM-YYYY", true).tz("Asia/Tokyo");
});

export default Page;
