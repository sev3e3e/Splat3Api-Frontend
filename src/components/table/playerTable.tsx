"use client";

import useSWRImmutable from "swr/immutable";
import _table from "./innerTable";
import router from "next/router";

export const XRankPlayerTable = ({
    formattedDate,
    mode,
    region,
}: {
    formattedDate: string;
    mode: string;
    region: "atlantic" | "pacific";
}) => {
    const { data, error } = useSWRImmutable(
        [formattedDate, mode, region],
        ([formattedDate, mode, region]) => fetcher(formattedDate, mode, region)
    );

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
    );
};

async function fetcher(formattedDate: string, mode: string, region: string) {
    return fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/xrank/${formattedDate}/${mode}/${region}`
    ).then((r) => r.json());
}

export default XRankPlayerTable;
