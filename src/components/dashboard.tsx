import {
    Mode,
    classNames,
    gcsXRankingFetcher,
    getWeaponImageFileName,
    getWeaponSubAndSpecial,
    playerDataToTableData,
} from "@/utils/util";
import {
    Shooter,
    Charger,
    Blaster,
    Roller,
    Slosher,
    Splatling,
    Dualie,
    Brella,
    Splatana,
    Stringer,
    Brush,
} from "@/utils/weaponPool";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import WeaponRankingTable, { TableData } from "./table/weaponRankingTable";
import { useMemo } from "react";
import { GameMode, XRankingPlayerData } from "@sev3e3e/splat3api-client";

import useSWRImmutable from "swr/immutable";
import { DashboardProps } from "@/pages/dashboard";

const Categories = [
    { name: "エリア", iconPath: "/modes/game/area.svg" },
    { name: "ヤグラ", iconPath: "/modes/game/tower.svg" },
    { name: "ホコ", iconPath: "/modes/game/rainmaker.svg" },
    { name: "アサリ", iconPath: "/modes/game/clam.svg" },
];

const DashBoard = ({
    xRankingAr,
    xRankingGl,
    xRankingCl,
    xRankingLf,
}: DashboardProps) => {
    // const weaponDatas = useMemo(() => playerDataToTableData(datas), [datas]);

    return (
        <div className="w-full h-[10000px] flex flex-col items-center">
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

            <div className="w-full">
                <Tab.Group>
                    {/* game modes */}
                    <Tab.List className="flex justify-center items-center w-full bg-gray-400 p-2 ">
                        {Categories.map((category) => (
                            <Tab
                                key={category.name}
                                className={({ selected }) =>
                                    classNames(
                                        "w-full h-full rounded-sm text-sm text-black font-medium  ring-offset-1 ring-gray-100",
                                        selected
                                            ? "bg-white shadow ring-2"
                                            : "text-[#808080] hover:bg-white/[0.4] hover:text-[#303030] opacity-30"
                                    )
                                }
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
                            </Tab>
                        ))}
                    </Tab.List>

                    {/* panels */}
                    <Tab.Panels className="bg-gray-200 pt-2">
                        <Tab.Panel className="flex flex-auto flex-col">
                            <div className="bg-white">
                                <DashBoardInnerTab
                                    datas={xRankingAr}
                                    mode={Mode.Area}
                                />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel className="flex flex-auto flex-col">
                            <div className="bg-white">
                                <DashBoardInnerTab
                                    datas={xRankingGl}
                                    mode={Mode.Rainmaker}
                                />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel className="flex flex-auto flex-col">
                            <div className="bg-white">
                                <DashBoardInnerTab
                                    datas={xRankingCl}
                                    mode={Mode.Clam}
                                />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel className="flex flex-auto flex-col">
                            <div className="bg-white">
                                <DashBoardInnerTab
                                    datas={xRankingLf}
                                    mode={Mode.Tower}
                                />
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
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

type DashBoardInnerTabProps = {
    datas: TableData[];
    mode: Mode;
};

const DashBoardInnerTab = ({ datas, mode }: DashBoardInnerTabProps) => {
    // モードを引数に取り、useSWRでデータをフェッチ。それをstateに保存
    //

    // const { data, error, isLoading } = useSWRImmutable(
    //     `/api/gcs?key=${mode}`,
    //     gcsXRankingFetcher,
    //     {
    //         fallbackData: datas,
    //     }
    // );

    // if (!data || isLoading) return <></>;

    // const tableData: TableData[] = playerDataToTableData(data);

    const contents = [
        {
            tabName: "Xパワーランキング",
        },
        {
            tabName: "使用率ランキング",
        },
    ];
    return (
        <Tab.Group>
            <Tab.List className="flex w-full pt-1 bg-white">
                {contents.map((content, index) => {
                    return (
                        <Tab
                            key={index}
                            className={({ selected }) =>
                                classNames(
                                    "w-full font-semibold tracking-tight text-base",
                                    selected
                                        ? "bg-white text-black underline"
                                        : "bg-gray-400 text-white opacity-40"
                                )
                            }
                        >
                            <div className="px-5 py-3">{content.tabName}</div>
                        </Tab>
                    );
                })}
            </Tab.List>
            <Tab.Panels className="h-fit bg-[#dee2e6] m-3 p-2 rounded-md">
                <Tab.Panel className="h-full">
                    <WeaponRankingTable datas={datas} showXPower={true} />
                </Tab.Panel>
                <Tab.Panel>
                    <WeaponRankingTable datas={datas} showXPower={false} />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};
export default DashBoard;
