import DashBoard from "@/components/dashboard";

import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import { readFileSync } from "fs";
import path from "path";

import { Storage } from "@google-cloud/storage";

import dayjs from "dayjs";

import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

type AllModeData = {
    xRankingAr: XRankingPlayerData[];
    xRankingGl: XRankingPlayerData[];
    xRankingCl: XRankingPlayerData[];
    xRankingLf: XRankingPlayerData[];
};
export type DashboardProps = {
    datas: XRankingPlayerData[];
};

enum Mode {
    Area = "xRankingAr",
    Rainmaker = "xRankingGl",
    Clam = "xRankingCl",
    Tower = "xRankingLf",
}

const DashboardPage = ({ datas }: DashboardProps) => {
    // return <>hello</>;
    return <DashBoard datas={datas} />;
};

export default DashboardPage;

// export async function getStaticProps() {
//     const filePath = path.join(process.cwd(), "data.json");
//     const buf = readFileSync(filePath);
//     // buffer to string
//     const str = buf.toString();
//     // string to TableData[]
//     const datas: XRankingPlayerData[] = JSON.parse(str);
//     return {
//         props: {
//             datas,
//         },
//     };
// }

export async function getStaticProps() {
    // large-page-dataエラーが出ているのでなんとかする
    // 最初の描画に必要なデータのみをpropsに渡す以外に方法は無いっぽい
    // 追加で必要なデータをfetchするしか無い useSWR + VercelのCacheでOK?

    // on-demand ISRにする予定なのでSSGの書き方でOK
    //
    if (process.env["NODE_ENV"] === "development") {
        const p = path.join(
            process.cwd(),
            `testData/27-May-2023/xRankingAr/xRankingAr.27-May-2023.00.json`
        );

        const buf = readFileSync(p);
        const datas: XRankingPlayerData[] = JSON.parse(buf.toString());
        return {
            props: {
                datas,
            },
        };
    }

    const storage = new Storage({
        projectId: process.env["PROJECT_ID"],
        credentials: {
            client_email: process.env["SERVICEACCOUNT_EMAIL"],
            private_key: process.env["SERVICEACCOUNT_PRIVATE_KEY"],
        },
    });

    const bucketName = process.env["BUCKET_NAME"]!;

    const now = dayjs().tz("Asia/Tokyo");
    const datetimeStr = now.format("DD-MMM-YYYY");

    const bucket = storage.bucket(bucketName);
    const files = await bucket.getFiles({
        autoPaginate: true,
        delimiter: "/",
        prefix: `jsons/${datetimeStr}/xRankingAr/`,
    });

    const latestFile = files[0].reduce((prev, curr) => {
        const prevDate = new Date(prev.metadata.updated);
        const currDate = new Date(curr.metadata.updated);
        return prevDate > currDate ? prev : curr;
    });
    const content = await latestFile.download();

    const datas: XRankingPlayerData[] = JSON.parse(content.toString());

    return {
        props: {
            datas,
        },
    };

    // // cloud storage

    // // 24個揃ってる前日の。取得。
    // // splat3api-data/jsons/28-May-2023/xRankingAr

    // dayjs.extend(utc);
    // dayjs.extend(timezone);

    // const now = dayjs().tz("Asia/Tokyo");

    // // 現在時刻から1日前
    // const yesterday = now.subtract(1, "day");

    // const datetimeStr = yesterday.format("DD-MMM-YYYY");

    // const datas: Data[] = [];

    // const path = `jsons/${datetimeStr}/xRankingAr/xRankingAr.${datetimeStr}.00.json`;
    // const content = (
    //     await storage.bucket(bucketName).file(path).download()
    // ).toString();

    // const datas = JSON.parse(content) as XRankingPlayerData[];
    // console.log(datas);

    // for (const mode of Object.values(Mode)) {
    //     for (let i = 0; i <= 23; i++) {
    //         const path = `jsons/${datetimeStr}/${mode}/${mode}.${datetimeStr}.${i}.json`;
    //         const content = (
    //             await storage.bucket(bucketName).file(path).download()
    //         ).toString();

    //         const parsedData = JSON.parse(content) as Data[];
    //         datas.push(parsedData);

    //     }
    // }

    // return {
    //     props: {
    //         datas,
    //     },
    // };
}
