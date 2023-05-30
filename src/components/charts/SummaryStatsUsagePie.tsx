import { Weapons } from "@/utils/weaponName";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { Cell, Pie, PieChart, Text } from "recharts";

type Props = {
    data: { name: string; value: number }[];
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = (props: any) => {
    const {
        cx,
        cy,
        midAngle,
        outerRadius,
        fill,
        payload,
        percent,
        value,
        centerText,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 30 * 0.5;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    const filename: string = Weapons[payload.name];
    let name = "";
    if (filename !== undefined) {
        name = filename.replace(/\s/g, "_");
    }

    return (
        <g>
            {/* <text x={cx} y={cy} textAnchor="middle" fill={fill}>
                {centerText.title}
            </text>
            <text x={cx} y={cy} dy={20} textAnchor="middle" fill={fill}>
                {centerText.value}
            </text> */}

            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            {/* <text
                style={{ fontWeight: "bold" }}
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill={fill}
                fontSize={23}
            >
                {payload.name}
            </text> */}
            <image
                xlinkHref={`/weapons/${name}.png`}
                x={ex + (cos >= 0 ? 0.1 : -3.3) * 20}
                y={ey - 30}
                textAnchor={textAnchor}
                width={60}
                height={60}
            />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={38}
                textAnchor={textAnchor}
                fill="#999"
                fontSize={40}
            >
                {`${value}`}
            </text>
        </g>
    );
};

const CustomPieChartLabel = React.memo(renderCustomizedLabel);

const SummaryStatsUsagePie = React.memo(({ data }: Props) => {
    return (
        <div className="h-[300px] w-full">
            <AutoSizer>
                {({ width, height }) => (
                    <PieChart
                        width={width}
                        height={height}
                        margin={{ top: 60, right: 60, bottom: 60, left: 60 }}
                    >
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            // cx="50%"
                            // cy="50%"
                            // innerRadius={80}
                            // outerRadius={90}
                            isAnimationActive={false}
                            label={<CustomPieChartLabel />}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={"#000000"} />
                            ))}
                        </Pie>
                    </PieChart>
                )}
            </AutoSizer>
        </div>
    );
});

SummaryStatsUsagePie.displayName = "SummaryStatsUsagePie";

export default SummaryStatsUsagePie;
