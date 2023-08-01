import _table from "@/components/table/_table";
import { xRankingFetcher } from "@/utils/gcs";
import dayjs from "dayjs";

type Props = {
    date: string;
    mode: string;
    region: string;
};

const Page = async ({ params }: { params: Props }) => {
    console.log("ggjfvj");
    const { mode, date, region } = params;
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

    //
    if (region !== "atlantic" && region !== "pacific") {
        return <>{"region is invalid."}</>;
    }

    const data = await xRankingFetcher(
        date,
        mode,
        region.charAt(0) as "a" | "p"
    );

    console.log("hello there!");

    return (
        <_table
            data={
                data?.data.node[
                    mode === "clamblitz"
                        ? "xRankingCl"
                        : mode === "rainmaker"
                        ? "xRankingGl"
                        : mode === "splatzones"
                        ? "xRankingAr"
                        : "xRankingLf"
                ]?.edges!
            }
        />
    );
};

export default Page;
