"use client";

import WeaponXPowerBarChart from "@/components/charts/weaponXPowerChart";
import WeaponXPowerTable from "@/components/table/weaponXPowerTable";
import { XRankingWeaponData } from "@/utils/types";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { useState } from "react";

dayjs.locale("ja");
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

type SHOW_CHART_MODE = "Table" | "Charts";
type XPOWER_CALC_MODE = "Max" | "Min" | "Mean";

type Props = {
    datas: XRankingWeaponData[];
    dates: string[];
};

const WeaponXPDashBoard = ({ datas, dates }: Props) => {
    const [currentXPowerCalcMode, setCurrentXPowerCalcMode] =
        useState<XPOWER_CALC_MODE>("Max");

    return (
        <div className="">
            {/* forms */}
            <div className="flex justify-center pt-1 pb-5">
                <select
                    name="periods"
                    id="period-select"
                    className="bg-gray-800 rounded-xl px-1"
                >
                    {dates.map((date) => {
                        //27-May-2023.00

                        const parsedDate = dayjs(
                            date,
                            "DD-MMM-YYYY.HH",
                            true
                        ).tz("Asia/Tokyo");

                        return (
                            <option
                                key={parsedDate.toString()}
                                value={parsedDate.toString()}
                            >
                                {`${parsedDate.format()} ~ ${parsedDate
                                    .add(1, "hour")
                                    .format()}`}
                            </option>
                        );
                    })}
                </select>
            </div>
            <WeaponXPowerTable datas={datas} />
            {/* <WeaponXPowerBarChart datas={datas} />; */}
        </div>
    );
};

export default WeaponXPDashBoard;
