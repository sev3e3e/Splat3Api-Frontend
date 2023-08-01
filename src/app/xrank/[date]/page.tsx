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

type Props = {
    date: string;
};

// all modes, all regions.
// fetch on client, use own api (cuz gcs wrapper uses fs module)
const Page = ({ params }: { params: Props }) => {
    console.log("hello");
    const { date } = params;
    const [region, setRegion] = useState<"atlantic" | "pacific">("pacific");

    // check date
    const parsedDate = dayjs.utc(date, "YYYY-MM-DD");
    const formattedDate = parsedDate.format("YYYY-MM-DD");
    if (!parsedDate.isValid() || parsedDate.isBefore("2023/03/01", "d")) {
        return <>{"date is invalid."}</>;
    }

    return (
        <Tab.Group>
            <Tab.List className="flex gap-x-3 items-center mx-auto p-5 w-fit">
                <Tab className="ui-not-selected:opacity-50 ui-selected:border-b-2">
                    <GameModesTabItem
                        src="/modes/game/splatzones.svg"
                        alt="splatzones.svg"
                        text="Splat Zones"
                    />
                </Tab>
                <p>|</p>
                <Tab className="ui-not-selected:opacity-50 ui-selected:border-b-2">
                    <GameModesTabItem
                        src="/modes/game/towercontrol.svg"
                        alt="towercontrol.svg"
                        text="Tower Control"
                    />
                </Tab>
                <p>|</p>
                <Tab className="ui-not-selected:opacity-50 ui-selected:border-b-2">
                    <GameModesTabItem
                        src="/modes/game/rainmaker.svg"
                        alt="rainmaker.svg"
                        text="Rainmaker"
                    />
                </Tab>
                <p>|</p>
                <Tab className="ui-not-selected:opacity-50 ui-selected:border-b-2">
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
                        formattedDate={formattedDate}
                        mode={"splatzones"}
                        region={region}
                    />
                </Tab.Panel>
                <Tab.Panel>
                    <XRankPlayerTable
                        formattedDate={formattedDate}
                        mode={"towercontrol"}
                        region={region}
                    />
                </Tab.Panel>
                <Tab.Panel>
                    <XRankPlayerTable
                        formattedDate={formattedDate}
                        mode={"rainmaker"}
                        region={region}
                    />
                </Tab.Panel>
                <Tab.Panel>
                    <XRankPlayerTable
                        formattedDate={formattedDate}
                        mode={"clamblitz"}
                        region={region}
                    />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
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
