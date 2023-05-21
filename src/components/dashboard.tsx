import styles from "../styles/components/dashboard.module.css";

import Image from "next/image";

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
import WeaponCategoryBar from "./charts/weaponCatBar";
import { getWeaponImageFileName, nonNullable } from "@/utils/util";
import VerticalWeaponAllBar from "./charts/verticalWeaponAllBar";
import React, { useMemo, useState } from "react";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import HorizontalWeaponBar from "./charts/horizontalWeaponBar";
import SummaryStatsMaxBar from "./charts/SummaryStatsMaxBar";
import SummaryStatsUsagePie from "./charts/SummaryStatsUsagePie";
import SummaryStatsMinBar from "./charts/SummaryStatsMinBar";
import SummaryStatsUsageBar from "./charts/SummaryStatsUsageBar";
import WeaponRanking from "./weaponRanking";
import { Tab } from "@headlessui/react";

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

const DashBoard = ({
    mode,
    data,
}: {
    mode: string;
    data: XRankingPlayerData[];
}) => {
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

    return (
        <>
            <h1>{mode} XRanking Stats</h1>
            {/* 概要 */}

            <div className={"flex flex-col justify-center items-center"}>
                <h2 className="text-4xl p-3">Stats Summary</h2>
                <div className="flex justify-center items-center flex-wrap ">
                    {/* 武器 */}
                    <div className="text-center p-4">
                        <p className="text-3xl">Xパワー Top5</p>
                        <div className="flex justify-center items-center p-5">
                            <SummaryStatsMaxBar
                                data={top5MaxWeapons}
                                minPower={min.xPower}
                                maxPower={max.xPower}
                            />
                            {/* <SummaryStatsUsagePie data={top5MaxWeaponUsage} /> */}
                        </div>
                    </div>

                    {/* 使用率 */}
                    <div className="text-center p-5">
                        {/* <SummaryStatsUsagePie
                            title="使用率Top5"
                            data={top5Weapons}
                        /> */}
                        <p className="text-3xl">使用率Top5</p>
                        <div className="flex justify-center items-center p-5">
                            <SummaryStatsUsageBar data={top5Weapons} />
                        </div>
                    </div>

                    {/* 武器種 */}
                    {/* <div className="flex justify-center items-center">
                        <div>
                            <h3>武器種内でXパワーが高い武器</h3>
                            <StatsSummaryWeaponTypeItem
                                data={shooterPowers[0]}
                            />
                            <StatsSummaryWeaponTypeItem
                                data={rollerPowers[0]}
                            />
                            <StatsSummaryWeaponTypeItem
                                data={chargerPowers[0]}
                            />
                            <StatsSummaryWeaponTypeItem
                                data={slosherPowers[0]}
                            />
                            <StatsSummaryWeaponTypeItem
                                data={splatlingPowers[0]}
                            />
                            <StatsSummaryWeaponTypeItem
                                data={dualiePowers[0]}
                            />
                            <StatsSummaryWeaponTypeItem
                                data={brellaPowers[0]}
                            />
                            <StatsSummaryWeaponTypeItem
                                data={blasterPowers[0]}
                            />
                            <StatsSummaryWeaponTypeItem data={brushPowers[0]} />
                            <StatsSummaryWeaponTypeItem
                                data={stringerPowers[0]}
                            />
                            <StatsSummaryWeaponTypeItem
                                data={splatanaPowers[0]}
                            />
                        </div>
                        <div>
                            <h3>武器種内で使用率が高い武器</h3>
                        </div>
                    </div> */}
                </div>
            </div>

            <Tab.Group>
                <Tab.List>
                    <Tab>XPower Chart</Tab>
                    <Tab>Usage Chart</Tab>
                </Tab.List>
                <Tab.Panels></Tab.Panels>
            </Tab.Group>

            {/* Xpowerの集計方法 fieldset */}
            <fieldset>
                <legend>{"Xpowerの集計方法"}</legend>
                <div className="flex gap-2">
                    {weaponPowerModes.map((mode) => {
                        return (
                            <div key={`xpower-calc-mode-${mode}`}>
                                <input
                                    type="radio"
                                    id={mode}
                                    value={mode}
                                    onChange={handleWeaponPowerModeChange}
                                    checked={mode === weaponPowerMode}
                                />
                                <label htmlFor={mode}>{mode}</label>
                            </div>
                        );
                    })}
                </div>
            </fieldset>

            {/* グラフ範囲 */}
            <fieldset>
                <legend>{"グラフの表示範囲"}</legend>
                <div className="flex gap-2">
                    {weaponPowerChartRanges.map((range) => {
                        return (
                            <div key={`xpower-range-${range}`}>
                                <input
                                    type="radio"
                                    id={`${range}`}
                                    value={range}
                                    onChange={(e) => {
                                        setWeaponPowerChartRange(range);
                                    }}
                                    checked={range === weaponPowerChartRange}
                                />
                                <label htmlFor={`${range}`}>
                                    {range == 99 ? "すべて" : `${range}位まで`}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </fieldset>
            {/* <HorizontalWeaponAllBar data={allWeaponPowers} /> */}

            <VerticalWeaponAllBar
                data={allWeaponPowers}
                calcMode={mode}
                range={weaponPowerChartRange}
            />

            {/* 武器種ごとのXPower */}

            <div>
                <h2>武器種別Xパワー</h2>
                <div className={styles.WeaponTypeChartContainer}>
                    {/* シューター系統のグラフ */}
                    <div className={styles.WeaponCategory}>
                        <div>
                            <h3>シューター系統</h3>
                            <WeaponCategoryBar
                                data={shooterPowers}
                                max={max.xPower}
                                min={min.xPower}
                            />
                        </div>
                    </div>

                    {/* Dualie系統のグラフ */}
                    <div className={styles.WeaponCategory}>
                        <h3>マニューバ系統</h3>
                        <WeaponCategoryBar
                            data={dualiePowers}
                            max={max.xPower}
                            min={min.xPower}
                        />
                    </div>

                    {/* Charger系統のグラフ */}
                    <div className={styles.WeaponCategory}>
                        <div>
                            <h3>チャージャー系統</h3>
                            <WeaponCategoryBar
                                data={chargerPowers}
                                max={max.xPower}
                                min={min.xPower}
                            />
                        </div>
                    </div>

                    {/* Slosher系統のグラフ */}
                    <div className={styles.WeaponCategory}>
                        <h3>スロッシャー系統</h3>
                        <WeaponCategoryBar
                            data={slosherPowers}
                            max={max.xPower}
                            min={min.xPower}
                        />
                    </div>

                    {/* Splatling系統のグラフ */}
                    <div className={styles.WeaponCategory}>
                        <h3>スピナー系統</h3>
                        <WeaponCategoryBar
                            data={splatlingPowers}
                            max={max.xPower}
                            min={min.xPower}
                        />
                    </div>

                    {/* Roller */}
                    <div className={styles.WeaponCategory}>
                        <h3>ローラー系統</h3>
                        <WeaponCategoryBar
                            data={rollerPowers}
                            max={max.xPower}
                            min={min.xPower}
                        />
                    </div>

                    {/* Blaster系統のグラフ */}
                    <div>
                        <h3>ブラスター系統</h3>
                        <WeaponCategoryBar
                            data={blasterPowers}
                            max={max.xPower}
                            min={min.xPower}
                        />
                    </div>

                    {/* , Brush系統のグラフ */}
                    <div className={styles.WeaponCategory}>
                        <h3>フデ系統</h3>
                        <WeaponCategoryBar
                            data={brushPowers}
                            max={max.xPower}
                            min={min.xPower}
                        />
                    </div>

                    {/* Brella */}
                    <div>
                        <h3>カサ系統</h3>
                        <WeaponCategoryBar
                            data={brellaPowers}
                            max={max.xPower}
                            min={min.xPower}
                        />
                    </div>

                    {/* Splatana系統のグラフ */}
                    <div className={styles.WeaponCategory}>
                        <h3>ワイパー系統</h3>
                        <WeaponCategoryBar
                            data={splatanaPowers}
                            max={max.xPower}
                            min={min.xPower}
                        />
                    </div>

                    {/* Stringer系統のグラフ */}
                    <div className={styles.WeaponCategory}>
                        <h3>弓系統</h3>
                        <WeaponCategoryBar
                            data={stringerPowers}
                            max={max.xPower}
                            min={min.xPower}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

const StatsSummaryWeaponTypeItem = ({ data }: { data: XRankingPlayerData }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            {/* <Image
                alt={`${data.weapon} Image`}
                src={`/weapons/${getWeaponImageFileName(data.weapon)}.png`}
                width={60}
                height={60}
            /> */}
            <div>
                <p>
                    {data.weapon} {data.xPower}
                </p>
            </div>
        </div>
    );
};

export default DashBoard;
