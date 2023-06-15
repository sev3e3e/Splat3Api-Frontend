import { XRankingWeaponData } from "@/utils/types";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import { cache } from "react";

export const convertToWeaponData = (datas: XRankingPlayerData[]) => {
    // weaponデータへ変換
    const weaponData: { [weapon: string]: XRankingWeaponData } = {};
    const temp: { [weapon: string]: number[] } = {};

    for (const playerData of datas) {
        const name = playerData.weapon;
        const xp = playerData.xPower;

        if (!temp[name]) temp[name] = [];
        if (!weaponData[name]) {
            weaponData[name] = {
                name: name,
                count: 0,
                MaxXPower: 0,
                MinXPower: 9999,
                MeanXPower: 0,
                MedianXPower: 0,
            };
        }

        temp[name].push(xp);

        if (!weaponData[name].count) {
            weaponData[name].count = 0;
        }
        weaponData[name].count++;

        if (!weaponData[name].MaxXPower || weaponData[name].MaxXPower < xp)
            weaponData[name].MaxXPower = xp;

        if (!weaponData[name].MinXPower || weaponData[name].MinXPower > xp) {
            weaponData[name].MinXPower = xp;
        }
    }

    for (const weapon of Object.keys(temp)) {
        // temp[weapon]の平均を求める
        const mean =
            temp[weapon].reduce((a, b) => a + b, 0) / temp[weapon].length;

        // temp[weapon]の中央値を求める
        const median = temp[weapon].sort((a, b) => a - b)[
            Math.floor(temp[weapon].length / 2)
        ];

        // weaponData[weapon].MeanXPower =
        //     weaponData[weapon].count > 5 ? mean : Number.NaN;
        // weaponData[weapon].MedianXPower =
        //     weaponData[weapon].count > 5 ? median : Number.NaN;
        weaponData[weapon].MeanXPower = mean;
        weaponData[weapon].MedianXPower = median;
    }
    return Object.values(weaponData);
};
