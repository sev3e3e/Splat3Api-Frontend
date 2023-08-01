import Link from "next/link";
import Image from "next/image";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

const NavigationBar = () => {
    const date_to = dayjs.utc().format("YYYY/MM/DD");

    let date_current = dayjs.utc("2023/03/01");
    const dates = [];
    while (date_current.isBefore(date_to)) {
        dates.push(date_current.format("YYYY/MM/DD"));
        date_current = date_current.add(1, "day");
    }

    return (
        <div className="fixed h-[100dvh] flex flex-col overflow-scroll">
            <div>splatoon3 xranking stats</div>
            <div className="flex-1">
                <div className="flex-col flex">
                    <Link href="/">Home</Link>
                    <Link href="/">Home</Link>
                    {dates.map((date) => {
                        return (
                            <Link
                                href={`/xrank/${date.replace(/\//gm, "-")}/`}
                                prefetch={false}
                                key={date}
                            >
                                {date}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="sticky bottom-0">About this site</div>
        </div>
    );
};

// 手動でTreeView生成
// revalidate設定すれば勝手に更新されるはず

export default NavigationBar;
