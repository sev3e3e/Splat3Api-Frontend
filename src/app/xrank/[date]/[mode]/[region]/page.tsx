import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getFilePaths } from "@/utils/gcs";
import { DetailTabViewXRankingRefetchQuery } from "@/types/DetailTabViewXRankingRefetchQuery";
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const dynamicParams = true; // true | false,

export async function generateStaticParams() {
    return [];
}

type Props = { mode: string; date: string; region: string };
const Page = async ({ params }: { params: Props }) => {
    const { mode, date, region } = params;
    // 1日の終わりのデータ
    // Splatoon3の店更新時間はUTC0時(12am)なので、11amのデータを使用する

    // check date
    const parsedDate = dayjs.utc(date, "YYYY-MM-DD");
    if (!parsedDate.isValid() || parsedDate.isBefore("2023/03/01", "d")) {
        return <>{"date is invalid."}</>;
    }

    // check mode
    if (
        mode !== "towercontrol" &&
        mode !== "rainmaker" &&
        mode !== "clamblitz" &&
        mode !== "splatzones"
    ) {
        return <>{"mode is invalid."}</>;
    }

    // check region
    if (region !== "atlantic" && region !== "pacific") {
        return <>{"region is invalid"}</>;
    }

    const formattedDate = parsedDate.format("YYYY/MM/DD");

    // get requested date paths
    const paths = await getFilePaths(`jsons/raw/archive/${formattedDate}/`);

    const filteredPaths = paths[0].filter(
        (p) =>
            /\d{4}\/\d{2}\/\d{2}\/\d{4}-\d{2}-\d{2}\.23/gm.test(p.name) &&
            p.name.includes(mode)
    );

    const filePath = filteredPaths.find((p) =>
        p.name.includes(`xrank.detail.${region.charAt(0)}`)
    );

    const data = JSON.parse(
        (await filePath?.download())?.[0].toString() || ""
    ) as DetailTabViewXRankingRefetchQuery;

    return (
        <div>
            <div>{date}</div>
            <div>{mode}</div>
            <div>{region}</div>
            <div>{parsedDate.format()}</div>
            <div>{`seasonID: ${data.data.node.id}`}</div>
            <div>
                {
                    data.data.node[
                        mode === "clamblitz"
                            ? "xRankingCl"
                            : mode === "rainmaker"
                            ? "xRankingGl"
                            : mode === "splatzones"
                            ? "xRankingAr"
                            : "xRankingLf"
                    ]?.edges[0].node.name
                }
            </div>
        </div>
    );
};

export default Page;
