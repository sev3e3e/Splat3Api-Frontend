"use client";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

import { useState } from "react";
import XRankPlayerTable from "@/components/table/playerTable";

import Image from "next/image";

import { Tab } from "@headlessui/react";
import DateComponent from "@/components/_date";
import DatePicker from "@/components/datepicker";
import { useAtom } from "jotai";
import { currentGameModeAtom, currentRegionAtom } from "@/utils/atoms";

type Props = {
    date: string;
};

// all modes, all regions.
// fetch on client, use own api (cuz gcs wrapper uses fs module)
const Page = ({ params }: { params: Props }) => {
    const { date } = params;

    const [region, setRegion] = useAtom(currentRegionAtom);
    const [currentGameMode, setCurrentGameMode] = useAtom(currentGameModeAtom);

    if (/^\d{4}-\d{2}-\d{2}$/.test(date) == false) {
        return <>invalid request.</>;
    }
    return (
        <div className="dark:bg-black">
            <div className="dark:bg-[#161616] ml-3">
                <div className="p-5 mx-auto w-1/2">
                    <DatePicker initialDate={date} />
                </div>
                <Tab.Group>
                    <Tab.List className="flex gap-x-3 items-center mx-auto p-5 w-fit">
                        <Tab
                            onClick={() => setCurrentGameMode("splatzones")}
                            className="ui-not-selected:opacity-50 ui-selected:border-b-2"
                        >
                            <GameModesTabItem
                                src="/modes/game/splatzones.svg"
                                alt="splatzones.svg"
                                text="Splat Zones"
                            />
                        </Tab>
                        <p>|</p>
                        <Tab
                            onClick={() => setCurrentGameMode("towercontrol")}
                            className="ui-not-selected:opacity-50 ui-selected:border-b-2"
                        >
                            <GameModesTabItem
                                src="/modes/game/towercontrol.svg"
                                alt="towercontrol.svg"
                                text="Tower Control"
                            />
                        </Tab>
                        <p>|</p>
                        <Tab
                            onClick={() => setCurrentGameMode("rainmaker")}
                            className="ui-not-selected:opacity-50 ui-selected:border-b-2"
                        >
                            <GameModesTabItem
                                src="/modes/game/rainmaker.svg"
                                alt="rainmaker.svg"
                                text="Rainmaker"
                            />
                        </Tab>
                        <p>|</p>
                        <Tab
                            onClick={() => setCurrentGameMode("clamblitz")}
                            className="ui-not-selected:opacity-50 ui-selected:border-b-2"
                        >
                            <GameModesTabItem
                                src="/modes/game/clamblitz.svg"
                                alt="clamblitz.svg"
                                text="Clam Blitz"
                            />
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <XRankPlayerTable
                                formattedDate={date}
                                mode={"splatzones"}
                                region={region}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <XRankPlayerTable
                                formattedDate={date}
                                mode={"towercontrol"}
                                region={region}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <XRankPlayerTable
                                formattedDate={date}
                                mode={"rainmaker"}
                                region={region}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <XRankPlayerTable
                                formattedDate={date}
                                mode={"clamblitz"}
                                region={region}
                            />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

type GameModesTabItemProps = {
    src: string;
    alt: string;
    text: string;
};
const GameModesTabItem = ({ src, alt, text }: GameModesTabItemProps) => {
    return (
        <>
            <div className="">
                <Image
                    src={src}
                    alt={alt}
                    width={50}
                    height={30}
                    className="mx-auto"
                />
            </div>
            <div className=" text-lg">{text}</div>
        </>
    );
};

export default Page;
