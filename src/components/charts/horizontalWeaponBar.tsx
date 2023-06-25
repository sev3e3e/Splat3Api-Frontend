import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Text,
    LabelList,
} from "recharts";

import { Weapons } from "@/utils/weaponName";
import React from "react";

type Props = {
    data: { weapon: string; xPower: number }[];
};

const Tick = ({ x, y, payload }: { x: number; y: number; payload: any }) => {
    return (
        <>
            <Text
                x={x}
                y={y + 10}
                angle={-38}
                textAnchor="end"
                fontSize={15}
                fontWeight="Bold"
            >
                {payload.value}
            </Text>
        </>
    );
};

const Label = (props: any) => {
    const { value, x, y } = props;
    const filename: string = Weapons[value];
    let name = "";
    if (filename !== undefined) {
        name = filename.replace(/\s/g, "_");
    }

    return (
        <image
            xlinkHref={`/weapons/${name}.png`}
            width={30}
            height={30}
            x={x - 4}
            y={y - 30}
        />
    );
};

const HorizontalWeaponBar = React.memo(({ data }: Props) => {
    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 30, right: 10, bottom: 140, left: 70 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="weapon" interval={0} tick={Tick} />
            <YAxis domain={["datamin", "datamax"]} />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="xPower" fill="#2ef1a5">
                <LabelList dataKey={"weapon"} content={Label} />
            </Bar>
        </BarChart>
    );
});

HorizontalWeaponBar.displayName = "HorizontalWeaponAllBar";

export default HorizontalWeaponBar;
