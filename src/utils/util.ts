import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import { Weapons } from "./weaponName";
import { TableData } from "@/components/table/weaponRankingTable";

export enum Mode {
    Area = "xRankingAr",
    Rainmaker = "xRankingGl",
    Clam = "xRankingCl",
    Tower = "xRankingLf",
}

export const nonNullable = <T>(value: T): value is NonNullable<T> =>
    value != null;

export const getWeaponImageFileName = (weaponName: string) => {
    if (!weaponName) return;
    const filename: string = Weapons[weaponName];
    if (!filename) return;
    return filename.replace(/\s/g, "_");
};

export const getWeaponSubAndSpecial = (
    weaponName: string
): { sub: string; special: string } => {
    const WEAPONS: { [weapon: string]: { sub: string; special: string } } = {
        ボールドマーカー: { sub: "カーリングボム", special: "ウルトラハンコ" },
        ボールドマーカーネオ: {
            sub: "ジャンプビーコン",
            special: "メガホンレーザー5.1ch",
        },
        わかばシューター: {
            sub: "スプラッシュボム",
            special: "グレートバリア",
        },
        もみじシューター: { sub: "トーピード", special: "ホップソナー" },
        シャープマーカー: { sub: "クイックボム", special: "カニタンク" },
        シャープマーカーネオ: {
            sub: "キューバンボム",
            special: "トリプルトルネード",
        },
        プロモデラーMG: { sub: "タンサンボム", special: "サメライド" },
        プロモデラーRG: { sub: "スプリンクラー", special: "ナイスダマ" },
        スプラシューター: {
            sub: "キューバンボム",
            special: "ウルトラショット",
        },
        "ヒーローシューター レプリカ": {
            sub: "キューバンボム",
            special: "ウルトラショット",
        },
        スプラシューターコラボ: {
            sub: "スプラッシュボム",
            special: "トリプルトルネード",
        },
        ".52ガロン": {
            sub: "スプラッシュシールド",
            special: "メガホンレーザー5.1ch",
        },
        "N-ZAP85": { sub: "キューバンボム", special: "エナジースタンド" },
        "N-ZAP89": { sub: "ロボットボム", special: "デコイチラシ" },
        プライムシューター: { sub: "ラインマーカー", special: "カニタンク" },
        プライムシューターコラボ: {
            sub: "キューバンボム",
            special: "ナイスダマ",
        },
        ".96ガロン": { sub: "スプリンクラー", special: "キューインキ" },
        ".96ガロンデコ": {
            sub: "スプラッシュシールド",
            special: "テイオウイカ",
        },
        ジェットスイーパー: { sub: "ラインマーカー", special: "キューインキ" },
        ジェットスイーパーカスタム: {
            sub: "ポイズンミスト",
            special: "アメフラシ",
        },
        スペースシューター: {
            sub: "ポイントセンサー",
            special: "メガホンレーザー5.1ch",
        },
        ノヴァブラスター: {
            sub: "スプラッシュボム",
            special: "ショクワンダー",
        },
        ノヴァブラスターネオ: {
            sub: "タンサンボム",
            special: "ウルトラハンコ",
        },
        ホットブラスター: { sub: "ロボットボム", special: "グレートバリア" },
        ロングブラスター: { sub: "キューバンボム", special: "ホップソナー" },
        クラッシュブラスター: {
            sub: "スプラッシュボム",
            special: "ウルトラショット",
        },
        クラッシュブラスターネオ: {
            sub: "カーリングボム",
            special: "デコイチラシ",
        },
        ラピッドブラスター: { sub: "トラップ", special: "トリプルトルネード" },
        ラピッドブラスターデコ: {
            sub: "トーピード",
            special: "ジェットパック",
        },
        Rブラスターエリート: { sub: "ポイズンミスト", special: "キューインキ" },
        L3リールガン: { sub: "カーリングボム", special: "カニタンク" },
        L3リールガンD: { sub: "クイックボム", special: "ウルトラハンコ" },
        H3リールガン: { sub: "ポイントセンサー", special: "エナジースタンド" },
        ボトルガイザー: {
            sub: "スプラッシュシールド",
            special: "ウルトラショット",
        },
        カーボンローラー: { sub: "ロボットボム", special: "ショクワンダー" },
        カーボンローラーデコ: {
            sub: "クイックボム",
            special: "ウルトラショット",
        },
        スプラローラー: { sub: "カーリングボム", special: "グレートバリア" },
        スプラローラーコラボ: {
            sub: "ジャンプビーコン",
            special: "テイオウイカ",
        },
        ダイナモローラー: {
            sub: "スプリンクラー",
            special: "エナジースタンド",
        },
        ヴァリアブルローラー: { sub: "トラップ", special: "マルチミサイル" },
        ワイドローラー: {
            sub: "スプラッシュシールド",
            special: "キューインキ",
        },
        パブロ: { sub: "スプラッシュボム", special: "メガホンレーザー5.1ch" },
        "パブロ・ヒュー": { sub: "トラップ", special: "ウルトラハンコ" },
        ホクサイ: { sub: "キューバンボム", special: "ショクワンダー" },
        スクイックリンα: { sub: "ポイントセンサー", special: "グレートバリア" },
        スプラチャージャー: {
            sub: "スプラッシュボム",
            special: "キューインキ",
        },
        スプラチャージャーコラボ: {
            sub: "スプラッシュシールド",
            special: "トリプルトルネード",
        },
        スプラスコープ: { sub: "スプラッシュボム", special: "キューインキ" },
        スプラスコープコラボ: {
            sub: "スプラッシュシールド",
            special: "トリプルトルネード",
        },
        リッター4K: { sub: "トラップ", special: "ホップソナー" },
        "4Kスコープ": { sub: "トラップ", special: "ホップソナー" },
        "14式竹筒銃・甲": {
            sub: "ロボットボム",
            special: "メガホンレーザー5.1ch",
        },
        ソイチューバー: { sub: "トーピード", special: "マルチミサイル" },
        "R-PEN/5H": { sub: "スプリンクラー", special: "エナジースタンド" },
        バケットスロッシャー: {
            sub: "スプラッシュボム",
            special: "トリプルトルネード",
        },
        バケットスロッシャーデコ: {
            sub: "ラインマーカー",
            special: "ショクワンダー",
        },
        ヒッセン: { sub: "ポイズンミスト", special: "ジェットパック" },
        "ヒッセン・ヒュー": {
            sub: "タンサンボム",
            special: "エナジースタンド",
        },
        スクリュースロッシャー: { sub: "タンサンボム", special: "ナイスダマ" },
        オーバーフロッシャー: { sub: "スプリンクラー", special: "アメフラシ" },
        エクスプロッシャー: { sub: "ポイントセンサー", special: "アメフラシ" },
        スプラスピナー: { sub: "クイックボム", special: "ウルトラハンコ" },
        スプラスピナーコラボ: {
            sub: "ポイズンミスト",
            special: "グレートバリア",
        },
        バレルスピナー: { sub: "スプリンクラー", special: "ホップソナー" },
        ハイドラント: { sub: "ロボットボム", special: "ナイスダマ" },
        クーゲルシュライバー: {
            sub: "タンサンボム",
            special: "ジェットパック",
        },
        ノーチラス47: { sub: "ポイントセンサー", special: "アメフラシ" },
        スパッタリー: { sub: "ジャンプビーコン", special: "エナジースタンド" },
        "スパッタリー・ヒュー": { sub: "トーピード", special: "サメライド" },
        スプラマニューバー: { sub: "キューバンボム", special: "カニタンク" },
        ケルビン525: { sub: "スプラッシュシールド", special: "ナイスダマ" },
        デュアルスイーパー: {
            sub: "スプラッシュボム",
            special: "ホップソナー",
        },
        クアッドホッパーブラック: {
            sub: "ロボットボム",
            special: "サメライド",
        },
        パラシェルター: {
            sub: "スプリンクラー",
            special: "トリプルトルネード",
        },
        キャンピングシェルター: {
            sub: "ジャンプビーコン",
            special: "キューインキ",
        },
        スパイガジェット: { sub: "トラップ", special: "サメライド" },
        トライストリンガー: {
            sub: "ポイズンミスト",
            special: "メガホンレーザー5.1ch",
        },
        "LACT-450": { sub: "カーリングボム", special: "マルチミサイル" },
        ジムワイパー: { sub: "クイックボム", special: "ショクワンダー" },
        ドライブワイパー: { sub: "トーピード", special: "ウルトラハンコ" },
    };

    const result = WEAPONS[weaponName];

    return result ? result : { sub: "", special: "" };
};

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export async function gcsXRankingFetcher(url: string, init?: RequestInit) {
    return fetch(url, init).then(
        (res) => res.json() as Promise<XRankingPlayerData[] | null>
    );
}

export function playerDataToTableData(
    playerDatas: XRankingPlayerData[]
): TableData[] {
    const weapons = [...new Set(playerDatas.map((data) => data.weapon))];

    return weapons.map((weapon) => {
        const { sub, special } = getWeaponSubAndSpecial(weapon);

        const count = playerDatas.filter((d) => d.weapon === weapon).length;

        const maxRank = Math.min(
            ...playerDatas.filter((d) => d.weapon === weapon).map((d) => d.rank)
        );
        const maxXPower = Math.max(
            ...playerDatas
                .filter((d) => d.weapon === weapon)
                .map((d) => d.xPower)
        );

        return {
            weapon: {
                maxRank: maxRank,
                name: weapon,
                sub: sub,
                sp: special,
            },
            usageRate: Number.parseFloat(((count / 500) * 100).toFixed(1)),
            usageCount: count,
            maxXPower: maxXPower,
        };
    });
}
