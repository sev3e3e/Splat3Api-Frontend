"use client";

import useSWRImmutable from "swr/immutable";
import _table from "./_table";

export const XRankPlayerTable = ({
    formattedDate,
    mode,
    region,
}: {
    formattedDate: string;
    mode: string;
    region: "atlantic" | "pacific";
}) => {
    // get from external source
    const { data, error } = useSWRImmutable(
        [formattedDate, mode, region],
        ([formattedDate, mode, region]) => fetcher(formattedDate, mode, region)
    );

    console.log(
        `http://localhost:3000/api/xrank/${formattedDate}/${mode}/${region}`
    );

    console.log(data);
    // const data = await xRankingFetcher(
    //     formattedDate,
    //     mode,
    //     region.charAt(0) as "a" | "p"
    // );

    if (!data) {
        return <>loading!!!!!!!!!!!</>;
    }

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
        // <>
        //     {JSON.stringify(
        //         data?.data.node[
        //             mode === "clamblitz"
        //                 ? "xRankingCl"
        //                 : mode === "rainmaker"
        //                 ? "xRankingGl"
        //                 : mode === "splatzones"
        //                 ? "xRankingAr"
        //                 : "xRankingLf"
        //         ]?.edges!
        //     )}
        // </>
    );
};

async function fetcher(formattedDate: string, mode: string, region: string) {
    return fetch(
        `http://localhost:3000/api/xrank/${formattedDate}/${mode}/${region}`
    ).then((r) => r.json());
}

export default XRankPlayerTable;
