import { Signal, signal, useSignal } from '@preact/signals';
import { Stage } from '@sev3e3e/splat3api-client';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'preact/hooks';
import { MapCard } from './MapCard';

type Props = {
    stage1: Stage;
    stage2: Stage;
    currentTime: Dayjs;
    startTime: Date;
};

const ScheduleItem = ({ stage1, stage2, currentTime, startTime }: Props) => {
    const isArrowVisible = useSignal(false);
    const liPosition = useSignal(0);

    const diff = currentTime.diff(startTime, 'minute');

    if (diff > 0 && diff < 120) {
        isArrowVisible.value = true;
    } else {
        isArrowVisible.value = false;
    }

    liPosition.value = (diff / 120) * 95 + 5;

    return (
        <div className='relative flex flex-row px-2 w-full'>
            <ul className='block mb-3 px-2 h-full before:absolute before:top-7 before:bg-red-500 before:w-1 before:max-h-full before:h-full before:left-8'>
                {dayjs(startTime).format('HH:mm')}

                {isArrowVisible.value && (
                    <li
                        className='absolute left-[26px] w-4 h-4 bg-black rounded-full'
                        style={{ top: `${liPosition}%` }}
                    >
                        <div className='absolute right-4 -top-2 text-xl'>{'>'}</div>
                    </li>
                )}
            </ul>
            <div className='pt-7'>
                <MapCard stage1={stage1} stage2={stage2} />
            </div>
        </div>
    );
};

export default ScheduleItem;
