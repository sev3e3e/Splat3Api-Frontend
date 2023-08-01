"use client";

import { _PlayerTable } from "@/components/table/playerTable";
import { DetailTabViewXRankingRefetchQuery } from "@/types/DetailTabViewXRankingRefetchQuery";

type Data = {
    mode: string;
    atlantic: DetailTabViewXRankingRefetchQuery;
    pacific: DetailTabViewXRankingRefetchQuery;
};

const DashBoard = (data: { data: Data }) => {
    return (
        <div>
            <div>
                <_PlayerTable
                    datas={
                        data.data.atlantic.data.node[
                            data.data.mode === "clamblitz"
                                ? "xRankingCl"
                                : data.data.mode === "rainmaker"
                                ? "xRankingGl"
                                : data.data.mode === "splatzones"
                                ? "xRankingAr"
                                : "xRankingLf"
                        ]?.edges!
                    }
                />
            </div>
            <div>
                <_PlayerTable
                    datas={
                        data.data.pacific.data.node[
                            data.data.mode === "clamblitz"
                                ? "xRankingCl"
                                : data.data.mode === "rainmaker"
                                ? "xRankingGl"
                                : data.data.mode === "splatzones"
                                ? "xRankingAr"
                                : "xRankingLf"
                        ]?.edges!
                    }
                />
            </div>
        </div>
    );
};

export default DashBoard;
