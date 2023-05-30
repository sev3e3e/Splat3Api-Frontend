import { classNames } from "@/utils/util";
import Image from "next/image";
import WeaponRankingTable, { TableData } from "./table/weaponRankingTable";
import { useMemo, useState } from "react";

import { DashboardProps } from "@/pages/dashboard";

const DashBoard = ({
    xRankingAr,
    xRankingGl,
    xRankingCl,
    xRankingLf,
}: DashboardProps) => {
    const [currentGameMode, setCurrentGameMode] = useState("エリア");
    const [currentRankingMode, setCurrentRankingMode] =
        useState("Xパワーランキング");

    const datas: {
        [key: string]: {
            name: string;
            iconPath: string;
            data: TableData[];
        };
    } = useMemo(
        () => ({
            エリア: {
                name: "エリア",
                iconPath: "/modes/game/area.svg",
                data: xRankingAr,
            },
            ヤグラ: {
                name: "ヤグラ",
                iconPath: "/modes/game/tower.svg",
                data: xRankingLf,
            },
            ホコ: {
                name: "ホコ",
                iconPath: "/modes/game/rainmaker.svg",
                data: xRankingGl,
            },
            アサリ: {
                name: "アサリ",
                iconPath: "/modes/game/clam.svg",
                data: xRankingCl,
            },
        }),
        [xRankingAr, xRankingCl, xRankingGl, xRankingLf]
    );

    const rankingModes = useMemo(
        () => [
            {
                tabName: "Xパワーランキング",
            },
            {
                tabName: "使用率ランキング",
            },
        ],
        []
    );

    return (
        <div className="w-full h-fit flex flex-col items-center">
            {/* stacked area */}
            <div className="h-fit w-full bg-white text-center py-2">
                <div className="text-lg">{"2023春 Fresh Season"}</div>
                <div className="text-sm opacity-90">
                    {"2023/03/01 09:00 - 2023/6/1 08:59"}
                </div>
            </div>
            <div className="flex justify-center items-start gap-x-1">
                <div>{`Updated at `}</div>
                <div>{`2023/05/31 03:07`}</div>
            </div>

            {/* game modes tab */}
            <div className="flex">
                {Object.values(datas).map((category) => (
                    <button
                        key={category.name}
                        className={classNames(
                            "rounded-sm text-sm text-black font-medium  ring-offset-1 ring-gray-100",
                            currentGameMode == category.name
                                ? "bg-white shadow ring-2"
                                : "text-[#808080] hover:bg-white/[0.4] hover:text-[#303030] opacity-30"
                        )}
                        onClick={() => setCurrentGameMode(category.name)}
                    >
                        <div>
                            <div className="flex flex-col justify-center items-center">
                                {/* <div className="text-xl">
                                            {category.name}
                                        </div> */}
                                <Image
                                    src={category.iconPath}
                                    alt={`${category.name} Icon`}
                                    width={55}
                                    height={55}
                                />
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* ranking modes tab */}
            <div className="flex">
                {rankingModes.map((content, index) => {
                    return (
                        <button
                            key={index}
                            className={classNames(
                                "w-full font-semibold tracking-tight text-base",
                                currentRankingMode == content.tabName
                                    ? "bg-white text-black underline"
                                    : "bg-gray-400 text-white opacity-40"
                            )}
                            onClick={() =>
                                setCurrentRankingMode(content.tabName)
                            }
                        >
                            <div className="px-5 py-3">{content.tabName}</div>
                        </button>
                    );
                })}
            </div>

            {/* main panel */}
            <div key={`mainpanel-${datas[currentGameMode].name}`}>
                <WeaponRankingTable
                    datas={datas[currentGameMode].data}
                    showXPower={
                        currentRankingMode == "Xパワーランキング" ? true : false
                    }
                />
            </div>

            {/* footer */}
            <div className="h-fit w-full sticky bottom-0 pt-1 bg-white">
                <div className="w-full h-full justify-center flex gap-x-10 bg-gray-200 p-3">
                    <button className="rounded-full bg-green-500 text-white py-[6px] px-10 text-xs tracking-wider">
                        {"グラフで見る"}
                    </button>
                    <button className="rounded-full bg-gray-500 text-white py-[6px] px-10 text-xs tracking-wider">
                        {"上へ戻る"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
