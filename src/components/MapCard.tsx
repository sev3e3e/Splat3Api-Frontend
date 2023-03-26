import { Stage } from '@sev3e3e/splat3api-client';

type Props = {
    stage1: Stage;
    stage2: Stage;
};

const Card = ({ stage, labelPosition }: { stage: Stage; labelPosition: 'UpperLeft' | 'BottomRight' }) => {
    return (
        <div className={`relative`}>
            <p
                className={`absolute text-xl bg-black text-white font-bold p-2 border border-black rounded-sm ${
                    labelPosition == 'UpperLeft' ? 'top-3 left-3' : 'bottom-3 right-3'
                }`}
            >
                {stage.name}
            </p>
            <img src={`${stage.id}.png`} alt='' />
        </div>
    );
};

export function MapCard({ stage1, stage2 }: Props) {
    return (
        <div className='flex flex-col items-center justify-center '>
            <div className='mb-3'>
                <Card stage={stage1} labelPosition={'UpperLeft'} />
            </div>
            <div>
                <Card stage={stage2} labelPosition={'BottomRight'} />
            </div>
        </div>
    );
}
