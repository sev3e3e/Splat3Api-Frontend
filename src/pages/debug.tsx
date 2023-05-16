import DashBoard from "@/components/dashboard";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import { readFileSync } from "fs";
import path from "path";

export default function debugPage({ data }: { data: XRankingPlayerData[] }) {
    return (
        <>
            <DashBoard data={data} mode="アサリ" />
        </>
    );
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), "data.json");
    const buf = readFileSync(filePath);
    // buffer to string
    const str = buf.toString();
    // string to TableData[]
    const data: XRankingPlayerData[] = JSON.parse(str);
    return {
        props: {
            data,
        },
    };
}
