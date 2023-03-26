import { signal } from '@preact/signals';
import { GameMode, Stage } from '@sev3e3e/splat3api-client';
import dayjs, { Dayjs } from 'dayjs';

type Schedule = {
    stage1: Stage;
    stage2: Stage;
    currentTime: Dayjs;
    startTime: Date;
};

export const currentGameMode = signal<GameMode>('Area');
export const prevGameMode = signal<GameMode>('Area');
export const currentTime = signal<Dayjs>(dayjs());
export const schedules = signal<Schedule[]>([]);
