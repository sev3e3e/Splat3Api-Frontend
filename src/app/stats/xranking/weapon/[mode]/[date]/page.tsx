import { Modes } from "@/utils/util";
import { Storage } from "@google-cloud/storage";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import CustomSelect from "./select";
import { getAllJsonsFromGCS } from "@/utils/gcs";
import { xRankingDatesResponse } from "@/app/api/xranking/[mode]/dates/route";
import { SITE_URL } from "@/app/config";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = { mode: string; date: string };
// export async function generateStaticParams() {
//     // modes取得

//     // dates取得 from gcs
//     const files = await getAllJsonsFromGCS();

//     const params: Array<Props> = [];

//     for (const mode of Modes) {
//         for (const file of files[0]) {
//             // 同じmodeか
//             if (file.name.includes(mode.id) && file.name.includes("10.json")) {
//                 const matches = file.name.match(/(\d{2}-[A-Za-z]{3}-\d{4})/m);

//                 if (matches && matches.length > 1) {
//                     params.push({
//                         mode: mode.id,
//                         date: matches[1],
//                     });
//                 }
//             }
//         }
//     }

//     return params;
// }

// 日付ごとにページを作るとreact cache()がされない
// fetch()で自分のapiにアクセスするのはそもそも無駄
const Page = async ({ params }: { params: Props }) => {
    // const datesResponse = await fetch(
    //     `${SITE_URL}/api/xranking/${params.mode}/dates`,
    //     {
    //         referrer: `${SITE_URL}/stats/xranking/weapon/${params.mode}/${params.date}`,
    //         cache: "force-cache",
    //     }
    // );

    // const date = (await datesResponse.json()) as xRankingDatesResponse;

    const files = await getAllJsonsFromGCS();

    const dates: string[] = [];

    for (const mode of Modes) {
        for (const file of files[0]) {
            // 同じmodeか
            if (file.name.includes(mode.id) && file.name.includes("10.json")) {
                const matches = file.name.match(/(\d{2}-[A-Za-z]{3}-\d{4})/m);

                if (matches && matches.length > 1) {
                    dates.push(matches[1]);
                }
            }
        }
    }

    return (
        <>
            <CustomSelect
                mode={params.mode}
                dates={dates}
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
