"use client";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { useState } from "react";
import XRankPlayerTable from "@/components/table/playerTable";
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

import { Tab } from "@headlessui/react";

export const fetchCache = "force-cache";

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

    // def data: splatzones, pacific
    // 最初にfetchしなくてもいーかなあ

    return (
        <Tab.Group>
            <Tab.List className="flex gap-x-3">
                <Tab>Splat Zones</Tab>
                <Tab>Tower Control</Tab>
                <Tab>Rainmaker</Tab>
                <Tab>Clam Blitz</Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>
                    {"tab"}
                    <XRankPlayerTable
                        formattedDate={formattedDate}
                        mode={"splatzones"}
                        region={region}
                    />
                </Tab.Panel>
                <Tab.Panel>
                    {"tab"}
                    <XRankPlayerTable
                        formattedDate={formattedDate}
                        mode={"towercontrol"}
                        region={region}
                    />
                </Tab.Panel>
                <Tab.Panel>
                    {"tab"}
                    <XRankPlayerTable
                        formattedDate={formattedDate}
                        mode={"rainmaker"}
                        region={region}
                    />
                </Tab.Panel>
                <Tab.Panel>
                    {"tab"}
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

export default Page;
