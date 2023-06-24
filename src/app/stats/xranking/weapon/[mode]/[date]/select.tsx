"use client";

import { ChangeEvent } from "react";

import { usePathname, useRouter } from "next/navigation";

type Props = {
    mode: string;
    dates: string[];
    currentDate: string;
};

const CustomSelect = ({ mode, dates, currentDate }: Props) => {
    const router = useRouter();
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        router.push(`/stats/xranking/weapon/${mode}/${e.target.value}`);
    };
    return (
        <>
            <select
                name="testSelect"
                id="testSelect"
                onChange={(e) => handleSelectChange(e)}
                className="bg-gray-700 text-[#c6c8d1]"
            >
                {dates.map((date) => (
                    <option
                        value={date}
                        key={date}
                        selected={currentDate == date ? true : false}
                        defaultValue={currentDate}
                    >
                        {date}
                    </option>
                ))}
            </select>
        </>
    );
};

export default CustomSelect;
