"use client";

import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Listbox, Popover } from "@headlessui/react";
import { Float } from "@headlessui-float/react";

import "react-datepicker/dist/react-datepicker.css";
import "@/styles/components/datepicker.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ja from "dayjs/locale/ja";
dayjs.locale(ja);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(timezone);

const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

type DateComponentProps = {
    minDate: string;
    maxDate: string;
    currentDate: string;
};
const DateComponent = ({
    currentDate,
    minDate,
    maxDate,
}: DateComponentProps) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(
        startDate
    );

    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<DateButton />}
                // wrapperClassName={styles.datePicker}
                // popperClassName="datePicker"
                // calendarClassName={styles.datePicker}

                // className={styles.datePicker}
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div className="text-[#babcc4] flex items-center space-x-1.5 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1.5">
                        <div>
                            <button
                                type="button"
                                className="dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10 transition-all duration-300 hover:bg-gray-100 rounded-full p-[0.45rem] focus:ring-1 focus:ring-blue-500/50 focus:bg-blue-100/50"
                                onClick={() => {
                                    decreaseMonth();
                                    const newDate = new Date(tempSelectedDate);
                                    newDate.setMonth(newDate.getMonth() - 1);
                                    setTempSelectedDate(newDate);
                                }}
                                disabled={prevMonthButtonDisabled}
                            >
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-1 items-center space-x-1.5">
                            <div className="w-1/2">
                                <Popover>
                                    <Float placement="bottom-start">
                                        <Popover.Button className="w-full tracking-wide dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10 transition-all px-3 py-[0.55rem] hover:bg-gray-100 rounded-md focus:ring-1 focus:ring-blue-500/50 focus:bg-blue-100/50">
                                            {date.toLocaleDateString("en", {
                                                month: "short",
                                            })}
                                        </Popover.Button>
                                        <Popover.Panel>
                                            <div className="flex w-[25%]  flex-wrap">
                                                {months.map((month) => (
                                                    <div
                                                        className="bg-[#161616] p-3 "
                                                        key={month}
                                                    >
                                                        {month}
                                                    </div>
                                                ))}
                                            </div>
                                        </Popover.Panel>
                                    </Float>
                                </Popover>
                            </div>
                            <div className="w-1/2">
                                <button
                                    type="button"
                                    className="w-full tracking-wide dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10 transition-all duration-300 px-3 py-[0.55rem] uppercase hover:bg-gray-100 rounded-md focus:ring-1 focus:ring-blue-500/50 focus:bg-blue-100/50"
                                >
                                    {date.toLocaleDateString("en", {
                                        year: "numeric",
                                    })}
                                </button>
                            </div>
                        </div>

                        <div className="flex-none">
                            <button
                                type="button"
                                className="dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10 transition-all duration-300 hover:bg-gray-100 rounded-full p-[0.45rem] focus:ring-1 focus:ring-blue-500/50 focus:bg-blue-100/50"
                                onClick={() => {
                                    increaseMonth();
                                    const newDate = new Date(tempSelectedDate);
                                    newDate.setMonth(newDate.getMonth() + 1);
                                    setTempSelectedDate(newDate);
                                }}
                                disabled={nextMonthButtonDisabled}
                            >
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
                renderDayContents={(dayOfMonth, date) => {
                    const isCurrentMonth =
                        tempSelectedDate?.getMonth() === date?.getMonth();
                    return (
                        <div
                            className={`flex justify-center items-center h-7 text-sm ${
                                isCurrentMonth ? "" : "text-gray-700 gap-y-3 "
                            }`}
                        >
                            {dayOfMonth}
                        </div>
                    );
                }}
            />
        </div>
    );
};

type ButtonProps = JSX.IntrinsicElements["button"];
const DateButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    if (!props.value) {
        throw new Error("unknown date");
    }

    const date = dayjs.utc(props.value, "MM/DD/YYYY");

    return (
        <>
            <button {...props} ref={ref}>
                <div className="text-center flex justify-center items-end text-5xl">
                    <div className="">{date.year()}</div>
                    <div className="text-5xl">{"/"}</div>
                    <div className="flex text-5xl justify-center">
                        <div>{zeroPad(date.get("month") + 1, 2)}</div>
                        <div>{"/"}</div>
                        <div>{zeroPad(date.get("date"), 2)}</div>
                        <div>{`(${date.format("dd")})`}</div>
                    </div>
                    <div>{"23:00"}</div>
                </div>
            </button>
        </>
    );

    return (
        <>
            <button {...props} ref={ref}>
                {props.value}
            </button>
        </>
    );
});
DateButton.displayName = "DateButton";

function zeroPad(num: number, len: number) {
    return (Array(len).join("0") + num).slice(-len);
}

export default DateComponent;
