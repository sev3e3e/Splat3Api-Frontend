import { getAllJsonsFromGCS } from "@/utils/gcs";
import { Mode } from "@/utils/util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { mode: Mode } }
) {
    const referrer = request.referrer;

    console.log(referrer);
    if (!referrer) {
        return new NextResponse(undefined, {
            status: 418,
            statusText: "I'm a teapot",
        });
    }

    const files = await getAllJsonsFromGCS();

    const modeFiles = files[0].filter((file) => {
        return file.name.includes(params.mode) && file.name.includes("10.json");
    });

    return NextResponse.json(
        {
            mode: params.mode,
            count: modeFiles.length,
            dates: modeFiles.map(
                (file) => file.name.match(/(\d{2}-[A-Za-z]{3}-\d{4})/m)![1]
            ),
        },
        {
            headers: {
                "content-type": "application/json",
                "cache-control": "max-age=0, s-maxage=31536000",
            },
            status: 200,
        }
    );
}

export type xRankingDatesResponse = {
    mode: Mode;
    count: number;
    dates: string[];
};
