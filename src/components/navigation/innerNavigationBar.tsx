"use client";

import { Disclosure } from "@headlessui/react";
import Link from "next/link";

type InnerNavBarProps = {
    dates: string[];
};
const InnerNavBar = ({ dates }: InnerNavBarProps) => {
    return (
        <div className="flex-col flex items-center gap-y-2">
            <Link href="/">Latest Data</Link>
            <Disclosure>
                <Disclosure.Button>Archives</Disclosure.Button>
                <Disclosure.Panel>
                    <div className="flex flex-col">
                        {dates.map((date) => {
                            return (
                                <Link
                                    href={`/xrank/${date.replace(
                                        /\//gm,
                                        "-"
                                    )}/`}
                                    prefetch={false}
                                    key={date}
                                >
                                    {date}
                                </Link>
                            );
                        })}
                    </div>
                </Disclosure.Panel>
            </Disclosure>
            <Link href="/">Home</Link>
            <Link href="/">Home</Link>
        </div>
    );
};

export default InnerNavBar;
