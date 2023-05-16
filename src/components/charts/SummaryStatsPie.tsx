import React from "react";
import { Pie, PieChart } from "recharts";

type Props = {
    data: { name: string; value: number }[];
};

const SummaryStatsPie = React.memo(({ data }: Props) => {
    return (
        <PieChart width={300} height={300}>
            <Pie data={data} dataKey="value" nameKey="name" label />
        </PieChart>
    );
});

SummaryStatsPie.displayName = "SummaryStatsPie";

export default SummaryStatsPie;
