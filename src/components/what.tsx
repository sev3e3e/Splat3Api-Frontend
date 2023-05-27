import {
    Blaster,
    Charger,
    Roller,
    Shooter,
    Brush,
    Brella,
    Dualie,
    Slosher,
    Splatana,
    Splatling,
    Stringer,
} from "../utils/weaponPool";
import { getWeaponSubAndSpecial, nonNullable } from "@/utils/util";

import React, { useMemo, useState } from "react";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import SummaryStatsMaxBar from "./charts/SummaryStatsMaxBar";
import SummaryStatsUsagePie from "./charts/SummaryStatsUsagePie";

import Image from "next/image";
import { Weapons } from "@/utils/weaponName";

const weaponPowerModes = ["Max", "Avg", "Min"];
const weaponPowerChartRanges = [5, 10, 99];

const createWeaponData = (weapons: string[], data: XRankingPlayerData[]) => {
    return weapons
        .map((weapon) => {
            const shooterData = data.filter((d) => d.weapon === weapon);
            if (shooterData.length != 0) {
                const max = shooterData.reduce((acc, cur) => {
                    if (acc.xPower < cur.xPower) {
                        return cur;
                    } else {
                        return acc;
                    }
                });
                return max;
            } else {
                return null;
            }
        })
        .filter(nonNullable)
        .sort((a, b) => b!.xPower - a!.xPower);
};

