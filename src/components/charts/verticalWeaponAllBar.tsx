import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Text,
} from "recharts";

import { Weapons } from "@/utils/weaponName";
import React from "react";

type Props = {
    data: { weapon: string; xPower: number }[];
    range: number;
    calcMode: string;
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
                width={40}
                height={40}
                x={x - 40}
                y={y - 20}
            />
            <Text
                x={x - 47}
                y={y + 5}
                // angle={-38}
                textAnchor="end"
                fontSize={14}
                fontWeight="Bold"
            >
                {payload.value}
            </Text>
        </>
    );
};

const Label = (props: any) => {
    const { value, x, y, width } = props;

    return (
        <Text x={x + 12} y={y + 18} width={width}>
            {value}
        </Text>
    );
};

const VericalWeaponAllBar = React.memo(({ data, range, calcMode }: Props) => {
    return (
        <BarChart
            width={1070}
            height={2150}
            data={data}
            barCategoryGap={8}
            margin={{ top: 10, right: 10, bottom: 10, left: 190 }}
            layout="vertical"
        >
            <CartesianGrid strokeDasharray="3 3" />
            {/* <XAxis dataKey="weapon" interval={0} tick={Tick} />
            <YAxis domain={["datamin", "datamax"]} /> */}
            <YAxis
                type="category"
                dataKey="weapon"
                interval={0}
                tick={Tick}
                tickMargin={5}
            />
            <XAxis
                type="number"
                dataKey="xPower"
                domain={["datamin", "datamax"]}
            />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="xPower" fill="#2ef1a5" label={Label}>
                {/* <LabelList dataKey={"weapon"} content={Label} /> */}
            </Bar>
        </BarChart>
    );
});

VericalWeaponAllBar.displayName = "VerticalWeaponAllbar";

export default VericalWeaponAllBar;
