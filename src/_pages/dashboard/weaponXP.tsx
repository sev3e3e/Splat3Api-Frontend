import { classNames } from "@/utils/util";
import Image from "next/image";
import { useMemo, useState } from "react";

import { DashboardProps } from "@/pages/dashboard";
import WeaponRankingTable, {
    TableData,
} from "@/components/table/weaponRankingTable";

const WeaponXPowerDashBoard = ({
    xRankingAr,
    xRankingGl,
    xRankingCl,
    xRankingLf,
}: DashboardProps) => {
    const [currentGameMode, setCurrentGameMode] = useState("エリア");
    const [currentRankingMode, setCurrentRankingMode] = useState("XPower");
    const [isTimeseriesChart, setIsTimeSeriesChart] = useState(false);

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
                tabName: "XPower",
            },
            {
                tabName: "Usage rate",
            },
        ],
        []
    );

    return (
        <div className="w-full h-fit flex flex-col items-center">
            <div className="h-fit w-[80%] bg-white text-center pb-3 pt-2 border-b-2">
                <div className="text-lg">{"2023春 Fresh Season"}</div>
                <div className="text-sm opacity-90">
                    {"2023/03/01 09:00 - 2023/6/1 08:59"}
                </div>
            </div>

            {/* game modes tab, ranking modes tab */}
            <div className="w-full flex flex-col justify-center items-center text-center sticky top-0 z-30 bg-white gap-y-1 pt-1 pb-3 border-gray-100 border-b-4">
                {/* game modes tab */}
                <div>{"Weapon XPower Rankings"}</div>
                <div className="flex flex-col gap-y-1">
                    <div className="text-sm">Game modes</div>
                    <div className="flex gap-x-6">
                        {Object.values(datas).map((category) => (
                            <button
                                key={category.name}
                                className={classNames(
                                    "text-sm text-black font-medium  ring-offset-2 ring-black",
                                    currentGameMode == category.name
                                        ? "shadow ring-2"
                                        : "text-[#808080] hover:bg-white/[0.4] hover:text-[#303030] opacity-30"
                                )}
                                onClick={() =>
                                    setCurrentGameMode(category.name)
                                }
                            >
                                <Image
                                    src={category.iconPath}
                                    alt={`${category.name} Icon`}
                                    width={33}
                                    height={33}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* ranking modes tab */}
                {/* <div className="flex w-fit flex-col gap-y-1 pb-2">
                    <div className="text-sm">Ranking types</div>
                    <div className="flex">
                        {rankingModes.map((content, index) => {
                            return (
                                <button
                                    key={index}
                                    className={classNames(
                                        "w-full font-semibold tracking-tight text-sm whitespace-nowrap",
                                        currentRankingMode == content.tabName
                                            ? "bg-white text-black ring-black ring-2"
                                            : " opacity-40"
                                    )}
                                    onClick={() =>
                                        setCurrentRankingMode(content.tabName)
                                    }
                                >
                                    <div className="px-5 py-1">
                                        {content.tabName}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div> */}
            </div>

            {/* main panel */}
            <div
                key={`mainpanel-${datas[currentGameMode].name}`}
                className="py-2"
            >
                <WeaponRankingTable
                    datas={datas[currentGameMode].data}
                    showXPower={currentRankingMode == "XPower" ? true : false}
                />
            </div>

            <div className="flex justify-center items-start gap-x-1 text-sm pb-1">
                <div>{`Updated at `}</div>
                <div>{`2023/05/31 03:07`}</div>
            </div>

            {/* footer */}
            {/* <div className="h-fit w-full sticky bottom-0 pt-1 bg-white">
                <div className="w-full h-full justify-center flex gap-x-10 bg-gray-200 p-3">
                    <Link
                        className="w-full rounded-full bg-green-500 text-white py-[6px] px-10 text-xs tracking-wider whitespace-nowrap text-center"
                        href={"/"}
                    >
                        {"TOP画面へ戻る"}
                    </Link>
                </div>
            </div> */}
        </div>
    );
};

export default WeaponXPowerDashBoard;
