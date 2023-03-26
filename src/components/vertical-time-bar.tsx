import { useState, useEffect, useRef } from 'preact/hooks';
import dayjs from 'dayjs';

export const VerticalTimeBar = ({ dates, margin }: { dates: Date[]; margin: number }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const firstDate = dates[0];
    const lastDate = dates[dates.length - 1];
    const totalDuration = lastDate.getTime() - firstDate.getTime();
    const currentTimePosition = ((currentTime.getTime() - firstDate.getTime()) / totalDuration) * 100;

    return (
        <>
            <ol
                className={
                    'relative list-none m-0 p-0 before:absolute before:top-2 before:bg-red-500 before:w-1 before:h-full before:left-[3.9px]'
                }
            >
                <li
                    className={
                        'absolute pl-4 before:absolute before:top-[14px] before:rounded-full before:bg-cyan-400 before:w-3 before:h-3 before:border-solid before:border-2 before:border-green-500 before:left-0 '
                    }
                    style={{ top: `${currentTimePosition}%` }}
                >
                    <p className={'relative my-2 overflow-hidden transition-none'}>
                        Now [{dayjs(currentTime).format('HH:mm')}]
                    </p>
                </li>
                {dates.map((date) => {
                    return (
                        <li
                            className={
                                'relative pl-4 before:absolute before:top-[7px] before:rounded-full before:bg-cyan-400 before:w-3 before:h-3 before:border-solid before:border-2 before:border-green-500 before:left-0'
                            }
                            style={{
                                marginBottom: margin - 34,
                            }}
                        >
                            <p className={'relative my-2 overflow-hidden transition-none'}>
                                {dayjs(date).format('HH:mm')}
                            </p>
                        </li>
                    );
                })}
            </ol>
        </>
    );
};
