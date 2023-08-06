import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

type DatePickerProps = {
    initialDate: string;
};
const DatePicker = ({ initialDate }: DatePickerProps) => {
    const [value, setValue] = useState<DateValueType>({
        startDate: new Date(initialDate),
        endDate: new Date(initialDate),
    });

    const router = useRouter();

    const handleValueChange = (newValue: DateValueType) => {
        setValue(newValue);
        router.push(
            `/xrank/${dayjs.utc(newValue?.startDate).format("YYYY-MM-DD")}`
        );
    };

    return (
        <Datepicker
            useRange={false}
            asSingle
            value={value}
            i18n="ja"
            startWeekOn="mon"
            popoverDirection="down"
            onChange={handleValueChange}
            minDate={new Date("2023-03-01")}
            maxDate={new Date()}
            startFrom={new Date(initialDate)}
            displayFormat="YYYY-MM-DDThh:mm:ssZ"
            showFooter
        />
    );
};

export default DatePicker;
