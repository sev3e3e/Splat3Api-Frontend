import { Storage } from "@google-cloud/storage";

// nextjs api handler ts
import { NextApiRequest, NextApiResponse } from "next";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";

import { cache } from "react";

// dayjs imports
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { Mode } from "./util";
import { DetailTabViewXRankingRefetchQuery } from "@/types/DetailTabViewXRankingRefetchQuery";

dayjs.extend(utc);
dayjs.extend(timezone);

const parseCredentials = () => {
    const body = process.env["BASE64_SERVICEACCOUNT_CREDENTIALS"];
    if (!body) throw new Error("BASE64_SERVICEACCOUNT_CREDENTIALS is not set.");
    return JSON.parse(atob(body));
};

const storage = new Storage({
    projectId: process.env["PROJECT_ID"],
    credentials: {
        client_email: process.env["SERVICEACCOUNT_EMAIL"],
        // private_key: process.env["SERVICEACCOUNT_PRIVATE_KEY"]
        //     ? process.env["SERVICEACCOUNT_PRIVATE_KEY"]
        //           .split(String.raw`\n`)
        //           .join("\n")
        //     : "",
        private_key: parseCredentials()["private_key"],
    },
});

/**
 * fetcher
 * @param formattedDate string Date as YYYY/MM/DD
 * @param mode gamemodes
 */
export const xRankingFetcher = async (
    formattedDate: string,
    mode: string,
    region: "a" | "p"
) => {
    const paths = await getFilePaths(
        `jsons/raw/archive/${formattedDate.replace(/-/gm, "/")}/`
    );

    const filteredPaths = paths[0].filter(
        (p) =>
            /\d{4}\/\d{2}\/\d{2}\/\d{4}-\d{2}-\d{2}\.23/gm.test(p.name) &&
            p.name.includes(mode)
    );

    const filePath = filteredPaths.find((p) =>
        p.name.includes(`xrank.detail.${region}`)
    );

    return JSON.parse(
        (await filePath?.download())?.[0].toString() || ""
    ) as DetailTabViewXRankingRefetchQuery;
};

export const getLatestXRankingDataFromGCS = async (mode: Mode) => {
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
        prefix: `jsons/${datetimeStr}/${mode}/`,
    });

    const latestFile = files[0].reduce((prev, curr) => {
        const prevDate = new Date(prev.metadata.updated);
        const currDate = new Date(curr.metadata.updated);
        return prevDate > currDate ? prev : curr;
    });

    const content = await latestFile.download();

    const datas: XRankingPlayerData[] = JSON.parse(content.toString());

    return datas;
};

export const getAllJsonsFromGCS = cache(async () => {
    console.log("requested. ");
    return getFilePaths("jsons/");
});

export const readFileFromGCS = async (path: string) => {
    const storage = new Storage({
        projectId: process.env["PROJECT_ID"],
        credentials: {
            client_email: process.env["SERVICEACCOUNT_EMAIL"],
            private_key: process.env["SERVICEACCOUNT_PRIVATE_KEY"],
        },
    });

    const file = storage.bucket(process.env["BUCKET_NAME"] || "").file(path);

    return file.download();
};

export const getFilePaths = async (prefix: string) => {
    const bucketName = process.env["BUCKET_NAME"]!;
    const bucket = storage.bucket(bucketName);

    return bucket.getFiles({
        prefix: prefix,
    });
};

export const getFilePathsStream = async (prefix: string) => {
    const bucketName = process.env["BUCKET_NAME"]!;
    const bucket = storage.bucket(bucketName);

    return bucket.getFilesStream({
        prefix: prefix,
    });
};
