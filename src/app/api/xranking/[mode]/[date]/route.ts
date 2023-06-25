import { readFileFromGCS } from "@/utils/gcs";
import { Mode } from "@/utils/util";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { NextRequest, NextResponse } from "next/server";
dayjs.extend(utc);
dayjs.extend(timezone);

export async function GET(
    request: NextRequest,
    {
        params,
    }: {
        params: { mode: Mode; date: string };
    }
) {
    const { mode, date } = params;

    const data = await readFileFromGCS(
        `jsons/${date}/${mode}/${mode}.${date}.10.json`
    );

    return NextResponse.json(data.toString(), {
        headers: {
            "content-type": "application/json",
            "cache-control": "max-age=0, s-maxage=31536000",
        },
    });
}
