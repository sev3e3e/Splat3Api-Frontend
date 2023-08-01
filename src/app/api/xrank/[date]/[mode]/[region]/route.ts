import { NextResponse } from "next/server";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getFilePaths } from "@/utils/gcs";
import { DetailTabViewXRankingRefetchQuery } from "@/types/DetailTabViewXRankingRefetchQuery";
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const fetchCache = "force-cache";

type Params = {
    date: string;
    mode: string;
    region: string;
};
export async function GET(request: Request, { params }: { params: Params }) {
    const { date, mode, region } = params;

    // check date
    const parsedDate = dayjs.utc(date, "YYYY-MM-DD");
    if (!parsedDate.isValid() || parsedDate.isBefore("2023/03/01", "d")) {
        return NextResponse.json(
            {
                message: "date is invalid.",
            },
            {
                status: 400,
            }
        );
    }

    // check mode
    if (
        mode !== "towercontrol" &&
        mode !== "rainmaker" &&
        mode !== "clamblitz" &&
        mode !== "splatzones"
    ) {
        return NextResponse.json(
            {
                message: "mode is invalid.",
            },
            {
                status: 400,
            }
        );
    }

    // check region
    if (region !== "atlantic" && region !== "pacific") {
        return NextResponse.json(
            {
                message: "region is invalid.",
            },
            {
                status: 400,
            }
        );
    }

    const paths = await getFilePaths(
        `jsons/raw/archive/${parsedDate.format("YYYY/MM/DD")}/`
    );

    const filteredPaths = paths[0].filter(
        (p) =>
            /\d{4}\/\d{2}\/\d{2}\/\d{4}-\d{2}-\d{2}\.23/gm.test(p.name) &&
            p.name.includes(mode)
    );

    const filePath = filteredPaths.find((p) =>
        p.name.includes(`xrank.detail.${region.charAt(0)}`)
    );

    return NextResponse.json(
        JSON.parse(
            (await filePath?.download())?.[0].toString() || ""
        ) as DetailTabViewXRankingRefetchQuery,
        {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
            },
        }
    );
}
