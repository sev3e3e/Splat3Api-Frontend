import {
    ModeByID,
    Modes,
    classNames,
    getWeaponSubAndSpecial,
} from "@/utils/util";
import { Weapons } from "@/utils/weaponName";
import { XRankingPlayerData } from "@sev3e3e/splat3api-client";
import { readFileSync } from "fs";
import path from "path";
import Image from "next/image";

type Props = {
    params: {
        mode: string;
    };
};

export async function generateStaticParams() {
    return Modes.map((mode) => mode);
}

const Page = async ({ params }: Props) => {
    const { mode } = params;

    if (process.env["NODE_ENV"] === "development") {
        const p = path.join(
            process.cwd(),
            `testData/27-May-2023/${mode}/${mode}.27-May-2023.00.json`
        );

        const buf = readFileSync(p);
        const playerDatas: XRankingPlayerData[] = JSON.parse(buf.toString());
        playerDatas.sort((a, b) => {
            return a.rank - b.rank;
        });

        return (
            <div>
                <div
                    className={classNames(
                        "flex flex-col justify-center max-w-xl m-auto"
                    )}
                >
                    <div
                        className={classNames(
                            "sticky top-0  p-3 z-10 bg-black"
                        )}
                    >
                        <div
                            className={classNames(
                                "flex flex-col text-center justify-center items-center gap-x-1",
                                "sm:w-full sm:h-full"
                            )}
                        >
                            <Image
                                src={"/modes/game/area.svg"}
                                width={55}
                                height={55}
                                alt="bg"
                                className="-mb-[5px]"
                            />
                            <div>
                                {"Aggragated at 2023-06-15T03:45:58+09:00"}
                            </div>
                        </div>
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
    // const { sub, special } = getWeaponSubAndSpecial(data.weapon);

    return (
        <div
            className={classNames(
                "grid grid-cols-[0.2fr_0.2fr_0.8fr_0.3fr] items-center justify-center"
            )}
        >
            <div className="text-center">{data.rank}</div>
            <div className="flex justify-center">
                <Image
                    src={`/weapons/main/2d/${weaponFileName}.webp`}
                    width={35}
                    height={35}
                    alt={weaponFileName || "weapon"}
                />
                {/* <div
                    className={classNames(
                        "pl-[2px] pb-1 text-xs self-end hidden",
                        "sm:block"
                    )}
                >{`${data.weapon}`}</div> */}
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

export default Page;
