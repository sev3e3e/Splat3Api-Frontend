import { XRankingWeaponData } from "@/utils/types";
import { range } from "@/utils/util";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";

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
                MaxXPowerAsPercent: 0,
                countRank: 0,
                MaxXPowerRank: 0,
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

    // weaponDataで一番MaxXPowerが高いやつを抽出
    const max = Math.max(...Object.values(weaponData).map((x) => x.MaxXPower));

    // 低いやつも
    const min = Math.min(...Object.values(weaponData).map((x) => x.MaxXPower));

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

        weaponData[weapon].MaxXPowerAsPercent =
            ((weaponData[weapon].MaxXPower - min) / (max - min)) * 100;
    }

    const data = Object.values(weaponData);

    const countSortedData = data.slice().sort((a, b) => b.count - a.count);
    const xpowerSortedData = data
        .slice()
        .sort((a, b) => b.MaxXPower - a.MaxXPower);

    for (const i of [...range(0, data.length)]) {
        const countWeapon = countSortedData[i].name;
        const xpowerWeapon = xpowerSortedData[i].name;

        weaponData[countWeapon].countRank = i + 1;
        weaponData[xpowerWeapon].MaxXPowerRank = i + 1;
    }

    return Object.values(weaponData);
};