const What = ({ mode, data }: { mode: string; data: XRankingPlayerData[] }) => {
    // dataのweaponを集計
    // index, name, valueというjsonオブジェクトに変形する
    // indexは0から始まりデータの数ごとに+1されていく
    // nameはweaponの名前
    // valueはweaponが登場した数
    // 例: {index: 0, name: "スプラシューターコラボ", value: 1}
    const weaponData = data.reduce((acc, cur) => {
        const name = cur.weapon;
        const index = acc.findIndex((v) => v.name === name);
        if (index === -1) {
            acc.push({ index: acc.length, value: 1, name });
        } else {
            acc[index].value += 1;
        }
        return acc;
    }, [] as { index: number; name: string; value: number }[]);

    // dataからxpower最大、最小を抽出
    const max = useMemo(
        () =>
            data.reduce((acc, cur) => {
                if (acc.xPower < cur.xPower) {
                    return cur;
                } else {
                    return acc;
                }
            }),
        [data]
    );

    const min = useMemo(
        () =>
            data.reduce((acc, cur) => {
                if (acc.xPower > cur.xPower) {
                    return cur;
                } else {
                    return acc;
                }
            }),
        [data]
    );

    // dataからShooter xpower最大のTableDataを抽出

    const shooterPowers = useMemo(
        () => createWeaponData(Shooter, data),
        [data]
    );

    // Charger
    const chargerPowers = useMemo(
        () => createWeaponData(Charger, data),
        [data]
    );

    // Blaster
    const blasterPowers = useMemo(
        () => createWeaponData(Blaster, data),
        [data]
    );

    // Roller
    const rollerPowers = useMemo(() => createWeaponData(Roller, data), [data]);

    // Brush
    const brushPowers = useMemo(() => createWeaponData(Brush, data), [data]);

    // Slosher
    const slosherPowers = useMemo(
        () => createWeaponData(Slosher, data),
        [data]
    );

    // Splatling
    const splatlingPowers = useMemo(
        () => createWeaponData(Splatling, data),
        [data]
    );

    // Dualie
    const dualiePowers = useMemo(() => createWeaponData(Dualie, data), [data]);

    // Brella
    const brellaPowers = useMemo(() => createWeaponData(Brella, data), [data]);

    // Splatana
    const splatanaPowers = useMemo(
        () => createWeaponData(Splatana, data),
        [data]
    );

    // Stringer
    const stringerPowers = useMemo(
        () => createWeaponData(Stringer, data),
        [data]
    );

    const allWeaponPowers = useMemo(() => {
        return [
            ...brushPowers,
            ...brellaPowers,
            ...dualiePowers,
            ...rollerPowers,
            ...blasterPowers,
            ...chargerPowers,
            ...shooterPowers,
            ...slosherPowers,
            ...splatanaPowers,
            ...stringerPowers,
            ...splatlingPowers,
        ].sort((a, b) => b!.xPower - a!.xPower);
    }, [
        brushPowers,
        blasterPowers,
        brellaPowers,
        dualiePowers,
        rollerPowers,
        chargerPowers,
        shooterPowers,
        slosherPowers,
        splatanaPowers,
        stringerPowers,
        splatlingPowers,
    ]);

    const [weaponPowerMode, setWeaponPowerMode] = useState(weaponPowerModes[0]);

    const [weaponPowerChartRange, setWeaponPowerChartRange] = useState(
        weaponPowerChartRanges[0]
    );

    const handleWeaponPowerModeChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setWeaponPowerMode(e.target.value);
    };

    // weapondataからtop5抽出
    const top5Weapons = useMemo(() => {
        return weaponData.sort((a, b) => b.value - a.value).slice(0, 5);
    }, [weaponData]);

    // dataからweaponごとの最大xPowerを取得
    const weaponMaxXPower = useMemo(() => {
        return data.reduce((acc, cur) => {
            const weapon = cur.weapon;
            const index = acc.findIndex((v) => v.weapon === weapon);
            if (index === -1) {
                acc.push({ weapon, xPower: cur.xPower });
            } else {
                if (acc[index].xPower < cur.xPower) {
                    acc[index].xPower = cur.xPower;
                }
            }
            return acc;
        }, [] as { weapon: string; xPower: number }[]);
    }, [data]);

    const top5MaxWeapons = weaponMaxXPower.slice(0, 5);
    const top5MaxWeaponUsage = top5MaxWeapons
        .map((weapon) => {
            const data = weaponData.find((w) => w.name == weapon.weapon);
            return data;
        })
        .filter(nonNullable)
        .sort((a, b) => a.value - b.value);

    // debug for ItemContainer
    const ALL_WEAPONS_NAME = [
        ...Shooter,
        ...Charger,
        ...Blaster,
        ...Roller,
        ...Brush,
        ...Slosher,
        ...Splatling,
        ...Dualie,
        ...Brella,
        ...Splatana,
        ...Stringer,
    ];
    const DFI_Datas = ALL_WEAPONS_NAME.map((name, index) => {
        return {
            rank: index,
            weaponName: name,
            usageRate: 99,
            usageCount: 10,
            maxXPower: 4000,
        };
    });

    return (
        <>
            <h1>{mode} XRanking Stats</h1>
            {/* 概要 */}

            <div className={""}>
                {DFI_Datas.map((d) => (
                    <ItemContainer info={d} key={d.weaponName} />
                ))}

                {/* 武器 */}
                {/* <SummaryStatsMaxBar
                    data={top5MaxWeapons}
                    minPower={min.xPower}
                    maxPower={max.xPower}
                />

                <SummaryStatsUsagePie data={top5Weapons} /> */}
            </div>
        </>
    );
};

type Props = {
    info: WeaponInfo;
};

type WeaponInfo = {
    rank: number;
    weaponName: string;
    usageRate: number;
    usageCount: number;
    maxXPower: number;
};

const ItemContainer = ({ info }: Props) => {
    const { sub, special } = getWeaponSubAndSpecial(info.weaponName);
    return (
        <div className="flex gap-x-3 bg-[#dee2e6]">
            <div className="flex flex-col justify-center items-center px-2">
                <div>{info.rank}</div>
                <div>{info.maxXPower}</div>
            </div>
            <div className="flex justify-center items-center">
                {info.weaponName}
            </div>
            <div className="flex ml-auto justify-center items-center">
                <Image
                    src={`/weapons/sub/${sub}.webp`}
                    alt={`${sub}`}
                    width={64}
                    height={64}
                />
                <Image
                    src={`/weapons/sp/${special}.webp`}
                    alt={`${sub}`}
                    width={64}
                    height={64}
                />
            </div>
        </div>
    );
};

export default What;
