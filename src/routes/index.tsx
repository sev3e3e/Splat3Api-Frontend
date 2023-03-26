import { Configuration, ScheduleApi } from '@sev3e3e/splat3api-client';

import 'swiper/css/navigation';
import 'swiper/css';
import ScheduleItem from '../components/schedule-item';
import { useEffect } from 'preact/hooks';
import { currentTime } from '../SignalStore';
import dayjs from 'dayjs';
import { Arrow } from '../components/arrow';

const config: Configuration = new Configuration({
    basePath: 'http://localhost:8080',
});

const api = new ScheduleApi(config);
const x = await api.getRegularSchedule();

export const Index = () => {
    useEffect(() => {
        const timer = setInterval(() => {
            currentTime.value = dayjs();
        }, 1000 * 60);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <div className='fixed bottom-0 left-0 m-3'>
                <button>
                    <Arrow direction='Left' />
                </button>
            </div>
            <div className={'flex items-stretch'}>
                <div>
                    {x.map((schedule) => (
                        <div className='mb-10'>
                            <ScheduleItem
                                stage1={{ id: 1, name: 'マンタマリア号' }}
                                stage2={{ id: 2, name: 'ユノハナ大峡谷' }}
                                startTime={schedule.startTime}
                                currentTime={currentTime.value}
                            ></ScheduleItem>
                        </div>
                    ))}
                </div>
            </div>
            <div className='fixed bottom-0 right-0 m-3'>
                <button>
                    <Arrow direction='Right' />
                </button>
            </div>
        </div>
    );
};
