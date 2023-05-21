import { Weapons } from "@/utils/weaponName";
import React from "react";
import { Cell, Pie, PieChart, Text } from "recharts";

type Props = {
    title?: string;
    data: { name: string; value: number }[];
};

const SummaryStatsUsagePie = React.memo(({ title, data }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center">
            {title && <p className="text-lg">{title}</p>}
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    label={(entry) => {
                        const filename: string = Weapons[entry.name];
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
                                    x={entry.x - 40}
                                    y={entry.y - 20}
                                />
                                <Text
                                    x={entry.x}
                                    y={entry.y}
                                    textAnchor="end"
                                    fontSize={14}
                                    fontWeight="Bold"
                                >
                                    {entry.name}
                                </Text>
                            </>
                        );
                    }}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={"#000000"} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
});

SummaryStatsUsagePie.displayName = "SummaryStatsUsagePie";

export default SummaryStatsUsagePie;
