import { Storage } from "@google-cloud/storage";

import dayjs from "dayjs";

import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

// nextjs api handler ts
import { NextApiRequest, NextApiResponse } from "next";
import { Mode } from "@/utils/util";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";

// handler
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { key } = req.query;

    const storage = new Storage({
        projectId: process.env["PROJECT_ID"],
        credentials: {
            client_email: process.env["SERVICEACCOUNT_EMAIL"],
            private_key: process.env["SERVICEACCOUNT_PRIVATE_KEY"],
        },
    });

    const now = dayjs().tz("Asia/Tokyo");
    const datetimeStr = now.format("DD-MMM-YYYY");

    const bucketName = process.env["BUCKET_NAME"]!;
    const bucket = storage.bucket(bucketName);
    const files = await bucket.getFiles({
        autoPaginate: true,
        delimiter: "/",
        prefix: `jsons/${datetimeStr}/${key}/`,
    });

    // files[0]から一番新しいFileを取得する
    // File.metadata.updatedプロパティからDateクラスを生成して比較する
    const latestFile = files[0].reduce((prev, curr) => {
        const prevDate = new Date(prev.metadata.updated);
        const currDate = new Date(curr.metadata.updated);
        return prevDate > currDate ? prev : curr;
    });

    // console.log(latestFile.name);

    const content = await latestFile.download();

    const datas: XRankingPlayerData[] = JSON.parse(content.toString());

    // res.status(200);
    console.log("API is Called.");
    res.send(datas);
}
