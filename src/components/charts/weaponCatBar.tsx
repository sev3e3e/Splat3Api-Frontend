import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import React from "react";
import {
    Bar,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    Text,
    BarChart,
} from "recharts";

import { Weapons } from "@/utils/weaponName";

type Props = {
    data: XRankingPlayerData[];
    min: number;
    max: number;
};

const Tick = ({ x, y, payload }: { x: number; y: number; payload: any }) => {
    const filename: string = Weapons[payload.value];
    let name = "";
    if (filename !== undefined) {
        name = filename.replace(/\s/g, "_");
    }

    return (
        <>
            <image
                xlinkHref={`/weapons/${name}.png`}
                width={35}
                height={35}
                x={x - 40}
                y={y - 18}
            />
            <Text
                x={x - 45}
                y={y + 5}
                // angle={-38}
                textAnchor="end"
                fontSize={14}
                fontWeight="Bold"
                fill="#000000"
            >
                {payload.value}
            </Text>
        </>
    );
};

const Label = (props: any) => {
    const { value, x, y, width, height } = props;

    return (
        <Text x={x + width / 2} y={y + height / 1.6} fill="#000000">
            {value}
        </Text>
    );
};

const WeaponCategoryBar = React.memo(({ data, min, max }: Props) => {
    let height = data.length * 29 + data.length * 20;
    if (height < 60) {
        height = 60;
    }
    return (
        <BarChart
            width={430}
            height={height}
            layout="vertical"
            data={data}
            margin={{ right: 0, left: 180 }}
            barCategoryGap={6}
        >
            <XAxis type="number" domain={[min, max]} />
            <YAxis type="category" dataKey="weapon" interval={0} tick={Tick} />
            <Tooltip />
            <CartesianGrid />
            <Bar dataKey="xPower" fill="#2ef1a5" label={Label} />
        </BarChart>
    );
});

WeaponCategoryBar.displayName = "WeaponCategoryBar";

export default WeaponCategoryBar;
