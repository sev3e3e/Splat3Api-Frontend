import Link from "next/link";
import Image from "next/image";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

import localfont from "@next/font/local";
import { Disclosure } from "@headlessui/react";
import InnerNavBar from "./innerNavigationBar";

const font = localfont({
    src: "./Semamojikana-Bold.woff",
    style: "normal",
});

const NavigationBar = () => {
    const date_to = dayjs.utc().format("YYYY/MM/DD:HH");

    let date_current = dayjs.utc("2023/03/01");
    const dates = [];
    while (date_current.isBefore(date_to)) {
        dates.push(date_current.format("YYYY/MM/DD"));
        date_current = date_current.add(1, "day");
    }

    return (
        <div className=" dark:bg-[#161616] fixed h-[100dvh] flex flex-col overflow-x-hidden w-[200px]">
            <div className="bg-[url('/bg.jpg')] bg-[rgba(255,255,255,0.2)] bg-blend-lighten">
                <div className="flex items-center justify-stretch">
                    <div>
                        <Image src="/x.svg" alt="x" width={50} height={50} />
                    </div>
                    <div className={`text-center font-bold ${font.className}`}>
                        スプラトゥーン3 Xランキングデータ
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <InnerNavBar dates={dates} />
            </div>

            <div
                className={`sticky bottom-0 text-xl p-2 text-center font-bold ${font.className}`}
            >
                このサイトについて
            </div>
        </div>
    );
};

// 手動でTreeView生成
// revalidate設定すれば勝手に更新されるはず

export default NavigationBar;
