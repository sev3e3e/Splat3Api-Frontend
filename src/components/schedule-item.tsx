import { Stage } from '@sev3e3e/splat3api-client';

const ScheduleItem = ({ stage1, stage2 }: { stage1: Stage; stage2: Stage }) => {
    return (
        <>
            <div className='h-screen w-screen flex flex-col items-center justify-center'>
                <div className='relative'>
                    <p className='absolute top-3 left-3 text-xl bg-black text-white font-bold p-2 border border-black rounded-sm'>
                        {stage1.name}
                    </p>
                    <img src={`${stage1.id}.png`} alt='' />
                </div>
                <div className='relative'>
                    <p className='absolute bottom-3 right-3 text-xl bg-black text-white font-bold p-2 rounded-sm'>
                        {stage2.name}
                    </p>
                    <img src={`${stage2.id}.png`} alt='' />
                </div>
            </div>
        </>
    );
};

export default ScheduleItem;
