import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import React from "react";

export type xPowerBarProps = {
    data: XRankingPlayerData[];
};

const XPowerBar = React.memo(({ data }: xPowerBarProps) => {
    return (
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={["datamin", "datamax"]} />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="xPower" fill="#2ef1a5" />
        </BarChart>
    );
});

XPowerBar.displayName = "xPowerBar";

export default XPowerBar;
