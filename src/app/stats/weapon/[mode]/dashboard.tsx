"use client";

import WeaponXPowerBarChart from "@/components/charts/weaponXPowerChart";
import WeaponXPowerTable from "@/components/table/weaponXPowerTable";
import { XRankingWeaponData } from "@/utils/types";
import { useState } from "react";

type SHOW_CHART_MODE = "Table" | "Charts";
type XPOWER_CALC_MODE = "Max" | "Min" | "Mean";

type Props = {
    datas: XRankingWeaponData[];
};

const WeaponXPDashBoard = ({ datas }: Props) => {
    const [currentChartMode, setCurrentChartMode] =
        useState<SHOW_CHART_MODE>("Table");

    const [currentXPowerCalcMode, setCurrentXPowerCalcMode] =
        useState<XPOWER_CALC_MODE>("Max");

    return (
        <div className="">
            <WeaponXPowerTable datas={datas} />
            {/* <WeaponXPowerBarChart datas={datas} />; */}
        </div>
    );
};

export default WeaponXPDashBoard;
