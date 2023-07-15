import { Mode, Modes } from "@/utils/util";
import { Storage } from "@google-cloud/storage";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import CustomSelect from "./select";
import { getAllJsonsFromGCS } from "@/utils/gcs";
import { xRankingDates } from "./util";
import { use } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = { mode: string; date: string };
export async function generateStaticParams() {
    // const files = await getAllJsonsFromGCS();

    const params: Array<Props> = [];

    // for (const mode of Modes) {
    //     for (const file of files[0]) {
    //         // 同じmodeか
    //         if (file.name.includes(mode.id) && file.name.includes("10.json")) {
    //             const matches = file.name.match(/(\d{2}-[A-Za-z]{3}-\d{4})/m);

    //             if (matches && matches.length > 1) {
    //                 params.push({
    //                     mode: mode.id,
    //                     date: matches[1],
    //                 });
    //             }
    //         }
    //     }
    // }

    for (const mode of Object.keys(xRankingDates)) {
        for (const date of xRankingDates[mode]) {
            params.push({
                mode: mode,
                date: date,
            });
        }
    }

    console.log(xRankingDates);

    return params;
}

// 日付ごとにページを作るとreact cache()がされない
// fetch()で自分のapiにアクセスするのはそもそも無駄
const Page = async ({ params }: { params: Props }) => {
    return (
        <>
            <CustomSelect
                mode={params.mode}
                dates={xRankingDates[params.mode]}
                currentDate={params.date}
            />
            <div>{params.mode}</div>
            <div>{params.date}</div>
        </>
    );
};

const dynamicParams = false;
export { dynamicParams };

export default Page;
