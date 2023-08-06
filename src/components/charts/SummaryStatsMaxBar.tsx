import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Text,
    Cell,
    Legend,
} from "recharts";

import AutoSizer from "react-virtualized-auto-sizer";

import { Weapons } from "@/utils/weaponName";
import React from "react";

type Props = {
    title?: string;
    data: { weapon: string; xPower: number }[];
    maxPower?: number;
    minPower?: number;
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
                width={60}
                height={60}
                x={x - 65}
                y={y - 28}
            />
            {/* <Text
                x={x - 47}
                y={y + 5}
                // angle={-38}
                textAnchor="end"
                fontSize={14}
                fontWeight="Bold"
                fill="#000000"
            >
                {payload.value}
            </Text> */}
        </>
    );
};

const Label = (props: any) => {
    const { value, x, y, width, height } = props;

    return (
        <Text
            x={x + width / 3}
            y={y + height / 1.6}
            fontSize={19}
            fill="#fffcfc"
            fontWeight={"Bold"}
        >
            {value.toFixed(1)}
        </Text>
    );
};

const COLORS = ["#FF4B00", "#1A45B7", "#03AF7A", "#4DC4FF", "#000000"];

const SummaryStatsMaxBar = React.memo(({ data, maxPower, minPower }: Props) => {
    return (
        <div className="h-[400px] w-full">
            <AutoSizer>
                {({ width, height }) => (
                    <BarChart
                        data={data}
                        barCategoryGap={8}
                        margin={{ top: 0, right: 30, bottom: 0, left: 30 }}
                        layout="vertical"
                        width={width}
                        height={height}
                    >
                        <CartesianGrid strokeDasharray="5 5" />

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
                            tickFormatter={(v) => v.toFixed(1)}
                            domain={[
                                minPower !== undefined ? minPower : "datamin",
                                maxPower !== undefined ? maxPower : "datamax",
                            ]}
                        />
                        <Tooltip />
                        <Legend
                            payload={data.map((d, index) => ({
                                id: d.weapon,
                                type: "square",
                                value: d.weapon,
                                color: COLORS[index],
                            }))}
                        />
                        <Bar dataKey="xPower" fill="#2ef1a5" label={Label}>
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                )}
            </AutoSizer>
        </div>
    );
});

SummaryStatsMaxBar.displayName = "SummaryStatsMaxBar";

export default SummaryStatsMaxBar;
