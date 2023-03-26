import { GameMode } from '@sev3e3e/splat3api-client';
import { currentGameMode } from '../SignalStore';

import ArrowSVG from '../assets/arrow.svg';
import { AreaIcon } from './SVGComponents/AreaIcon';
import { ClamIcon } from './SVGComponents/ClamIcon';
import { RainmakerIcon } from './SVGComponents/RainmakerIcon';
import { TowerIcon } from './SVGComponents/TowerIcon';
import { ArrowIcon } from './SVGComponents/ArrowIcon';

export const Arrow = ({ direction }: { direction: 'Left' | 'Right' }) => {
    return (
        <div className='flex flex-col bg-black bg-opacity-80 px-2 z-10 text-white'>
            <div className='text-center h-full w-full'>
                <p>
                    {currentGameMode.value == GameMode.Area && 'Area'}
                    {currentGameMode.value == GameMode.Tower && 'Tower'}
                    {currentGameMode.value == GameMode.Rainmaker && 'Rainmaker'}
                    {currentGameMode.value == GameMode.Clam && 'Clam'}
                </p>
            </div>
            <div>
                {/* <div className='w-2/12 h-2/12'>
                    {currentGameMode.value == GameMode.Area && <AreaIcon />}
                    {currentGameMode.value == GameMode.Clam && <ClamIcon />}
                    {currentGameMode.value == GameMode.Rainmaker && <RainmakerIcon />}
                    {currentGameMode.value == GameMode.Tower && <TowerIcon />}
                </div> */}
                <div
                    className={`w-9/12 h-9/12 text-center m-auto ${
                        direction === 'Right' ? 'transform rotate-180' : ''
                    }`}
                >
                    <ArrowIcon color='white' />
                </div>
            </div>
        </div>
    );
};
