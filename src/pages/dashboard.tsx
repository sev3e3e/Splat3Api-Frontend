import DashBoard from "@/components/dashboard";

import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import { readFileSync } from "fs";
import path from "path";

const DashboardPage = ({ datas }: { datas: XRankingPlayerData[] }) => {
    return <DashBoard datas={datas} />;
};

export default DashboardPage;

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), "data.json");
    const buf = readFileSync(filePath);
    // buffer to string
    const str = buf.toString();
    // string to TableData[]
    const datas: XRankingPlayerData[] = JSON.parse(str);
    return {
        props: {
            datas,
        },
    };
}
