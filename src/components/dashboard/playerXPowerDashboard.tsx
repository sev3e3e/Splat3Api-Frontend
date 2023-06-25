import { Mode, Modes, classNames, getWeaponSubAndSpecial } from "@/utils/util";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import { readFileSync } from "fs";
import path from "path";
import { Weapons } from "@/utils/weaponName";
import Image from "next/image";

const PlayerXPowerDashboard = () => {
    if (process.env["NODE_ENV"] === "development") {
        return (
            <div
                className={classNames(
                    "gap-x-2",
                    "lg:grid lg:grid-cols-3",
                    "md:grid md:grid-cols-2",
                    "xl:flex"
                )}
            >
                {Modes.map((mode) => {
                    const p = path.join(
                        process.cwd(),
                        `testData/27-May-2023/${mode.id}/${mode.id}.27-May-2023.00.json`
                    );

                    const buf = readFileSync(p);
                    const playerDatas: XRankingPlayerData[] = JSON.parse(
                        buf.toString()
                    );

                    // playerDatasをrankでソート(小さい順)
                    playerDatas.sort((a, b) => {
                        return a.rank - b.rank;
                    });
                    return (
                        <div key={`${mode.id}`}>
                            <div className="relative -top-14" id={mode.id} />
                            <div className="sticky top-0 text-center text-xl py-2">
                                {`ガチ${mode.name}`}
                            </div>
                            {playerDatas.map((data) => {
                                return (
                                    <DashBoardPlayerGridItem
                                        key={`${mode}-${data.nameId}`}
                                        data={data}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
    return <></>;
};

const DashBoardPlayerGridItem: React.FC<{ data: XRankingPlayerData }> = ({
    data,
}) => {
    const weaponFileName = Weapons[data.weapon]
        ? Weapons[data.weapon].replace(/\s/g, "_")
        : undefined;
    const { sub, special } = getWeaponSubAndSpecial(data.weapon);

    return (
        <div
            className={classNames(
                "grid grid-cols-[0.2fr_1fr_0.3fr] items-center"
            )}
        >
            <div className={classNames("flex justify-center")}>
                <div className="text-lg">{data.rank}</div>
            </div>
            <div className={classNames("flex")}>
                <div className="">{`${data.name}`}</div>
                <div className="pl-1 text-sm text-[#818181] self-end">{`#${data.nameId}`}</div>
            </div>

            <div className={classNames("flex justify-center")}>
                <div>{data.xPower.toFixed(1)}</div>
            </div>
        </div>
    );
};

export default PlayerXPowerDashboard;
