"use client";

import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import {
    BarChart,
    ResponsiveContainer,
    Bar,
    XAxis,
    YAxis,
    Text,
} from "recharts";
import { convertToWeaponData } from "../table/utils";
import { Weapons } from "@/utils/weaponName";
import { XRankingWeaponData } from "@/utils/types";

type Props = {
    datas: XRankingWeaponData[];
};

const Tick = ({ x, y, payload }: { x: number; y: number; payload: any }) => {
    const filename: string = Weapons[payload.value];
    let name = "";
    if (filename !== undefined) {
        name = filename.replace(/\s/g, "_");
    }

    // const { sub, special } = getWeaponSubAndSpecial(payload.value);

    return (
        <>
            {/* weapon */}
            <image
                xlinkHref={`/weapons/main/2d/${name}.webp`}
                width={60}
                height={60}
                x={x - 75}
                y={y - 35}
            />

            {/* sub */}
            {/* <image
                xlinkHref={`/weapons/sub/gray/${sub}.png`}
                width={20}
                height={20}
                x={x - 40}
                y={y - 35}
            /> */}

            {/* special */}
            {/* <image
                xlinkHref={`/weapons/sp/gray/${special}.png`}
                width={20}
                height={20}
                x={x - 40}
                y={y - 10}
            /> */}
            <Text
                x={x - 49}
                y={y + 32}
                // angle={-38}
                textAnchor="middle"
                fill="#FFFFFF"
                className="tracking-tighter font-base text-xs"
            >
                {payload.value}
            </Text>
        </>
    );
};

const Label = (props: any) => {
    const { name, value, x, y, width, height } = props;

    return (
        <Text
            x={x + width + 5}
            y={y + height / 1.65}
            fill="#FFFFFF"
            className="font-bold text-xl"
        >
            {`${value.toFixed(1)}`}
        </Text>
    );
};

const WeaponXPowerBarChart = ({ datas }: Props) => {
    // const weaponDatas = convertToWeaponData(datas);
    // weaponDatasからMaxXPower max 抽出
    const max = Math.max(...datas.map((d) => d.MaxXPower));

    // minも
    const min = Math.min(...datas.map((d) => d.MaxXPower));
    return (
        <ResponsiveContainer width={"100%"} height={datas.length * 78}>
            <BarChart
                data={datas}
                layout="vertical"
                barCategoryGap={17}
                margin={{
                    top: 10,
                    left: 10,
                    right: 80,
                }}
            >
                <XAxis dataKey="MaxXPower" type="number" domain={[min, max]} />
                <YAxis
                    type="category"
                    dataKey="name"
                    interval={0}
                    tick={Tick}
                    className=""
                    width={100}
                    // tick
                />
                {/* <Tooltip /> */}
                {/* <CartesianGrid /> */}
                {/* <Bar dataKey="xPower" fill="#2ef1a5" label={Label} /> */}
                <Bar dataKey="MaxXPower" fill="#abb2bf" label={Label} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default WeaponXPowerBarChart;
