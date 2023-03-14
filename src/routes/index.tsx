import { VerticalTimeBar } from '../components/vertical-time-bar';
import { Configuration, ScheduleApi } from '@sev3e3e/splat3api-client';

const config: Configuration = new Configuration({
    basePath: 'http://localhost:8080',
});

const api = new ScheduleApi(config);
const x = await api.getRegularSchedule();

export const Index = () => {
    return (
        <div
            className={
                'flex items-stretch self-stretch place-self-stretch justify-self-stretch justify-items-stretch place-content-stretch'
            }
        >
            <div className={'w-[120px] bg-red-300 px-2'}>
                <VerticalTimeBar dates={x.map((d) => d.startTime)} />
            </div>
            <div className={'w-[1300px] bg-slate-300'}>main</div>
        </div>
    );
};
