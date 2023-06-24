import { readFileFromGCS } from "@/utils/gcs";
import { Mode } from "@/utils/util";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { NextRequest, NextResponse } from "next/server";
dayjs.extend(utc);
dayjs.extend(timezone);

export async function GET(request: NextRequest) {
    const referer = request.headers.get("referer");

    console.log(referer);

    const query = request.nextUrl.searchParams;
    const mode = query.get("mode");
    const date = query.get("date");

    const data = await readFileFromGCS(
        `jsons/${date}/${mode}/${mode}.${date}.10.json`
    );

    return NextResponse.json(JSON.parse(data.toString()), {
        headers: {
            "content-type": "application/json",
            "cache-control": "max-age=0, s-maxage=31536000",
        },
        status: 200,
    });
}
