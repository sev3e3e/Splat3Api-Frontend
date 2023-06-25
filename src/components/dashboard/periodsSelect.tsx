type Props = {
    dates: Date[];
};

const PeriodsSelect = ({ dates }: Props) => {
    // sort dates 最近の物を最初に
    dates.sort((a, b) => {
        if (a.getTime() > b.getTime()) {
            return -1;
        } else {
            return 1;
        }
    });
    return (
        <select name="periods" id="period-select" className="bg-black">
            {dates.map((date) => (
                <option
                    key={date.toISOString()}
                    value={date.toISOString()}
                    className="bg-black"
                >
                    {date.toISOString()}
                </option>
            ))}
        </select>
    );
};
